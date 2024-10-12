import { ReactNode, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContent } from '@app/providers';

const getPreferredTheme = (): Theme => {
    const theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (theme) {
        return (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme);
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.DARK);
            return Theme.DARK;
        } else {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.LIGHT);
            return Theme.LIGHT;
        }
    }
};
const defaultTheme = getPreferredTheme();

type ThemeProps = {
    children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProps) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme,
    }), [theme]);

    return (
        <ThemeContent.Provider value={defaultProps}>
            {children}
        </ThemeContent.Provider>
    );
};
