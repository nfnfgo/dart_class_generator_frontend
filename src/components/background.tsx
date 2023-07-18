'use client';

// Fundamentals
import React, { useEffect, StrictMode, useLayoutEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Stores
import { useThemeStore, ThemeData } from '@/stores/themeStore';

// Tools
import { classNames } from '@/tools/css_tools';
import { setDarkMode, useDarkModeStatus } from '@/tools/set_dark_mode';


export interface AdaptedBackgroundConfig {
    children: React.JSX.Element | string | React.ReactNode,
    className?: string,
}


/**
 * A simple background component that automatically follow the 
 * darkmode settings based on the useThemeStore states
 */
export function AdaptedBackground({
    children,
    className,
}: AdaptedBackgroundConfig) {
    // get darkmode settings
    const isDarkModeNow: boolean | null = useDarkModeStatus();
    // set darkmode
    useLayoutEffect(() => {
        console.log(`isDarkModeNow: ${isDarkModeNow}`);
        setDarkMode(isDarkModeNow);
    }, [isDarkModeNow]);


    return (<>
        <div className={
            classNames(
                'transition-none',
                'bg-bgcolor dark:bg-bgcolor-dark text-black dark:text-white',
                'w-full h-full',
                // Received className
                className ?? null,
            )
        }>
            {children}
        </div>
    </>);
}

/** Not Server Rendering version of `AdaptedBackground`
 * 
 * This component will automatically check the darkmode pref of user and the useThemeState, and 
 * update the HTML DOM to match the proper mode
 */
export const BackgroundNoSsr = dynamic(() =>
(import('@/components/background').then((mod) =>
    (mod.AdaptedBackground))), { ssr: false });