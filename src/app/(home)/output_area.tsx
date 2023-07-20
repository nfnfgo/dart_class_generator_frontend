'use client';

import { classNames } from "@/tools/css_tools";

export function OutputArea({ className }: { className?: string }) {
    return (<>
        <textarea className={classNames(
            'flex w-full h-full',
            'rounded-2xl resize-none',
            'px-4 py-2',
            'bg-fgcolor dark:bg-fgcolor-dark',
            'text-black dark:text-white',
            'font-mono',
            className ?? '',
        )}
            value={'Generated Dart Class String Will Be Here...'}>
        </textarea>
    </>);
}