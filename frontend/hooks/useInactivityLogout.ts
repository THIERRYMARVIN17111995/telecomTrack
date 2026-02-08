'use client'
import { useEffect } from 'react';

const INACTIVITY_LIMIT = 15 * 60 * 1000;

export function useInactivityLogout(onLogout: () => void) {
    useEffect(() => {
        let timer: NodeJS.Timeout;

        const resetTimer = () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(onLogout, INACTIVITY_LIMIT);
        };

        const events = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'];

        events.forEach(event =>
            window.addEventListener(event, resetTimer)
        );

        resetTimer();

        return () => {
            if (timer) clearTimeout(timer);
            events.forEach(event =>
                window.removeEventListener(event, resetTimer)
            );
        };
    }, [onLogout]);
}
