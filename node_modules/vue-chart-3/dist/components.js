"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineChartComponent = void 0;
const chart_js_1 = require("chart.js");
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const nanoid_1 = require("nanoid");
const vue_1 = require("vue");
const utils_1 = require("./utils");
const defineChartComponent = (chartId, chartType) => {
    const propsDefs = {
        chartData: { type: Object, required: true },
        options: { type: Object, required: false },
        chartId: { default: chartId, type: String },
        width: { default: 400, type: Number },
        height: { default: 400, type: Number },
        cssClasses: { type: String, default: '' },
        styles: { type: Object },
        plugins: { type: Array, default: () => [] },
        onLabelsUpdate: { type: Function },
        onChartUpdate: { type: Function },
        onChartDestroy: { type: Function },
        onChartRender: { type: Function },
    };
    const componentName = (0, utils_1.pascalCase)(chartId);
    return (0, vue_1.defineComponent)({
        name: componentName,
        props: propsDefs,
        emits: {
            'labels:update': () => true,
            'chart:update': (chartInstance) => true,
            'chart:destroy': () => true,
            'chart:render': (chartInstance) => true,
        },
        setup(props, { emit }) {
            const canvasRef = (0, vue_1.ref)();
            const canvasId = `${chartId}-${(0, nanoid_1.nanoid)(6)}`;
            let chartInstance = (0, vue_1.shallowRef)(null);
            (0, vue_1.watch)(() => props.chartData, watchHandler, { deep: true });
            (0, vue_1.watch)(() => props.options, (newOptions, oldOptions) => {
                if (chartInstance.value &&
                    newOptions &&
                    !(0, isEqual_1.default)(chartInstance.value.options, oldOptions)) {
                    chartInstance.value.options = (0, cloneDeep_1.default)(newOptions);
                    oldOptions = (0, cloneDeep_1.default)(newOptions);
                    handleChartUpdate();
                }
            }, { deep: true });
            function watchHandler(newData, oldData) {
                if (oldData && chartInstance.value) {
                    let chart = chartInstance.value;
                    let newDatasetLabels = newData.datasets.map(({ label }) => label);
                    let oldDatasetLabels = oldData.datasets.map(({ label }) => label);
                    const oldLabels = JSON.stringify(oldDatasetLabels);
                    const newLabels = JSON.stringify(newDatasetLabels);
                    if (newLabels === oldLabels &&
                        oldData.datasets.length === newData.datasets.length &&
                        chart) {
                        newData.datasets.forEach((dataset, i) => {
                            const oldDatasetKeys = Object.keys(oldData.datasets[i]);
                            const newDatasetKeys = Object.keys(dataset);
                            const deletionKeys = oldDatasetKeys.filter((key) => {
                                return key !== '_meta' && newDatasetKeys.indexOf(key) === -1;
                            });
                            deletionKeys.forEach((deletionKey) => {
                                if (chart === null || chart === void 0 ? void 0 : chart.data.datasets[i]) {
                                    delete chart.data.datasets[i][deletionKey];
                                }
                            });
                            for (const attribute in dataset) {
                                const attrValue = dataset[attribute];
                                if (dataset.hasOwnProperty(attribute) && attrValue != null && chart) {
                                    chart.data.datasets[i][attribute] = attrValue;
                                }
                            }
                        });
                        if (newData.labels) {
                            chart.data.labels = newData.labels;
                            handleLabelsUpdate();
                        }
                    }
                    else {
                        chart.data.datasets = newData.datasets;
                    }
                    handleChartUpdate();
                }
                else {
                    if (chartInstance.value) {
                        handleChartDestroy();
                    }
                    renderChart();
                }
            }
            function renderChart() {
                if (canvasRef.value) {
                    chartInstance.value = new chart_js_1.Chart(canvasRef.value, {
                        data: props.chartData,
                        type: chartType,
                        options: (0, cloneDeep_1.default)(props.options),
                        plugins: props.plugins,
                    });
                    handleChartRender();
                }
                else {
                    console.error(`Error on component ${componentName}, canvas cannot be rendered. Check if the render appends server-side`);
                }
            }
            function handleLabelsUpdate() {
                var _a;
                emit('labels:update');
                (_a = props.onLabelsUpdate) === null || _a === void 0 ? void 0 : _a.call(props);
            }
            function handleChartRender() {
                var _a;
                if (chartInstance.value) {
                    emit('chart:render', chartInstance.value);
                    (_a = props.onChartRender) === null || _a === void 0 ? void 0 : _a.call(props, chartInstance.value);
                }
            }
            function handleChartUpdate() {
                var _a;
                if (chartInstance.value) {
                    chartInstance.value.update();
                    emit('chart:render', chartInstance.value);
                    (_a = props.onChartRender) === null || _a === void 0 ? void 0 : _a.call(props, chartInstance.value);
                }
            }
            function handleChartDestroy() {
                var _a, _b;
                (_a = chartInstance.value) === null || _a === void 0 ? void 0 : _a.destroy();
                emit('chart:destroy');
                (_b = props.onChartDestroy) === null || _b === void 0 ? void 0 : _b.call(props);
            }
            (0, vue_1.onMounted)(renderChart);
            (0, vue_1.onBeforeUnmount)(() => {
                var _a;
                if (chartInstance.value) {
                    (_a = chartInstance.value) === null || _a === void 0 ? void 0 : _a.destroy();
                }
            });
            return { canvasRef, renderChart, chartInstance, canvasId };
        },
        render() {
            return (0, vue_1.h)('div', {
                style: {
                    maxWidth: '100%',
                    ...this.styles,
                    position: 'relative',
                },
                class: this.cssClasses,
            }, [
                (0, vue_1.h)('canvas', {
                    style: {
                        maxWidth: '100%',
                        maxHeight: '100%',
                    },
                    id: this.canvasId,
                    width: this.width,
                    height: this.height,
                    ref: 'canvasRef',
                }),
            ]);
        },
    });
};
exports.defineChartComponent = defineChartComponent;
//# sourceMappingURL=components.js.map