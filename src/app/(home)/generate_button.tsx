'use client';

// Components
import { Container } from '@/components/container';

// Tools
import { classNames } from '@/tools/css_tools';

export function TriggerGenerateButton() {
    return (<>
        <button className={classNames(
            'h-full w-full',
        )}>
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