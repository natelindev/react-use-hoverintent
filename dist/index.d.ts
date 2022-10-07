import { Dispatch, SetStateAction } from "react";
interface optionType {
    ref?: React.Ref<HTMLElement | null>;
    sensitivity?: number;
    interval?: number;
    timeout?: number;
}
export declare const useHoverIntent: <T>(options?: optionType | undefined) => [boolean, Dispatch<SetStateAction<boolean>>, import("react").RefObject<HTMLElement & T>];
export {};
