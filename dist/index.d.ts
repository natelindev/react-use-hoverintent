/// <reference types="react" />
interface optionType {
    ref?: React.Ref<HTMLElement | null>;
    sensitivity?: number;
    interval?: number;
    timeout?: number;
}
export declare function useHoverIntent<T = HTMLElement>(options?: optionType): [boolean, React.RefObject<HTMLElement & T>];
export {};
