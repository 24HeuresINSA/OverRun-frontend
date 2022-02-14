"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScatterChart = exports.BubbleChart = exports.RadarChart = exports.PolarAreaChart = exports.PieChart = exports.LineChart = exports.DoughnutChart = exports.BarChart = exports.defineChartComponent = void 0;
const components_1 = require("./components");
var components_2 = require("./components");
Object.defineProperty(exports, "defineChartComponent", { enumerable: true, get: function () { return components_2.defineChartComponent; } });
__exportStar(require("./hooks"), exports);
exports.BarChart = (0, components_1.defineChartComponent)('bar-chart', 'bar');
exports.DoughnutChart = (0, components_1.defineChartComponent)('doughnut-chart', 'doughnut');
exports.LineChart = (0, components_1.defineChartComponent)('line-chart', 'line');
exports.PieChart = (0, components_1.defineChartComponent)('pie-chart', 'pie');
exports.PolarAreaChart = (0, components_1.defineChartComponent)('polar-chart', 'polarArea');
exports.RadarChart = (0, components_1.defineChartComponent)('radar-chart', 'radar');
exports.BubbleChart = (0, components_1.defineChartComponent)('bubble-chart', 'bubble');
exports.ScatterChart = (0, components_1.defineChartComponent)('scatter-chart', 'scatter');
exports.default = {
    BarChart: exports.BarChart,
    DoughnutChart: exports.DoughnutChart,
    LineChart: exports.LineChart,
    PieChart: exports.PieChart,
    PolarAreaChart: exports.PolarAreaChart,
    RadarChart: exports.RadarChart,
    BubbleChart: exports.BubbleChart,
    ScatterChart: exports.ScatterChart,
    defineChartComponent: components_1.defineChartComponent,
};
//# sourceMappingURL=index.js.map