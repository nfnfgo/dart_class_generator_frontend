'use client';

// Tools
import { classNames } from '@/tools/css_tools';

// Stores
import { useThemeStore, useThemeStoreStateConfig, ThemeData } from '@/stores/themeStore';
import { useLayoutEffect } from 'react';

// Components
import { Container } from '@/components/container';

/**
 * Returns a single darkmode button item, e.g.: LightItem, DarkItem, SysItem
 * 
 * Params:
 * - `targetDarkMode`: The target darkmode of this item, could be `true`, `false`, or `null`
 */
function DarkModeButtonItem({ targetDarkMode }: { targetDarkMode: boolean | null }) {
    // Get the dark mode pref
    let darkModeSetting: boolean | null = useThemeStore((state) => {
        return (state as useThemeStoreStateConfig).theme.darkMode;
    });

    let setDarkMode = useThemeStore((state) => {
        return (state as useThemeStoreStateConfig).setDarkMode;
    });

    let curDarkMode = useThemeStore((state) => {
        return (state as useThemeStoreStateConfig).theme.darkMode;
    })

    function onClick() {
        setDarkMode(targetDarkMode);
    }

    return (<>
        <Container className={classNames(
            targetDarkMode === curDarkMode ? 'bg-black text-white dark:bg-white dark:text-black' : '',
            'px-3 py-2',
        )}>
            <button onClick={onClick}

            >
                {/* Show the Mode String based on the target mode */}
                {(() => {
                    if (targetDarkMode === true) {
                        return 'Dark';
                    }
                    else if (targetDarkMode === false) {
                        return 'Light';
                    }
                    else {
                        return 'System';
                    }
                })()}
            </button>
        </Container>
    </>);
}


/**
 * Darkmode button used in the home page, can change the 
 * dark mode of the app by using useThemeStore
 */
export function DarkModeButton() {
    return (<>
        <Container className={classNames(
            'flex flex-row',
        )}>
            <DarkModeButtonItem targetDarkMode={false}></DarkModeButtonItem>
            <DarkModeButtonItem targetDarkMode={true}></DarkModeButtonItem>
            <DarkModeButtonItem targetDarkMode={null}></DarkModeButtonItem>
        </Container>
    </>);
}