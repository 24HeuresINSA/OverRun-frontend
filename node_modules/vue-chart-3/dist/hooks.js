"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScatterChart = exports.useBubbleChart = exports.useRadarChart = exports.usePolarAreaChart = exports.usePieChart = exports.useLineChart = exports.useBarChart = exports.useDoughnutChart = void 0;
const vue_1 = require("vue");
const defineChartHook = (chartType) => {
    return (params) => {
        const reactiveProps = (0, vue_1.computed)(() => ({
            ...params,
            ref: `${chartType}ChartRef`,
            chartData: (0, vue_1.unref)(params.chartData),
            options: (0, vue_1.unref)(params.options),
        }));
        return {
            [`${chartType}ChartProps`]: reactiveProps,
            [`${chartType}ChartRef`]: (0, vue_1.ref)(null),
        };
    };
};
exports.useDoughnutChart = defineChartHook('doughnut');
exports.useBarChart = defineChartHook('bar');
exports.useLineChart = defineChartHook('line');
exports.usePieChart = defineChartHook('pie');
exports.usePolarAreaChart = defineChartHook('polarArea');
exports.useRadarChart = defineChartHook('radar');
exports.useBubbleChart = defineChartHook('bubble');
exports.useScatterChart = defineChartHook('scatter');
//# sourceMappingURL=hooks.js.map