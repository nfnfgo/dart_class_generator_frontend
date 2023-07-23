'use client';

// Components
import { Container } from '@/components/container';

// Tools
import { classNames } from '@/tools/css_tools';

// Stores
import { useGenInfoStore, useGenInfoStoreConfig, ClassInfo, MemberInfo } from '@/stores/genInfoStore';
import { useResultStore, useResultStoreConfig } from '@/stores/resultStore';

// Apis
import { getDartClassStr } from '@/apis/generate';

/**
 * Button component used to trigger generating process
 */
export function TriggerGenerateButton() {
    const classInfo: ClassInfo = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).info));
    const updateResult = useResultStore((state) => ((state as useResultStoreConfig).updateResult));

    /**
     * Generate dart class result and update the state
     */
    async function generate() {
        updateResult('Generating...');
        try {
            let class_str: string = await getDartClassStr(classInfo);
            updateResult(class_str);
        } catch (err) {
            if (typeof (err) === 'string') { updateResult(err as string); }
            else { updateResult(JSON.stringify(err)); }
        }
    }


    return (<>
        <button className={classNames(
            'h-full w-full',
        )}
            onClick={generate}>
            <Container className={classNames(
                'bg-primary dark:bg-primary/[.7]',
                'justify-center items-center',
            )}
                padding={true}
                col={false}
                hoverColor={true}>
                <div className='flex h-full w-full justify-center'>
                    <div className={classNames(
                        'font-semibold font-lg',
                        'text-white',
                    )}>
                        Generate
                    </div>
                </div>
            </Container>
        </button>
    </>);
}