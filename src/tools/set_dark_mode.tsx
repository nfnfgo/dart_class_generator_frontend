'use client';

// Notice:
// The change darkmode action should not use the function in here, 
// use the themeStore to do all the things about darkmode


// stores
import { ThemeData, useThemeStore, useThemeStoreStateConfig } from '@/stores/themeStore';

/** Check if the window (WebAPI) is accessable
 * 
 * Returns:
 * - `boolean`: Returns `true` if the window is accessable, else return `false`
 */
function windowAccessable(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }
    return true;
}

/** Check the user system darkmode pref settings.
 * 
 * Returns:
 * - `true` Darkmode enabled in user's divice
 * - `false` Darkmode disabled
 */
export function getSystemDarkmodePref(): boolean {
    if (windowAccessable() === false) {
        console.log(`[WindowUndefined] The window param is undefined when trying to get `
            + `the user dark mode preference`);
        return false;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Returning true');
        return true;
    }
    return false;
}

/**Return the current DOM darkmode status
 * 
 * Returns:
 * - `boolean`: Return `true` if current mode is darkmode, else return `false`
 */
export function currentDarkMode(): boolean {
    return document.documentElement.classList.contains('dark');
}

/** Change the display mode to a specified status */
export function setDarkMode(mode: boolean | null): void {
    if (windowAccessable() === false) {
        console.log('[DocumentUndefined] The document param is undefined when trying to set '
            + 'the user dark mode');
        return;
    }
    // if user prefer to follow the system
    if (mode === null) {
        mode = getSystemDarkmodePref();
    }
    // then change the darkmode of the html object based on the mode
    if (mode === true) {
        document.documentElement.classList.add('dark');
    }
    else if (mode === false) {
        document.documentElement.classList.remove('dark');
    }
}

// Change the darkmode setting to the opposite side
//
// If current is light mode, then change to dark mode
// If current is dark mode, then change to light mode
export function reverseDarkMode(): void {
    let curMode = currentDarkMode();
    setDarkMode(!curMode);
}


/**
 * Returns current user settings of the darkmode
 * 
 * Returns:
 * - Returns `true` or `false` if user specified the darkmode pref, 
 * return `null` if user prefer to follow the system darkmode settings
 */
export function useDarkModeStatus(): boolean | null {
    console.log('Inside useDarkMdoeStatus');
    // Get the value of the themeStore
    const curDarkMode: boolean | null = useThemeStore((state) => {
        const curTheme: ThemeData = (state as useThemeStoreStateConfig).theme;
        // The method getDarkModeNow will auto deal with the null value of the darkmode
        return curTheme.darkMode;
    });
    return curDarkMode;
}