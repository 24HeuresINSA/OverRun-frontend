import { CSSProperties } from '@vue/runtime-dom';
export declare type VueInputEvent = Event & {
    target: HTMLInputElement;
};
export declare type StyleValue = string | CSSProperties | Array<StyleValue>;
export declare type VueHtmlClassParams = string | Record<string, boolean> | Array<string | Record<string, boolean>>;
