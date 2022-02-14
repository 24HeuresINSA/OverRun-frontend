import { ComponentPropsOptions } from '@vue/runtime-core';
import * as CSS from 'csstype';
import { ComputedRef, DefineComponent, Prop, Ref } from 'vue';
export declare const pascalCase: (str: string) => string;
export declare type StyleValue = string | CSS.Properties | Array<StyleValue>;
export declare type MaybeRef<T> = T | Ref<T> | ComputedRef<T>;
export declare type ExtractComponentProps<T> = T extends DefineComponent<infer TProps> ? TProps extends ComponentPropsOptions ? ExtractPropTypes<TProps> : TProps : never;
export declare type ExtractComponentData<T> = T extends DefineComponent<any, infer TData> ? TData : never;
declare type RequiredKeys<T> = {
    [K in keyof T]: T[K] extends {
        required: true;
    } | {
        default: any;
    } | BooleanConstructor | {
        type: BooleanConstructor;
    } ? T[K] extends {
        default: undefined | (() => undefined);
    } ? never : K : never;
}[keyof T];
declare type InferPropType<T> = [T] extends [null] ? any : [T] extends [
    {
        type: null | true;
    }
] ? any : [T] extends [
    ObjectConstructor | {
        type: ObjectConstructor;
    }
] ? Record<string, any> : [T] extends [
    BooleanConstructor | {
        type: BooleanConstructor;
    }
] ? boolean : [T] extends [
    DateConstructor | {
        type: DateConstructor;
    }
] ? Date : [T] extends [
    (infer U)[] | {
        type: (infer U)[];
    }
] ? U extends DateConstructor ? Date | InferPropType<U> : InferPropType<U> : [T] extends [Prop<infer V, infer D>] ? unknown extends V ? D : V : T;
declare type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
export declare type ExtractPropTypes<O> = O extends object ? {
    [K in RequiredKeys<O>]: InferPropType<O[K]>;
} & {
    [K in OptionalKeys<O>]?: InferPropType<O[K]>;
} : {
    [K in string]: any;
};
export {};
