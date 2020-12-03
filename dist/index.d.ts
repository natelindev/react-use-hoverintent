/// <reference types="react" />
interface optionType {
    ref?: React.Ref<HTMLElement | null>;
    sensitivity?: number;
    interval?: number;
    timeout?: number;
}
export declare function useHoverIntent(options: optionType): [boolean, React.RefObject<HTMLElement>];
export {};
