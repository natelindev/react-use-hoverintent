import { Dispatch, SetStateAction } from 'react';

interface optionType {
    ref?: React.Ref<HTMLElement | null>;
    sensitivity?: number;
    interval?: number;
    timeout?: number;
}
declare const useHoverIntent: <T>(options?: optionType) => [
    boolean,
    React.RefObject<HTMLElement & T>,
    Dispatch<SetStateAction<boolean>>
];

export { useHoverIntent };
