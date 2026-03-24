import { useMemo } from "react";

const useOrigin = () => {
    return useMemo(() => {
        if (typeof window === 'undefined') return '';
        return window.location.origin || '';
    }, [])
}

export default useOrigin;