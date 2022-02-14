export { defineChartComponent } from './components';
export { ExtractComponentData, ExtractComponentProps } from './utils';
export * from './hooks';
export declare const BarChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"bar">, import("./components").ComponentData<"bar">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    chartData: import("chart.js").ChartData<"bar", number[], unknown>;
} & {
    options?: Record<string, any> | undefined;
    styles?: import("./vue.types").StyleValue | undefined;
    onLabelsUpdate?: (() => void) | undefined;
    onChartUpdate?: ((chartInstance: import("chart.js").Chart<"bar", number[], unknown>) => void) | undefined;
    onChartDestroy?: (() => void) | undefined;
    onChartRender?: ((chartInstance: import("chart.js").Chart<"bar", number[], unknown>) => void) | undefined;
}>, {
    chartId: string;
    width: number;
    height: number;
    cssClasses: string;
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
}>;
export declare const DoughnutChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"doughnut">, import("./components").ComponentData<"doughnut">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    chartData: import("chart.js").ChartData<"doughnut", number[], unknown>;
} & {
    options?: Record<string, any> | undefined;
    styles?: import("./vue.types").StyleValue | undefined;
    onLabelsUpdate?: (() => void) | undefined;
    onChartUpdate?: ((chartInstance: import("chart.js").Chart<"doughnut", number[], unknown>) => void) | undefined;
    onChartDestroy?: (() => void) | undefined;
    onChartRender?: ((chartInstance: import("chart.js").Chart<"doughnut", number[], unknown>) => void) | undefined;
}>, {
    chartId: string;
    width: number;
    height: number;
    cssClasses: string;
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
}>;
export declare const LineChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"line">, import("./components").ComponentData<"line">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    chartData: import("chart.js").ChartData<"line", (number | import("chart.js").ScatterDataPoint | null)[], unknown>;
} & {
    options?: Record<string, any> | undefined;
    styles?: import("./vue.types").StyleValue | undefined;
    onLabelsUpdate?: (() => void) | undefined;
    onChartUpdate?: ((chartInstance: import("chart.js").Chart<"line", (number | import("chart.js").ScatterDataPoint | null)[], unknown>) => void) | undefined;
    onChartDestroy?: (() => void) | undefined;
    onChartRender?: ((chartInstance: import("chart.js").Chart<"line", (number | import("chart.js").ScatterDataPoint | null)[], unknown>) => void) | undefined;
}>, {
    chartId: string;
    width: number;
    height: number;
    cssClasses: string;
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
}>;
export declare const PieChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"pie">, import("./components").ComponentData<"pie">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    chartData: import("chart.js").ChartData<"pie", number[], unknown>;
} & {
    options?: Record<string, any> | undefined;
    styles?: import("./vue.types").StyleValue | undefined;
    onLabelsUpdate?: (() => void) | undefined;
    onChartUpdate?: ((chartInstance: import("chart.js").Chart<"pie", number[], unknown>) => void) | undefined;
    onChartDestroy?: (() => void) | undefined;
    onChartRender?: ((chartInstance: import("chart.js").Chart<"pie", number[], unknown>) => void) | undefined;
}>, {
    chartId: string;
    width: number;
    height: number;
    cssClasses: string;
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
}>;
export declare const PolarAreaChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"polarArea">, import("./components").ComponentData<"polarArea">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    chartData: import("chart.js").ChartData<"polarArea", number[], unknown>;
} & {
    options?: Record<string, any> | undefined;
    styles?: import("./vue.types").StyleValue | undefined;
    onLabelsUpdate?: (() => void) | undefined;
    onChartUpdate?: ((chartInstance: import("chart.js").Chart<"polarArea", number[], unknown>) => void) | undefined;
    onChartDestroy?: (() => void) | undefined;
    onChartRender?: ((chartInstance: import("chart.js").Chart<"polarArea", number[], unknown>) => void) | undefined;
}>, {
    chartId: string;
    width: number;
    height: number;
    cssClasses: string;
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
}>;
export declare const RadarChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"radar">, import("./components").ComponentData<"radar">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    chartData: import("chart.js").ChartData<"radar", (number | null)[], unknown>;
} & {
    options?: Record<string, any> | undefined;
    styles?: import("./vue.types").StyleValue | undefined;
    onLabelsUpdate?: (() => void) | undefined;
    onChartUpdate?: ((chartInstance: import("chart.js").Chart<"radar", (number | null)[], unknown>) => void) | undefined;
    onChartDestroy?: (() => void) | undefined;
    onChartRender?: ((chartInstance: import("chart.js").Chart<"radar", (number | null)[], unknown>) => void) | undefined;
}>, {
    chartId: string;
    width: number;
    height: number;
    cssClasses: string;
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
}>;
export declare const BubbleChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"bubble">, import("./components").ComponentData<"bubble">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    chartData: import("chart.js").ChartData<"bubble", import("chart.js").BubbleDataPoint[], unknown>;
} & {
    options?: Record<string, any> | undefined;
    styles?: import("./vue.types").StyleValue | undefined;
    onLabelsUpdate?: (() => void) | undefined;
    onChartUpdate?: ((chartInstance: import("chart.js").Chart<"bubble", import("chart.js").BubbleDataPoint[], unknown>) => void) | undefined;
    onChartDestroy?: (() => void) | undefined;
    onChartRender?: ((chartInstance: import("chart.js").Chart<"bubble", import("chart.js").BubbleDataPoint[], unknown>) => void) | undefined;
}>, {
    chartId: string;
    width: number;
    height: number;
    cssClasses: string;
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
}>;
export declare const ScatterChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"scatter">, import("./components").ComponentData<"scatter">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    chartData: import("chart.js").ChartData<"scatter", (number | import("chart.js").ScatterDataPoint | null)[], unknown>;
} & {
    options?: Record<string, any> | undefined;
    styles?: import("./vue.types").StyleValue | undefined;
    onLabelsUpdate?: (() => void) | undefined;
    onChartUpdate?: ((chartInstance: import("chart.js").Chart<"scatter", (number | import("chart.js").ScatterDataPoint | null)[], unknown>) => void) | undefined;
    onChartDestroy?: (() => void) | undefined;
    onChartRender?: ((chartInstance: import("chart.js").Chart<"scatter", (number | import("chart.js").ScatterDataPoint | null)[], unknown>) => void) | undefined;
}>, {
    chartId: string;
    width: number;
    height: number;
    cssClasses: string;
    plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
}>;
declare const _default: {
    BarChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"bar">, import("./components").ComponentData<"bar">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
        chartData: import("chart.js").ChartData<"bar", number[], unknown>;
    } & {
        options?: Record<string, any> | undefined;
        styles?: import("./vue.types").StyleValue | undefined;
        onLabelsUpdate?: (() => void) | undefined;
        onChartUpdate?: ((chartInstance: import("chart.js").Chart<"bar", number[], unknown>) => void) | undefined;
        onChartDestroy?: (() => void) | undefined;
        onChartRender?: ((chartInstance: import("chart.js").Chart<"bar", number[], unknown>) => void) | undefined;
    }>, {
        chartId: string;
        width: number;
        height: number;
        cssClasses: string;
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    }>;
    DoughnutChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"doughnut">, import("./components").ComponentData<"doughnut">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
        chartData: import("chart.js").ChartData<"doughnut", number[], unknown>;
    } & {
        options?: Record<string, any> | undefined;
        styles?: import("./vue.types").StyleValue | undefined;
        onLabelsUpdate?: (() => void) | undefined;
        onChartUpdate?: ((chartInstance: import("chart.js").Chart<"doughnut", number[], unknown>) => void) | undefined;
        onChartDestroy?: (() => void) | undefined;
        onChartRender?: ((chartInstance: import("chart.js").Chart<"doughnut", number[], unknown>) => void) | undefined;
    }>, {
        chartId: string;
        width: number;
        height: number;
        cssClasses: string;
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    }>;
    LineChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"line">, import("./components").ComponentData<"line">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
        chartData: import("chart.js").ChartData<"line", (number | import("chart.js").ScatterDataPoint | null)[], unknown>;
    } & {
        options?: Record<string, any> | undefined;
        styles?: import("./vue.types").StyleValue | undefined;
        onLabelsUpdate?: (() => void) | undefined;
        onChartUpdate?: ((chartInstance: import("chart.js").Chart<"line", (number | import("chart.js").ScatterDataPoint | null)[], unknown>) => void) | undefined;
        onChartDestroy?: (() => void) | undefined;
        onChartRender?: ((chartInstance: import("chart.js").Chart<"line", (number | import("chart.js").ScatterDataPoint | null)[], unknown>) => void) | undefined;
    }>, {
        chartId: string;
        width: number;
        height: number;
        cssClasses: string;
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    }>;
    PieChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"pie">, import("./components").ComponentData<"pie">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
        chartData: import("chart.js").ChartData<"pie", number[], unknown>;
    } & {
        options?: Record<string, any> | undefined;
        styles?: import("./vue.types").StyleValue | undefined;
        onLabelsUpdate?: (() => void) | undefined;
        onChartUpdate?: ((chartInstance: import("chart.js").Chart<"pie", number[], unknown>) => void) | undefined;
        onChartDestroy?: (() => void) | undefined;
        onChartRender?: ((chartInstance: import("chart.js").Chart<"pie", number[], unknown>) => void) | undefined;
    }>, {
        chartId: string;
        width: number;
        height: number;
        cssClasses: string;
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    }>;
    PolarAreaChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"polarArea">, import("./components").ComponentData<"polarArea">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
        chartData: import("chart.js").ChartData<"polarArea", number[], unknown>;
    } & {
        options?: Record<string, any> | undefined;
        styles?: import("./vue.types").StyleValue | undefined;
        onLabelsUpdate?: (() => void) | undefined;
        onChartUpdate?: ((chartInstance: import("chart.js").Chart<"polarArea", number[], unknown>) => void) | undefined;
        onChartDestroy?: (() => void) | undefined;
        onChartRender?: ((chartInstance: import("chart.js").Chart<"polarArea", number[], unknown>) => void) | undefined;
    }>, {
        chartId: string;
        width: number;
        height: number;
        cssClasses: string;
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    }>;
    RadarChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"radar">, import("./components").ComponentData<"radar">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
        chartData: import("chart.js").ChartData<"radar", (number | null)[], unknown>;
    } & {
        options?: Record<string, any> | undefined;
        styles?: import("./vue.types").StyleValue | undefined;
        onLabelsUpdate?: (() => void) | undefined;
        onChartUpdate?: ((chartInstance: import("chart.js").Chart<"radar", (number | null)[], unknown>) => void) | undefined;
        onChartDestroy?: (() => void) | undefined;
        onChartRender?: ((chartInstance: import("chart.js").Chart<"radar", (number | null)[], unknown>) => void) | undefined;
    }>, {
        chartId: string;
        width: number;
        height: number;
        cssClasses: string;
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    }>;
    BubbleChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"bubble">, import("./components").ComponentData<"bubble">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
        chartData: import("chart.js").ChartData<"bubble", import("chart.js").BubbleDataPoint[], unknown>;
    } & {
        options?: Record<string, any> | undefined;
        styles?: import("./vue.types").StyleValue | undefined;
        onLabelsUpdate?: (() => void) | undefined;
        onChartUpdate?: ((chartInstance: import("chart.js").Chart<"bubble", import("chart.js").BubbleDataPoint[], unknown>) => void) | undefined;
        onChartDestroy?: (() => void) | undefined;
        onChartRender?: ((chartInstance: import("chart.js").Chart<"bubble", import("chart.js").BubbleDataPoint[], unknown>) => void) | undefined;
    }>, {
        chartId: string;
        width: number;
        height: number;
        cssClasses: string;
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    }>;
    ScatterChart: import("vue").DefineComponent<import("./types").ChartPropsOptions<"scatter">, import("./components").ComponentData<"scatter">, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
        chartData: import("chart.js").ChartData<"scatter", (number | import("chart.js").ScatterDataPoint | null)[], unknown>;
    } & {
        options?: Record<string, any> | undefined;
        styles?: import("./vue.types").StyleValue | undefined;
        onLabelsUpdate?: (() => void) | undefined;
        onChartUpdate?: ((chartInstance: import("chart.js").Chart<"scatter", (number | import("chart.js").ScatterDataPoint | null)[], unknown>) => void) | undefined;
        onChartDestroy?: (() => void) | undefined;
        onChartRender?: ((chartInstance: import("chart.js").Chart<"scatter", (number | import("chart.js").ScatterDataPoint | null)[], unknown>) => void) | undefined;
    }>, {
        chartId: string;
        width: number;
        height: number;
        cssClasses: string;
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    }>;
    defineChartComponent: <TType extends keyof import("chart.js").ChartTypeRegistry = keyof import("chart.js").ChartTypeRegistry>(chartId: string, chartType: TType) => import("vue").DefineComponent<import("./types").ChartPropsOptions<TType>, import("./components").ComponentData<TType>, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
        chartData: import("chart.js").ChartData<TType, import("chart.js/types/utils").DistributiveArray<import("chart.js").ChartTypeRegistry[TType]["defaultDataPoint"]>, unknown>;
    } & {
        options?: Record<string, any> | undefined;
        styles?: import("./vue.types").StyleValue | undefined;
        onLabelsUpdate?: (() => void) | undefined;
        onChartUpdate?: ((chartInstance: import("chart.js").Chart<TType, import("chart.js/types/utils").DistributiveArray<import("chart.js").ChartTypeRegistry[TType]["defaultDataPoint"]>, unknown>) => void) | undefined;
        onChartDestroy?: (() => void) | undefined;
        onChartRender?: ((chartInstance: import("chart.js").Chart<TType, import("chart.js/types/utils").DistributiveArray<import("chart.js").ChartTypeRegistry[TType]["defaultDataPoint"]>, unknown>) => void) | undefined;
    }>, {
        chartId: string;
        width: number;
        height: number;
        cssClasses: string;
        plugins: import("chart.js").Plugin<keyof import("chart.js").ChartTypeRegistry, import("chart.js/types/basic").AnyObject>[];
    }>;
};
export default _default;
