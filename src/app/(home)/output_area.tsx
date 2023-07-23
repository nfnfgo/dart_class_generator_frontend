'use client';

// Tools
import { classNames } from "@/tools/css_tools";

// Stores
import { useResultStore, useResultStoreConfig } from '@/stores/resultStore';

export function OutputArea({ className }: { className?: string }) {
    const resultString = useResultStore((state) => ((state as useResultStoreConfig).resultString));

    // Check if the resultString is a err msg string
    let hasErr: boolean = false;
    if (resultString.startsWith('[')) {
        hasErr = true;
    }

    return (<>
        <textarea className={classNames(
            'flex w-full h-full',
            'rounded-2xl resize-none',
            'overflow-y-auto',
            'px-4 py-2',
            'bg-fgcolor dark:bg-fgcolor-dark',
            hasErr ? 'text-red dark:text-red-light' : 'text-black dark:text-white',
            'dark:[color-scheme:dark]',
            'font-mono',
            className ?? '',
        )}
            value={resultString}
            readOnly={true}>
        </textarea>
    </>);
}