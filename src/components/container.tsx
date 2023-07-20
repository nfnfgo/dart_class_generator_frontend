'use client';

import { classNames } from '@/tools/css_tools';
import React from 'react';

/** The config prop type of Container */
export interface ContainerConfig {
    children: React.JSX.Element | string | React.ReactNode,
    shadow?: boolean,
    hoverShadow?: boolean,
    hoverColor?: boolean,
    padding?: boolean,
    col?: boolean,
    className?: string,
    rounded?: string,
    transparent?: boolean
};

/// The standard container UI of Playm app
/// 
/// This container has some basic motion and hover effect, 
/// also, this container component are auto-adapted to the 
/// dark mode
///
/// Since the container is based on flex element, you can 
/// use self-center to center the element in this element
export function Container({
    children,
    transparent = false,
    shadow = false,
    hoverShadow = false,
    hoverColor = false,
    padding = false,
    col = false,
    className = '',
    rounded = 'rounded-2xl'
}: ContainerConfig,
) {
    return (<>
        <div className={classNames(
            "flex transition-colors",
            'overflow-hidden',
            transparent ? '' : "bg-fgcolor dark:bg-fgcolor-dark",
            "text-black dark:text-white",
            rounded ? rounded : '',
            shadow ? "shadow-lg" : '',
            hoverShadow ? "hover:shadow-xl" : null,
            col ? 'flex-col' : '',
            className,
        )}>
            <div className={classNames(
                'flex flex-auto h-full w-full',
                padding ? 'px-4 py-2' : '',
                hoverColor ? "hover:bg-black/5 dark:hover:bg-black/20 transition-colors" : '',
            )}>
                {children}
            </div>
        </div>
    </>);
}