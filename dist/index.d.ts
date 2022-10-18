import { Dispatch, SetStateAction } from "react";
interface optionType {
    ref?: React.Ref<HTMLElement | null>;
    sensitivity?: number;
    interval?: number;
    timeout?: number;
}
export declare const useHoverIntent: <T>(options?: optionType) => [boolean, import("react").RefObject<HTMLElement & T>, Dispatch<SetStateAction<boolean>>];
export {};
