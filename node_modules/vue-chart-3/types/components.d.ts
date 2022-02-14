import { Chart, ChartData, ChartType, Plugin } from 'chart.js';
import { DefineComponent, Ref } from 'vue';
import { ChartPropsOptions } from './types';
import { StyleValue } from './vue.types';
export declare type ComponentData<T extends ChartType> = {
    canvasRef: Ref<HTMLCanvasElement | undefined>;
    renderChart: () => void;
    chartInstance: Chart<T> | null;
    canvasId: string;
};
export declare const defineChartComponent: <TType extends keyof import("chart.js").ChartTypeRegistry = keyof import("chart.js").ChartTypeRegistry>(chartId: string, chartType: TType) => DefineComponent<ChartPropsOptions<TType>, ComponentData<TType>, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    options?: unknown;
    chartId?: unknown;
    width?: unknown;
    height?: unknown;
    cssClasses?: unknown;
    styles?: unknown;
    plugins?: unknown;
    chartData?: unknown;
    onLabelsUpdate?: unknown;
    onChartUpdate?: unknown;
    onChartDestroy?: unknown;
    onChartRender?: unknown;
} & {
    chartId: string;
    width: number;
    height: number;
    cssClasses: string;
    plugins: Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    chartData: ChartData<TType, import("chart.js/types/utils").DistributiveArray<import("chart.js").ChartTypeRegistry[TType]["defaultDataPoint"]>, unknown>;
} & {
    options?: Record<string, any> | undefined;
    styles?: StyleValue | undefined;
    onLabelsUpdate?: (() => void) | undefined;
    onChartUpdate?: ((chartInstance: Chart<TType, import("chart.js/types/utils").DistributiveArray<import("chart.js").ChartTypeRegistry[TType]["defaultDataPoint"]>, unknown>) => void) | undefined;
    onChartDestroy?: (() => void) | undefined;
    onChartRender?: ((chartInstance: Chart<TType, import("chart.js/types/utils").DistributiveArray<import("chart.js").ChartTypeRegistry[TType]["defaultDataPoint"]>, unknown>) => void) | undefined;
}>, {
    chartId: string;
    width: number;
    height: number;
    cssClasses: string;
    plugins: Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
}>;
