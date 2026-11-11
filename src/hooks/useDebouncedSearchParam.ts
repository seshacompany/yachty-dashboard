import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useDebouncedSearchParam(paramName: string, delay = 2000) {
    const [value, setValue] = useState("");
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);

                if (value) {
                    params.set(paramName, value);
                } else {
                    params.delete(paramName);
                }

                return params;
            });
        }, delay);

        return () => clearTimeout(timer);
    }, [value, paramName, delay, setSearchParams]);

    return {
        value,
        setValue,
    };
}