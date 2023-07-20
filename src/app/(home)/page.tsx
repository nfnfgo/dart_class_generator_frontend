// Components
import { Container } from '@/components/container';
import { DarkModeButton } from './darkmode_button';
import { OutputArea } from './output_area';
import { TriggerGenerateButton } from './generate_button';

// Tools
import { classNames } from '@/tools/css_tools';

export default function Home() {
  return (
    <>
      {/* Root Padding Container */}
      <div className={classNames(
        'flex flex-col',
        'w-full h-full',
        'px-5 py-5',
        'md:px-10 md:py-5',
      )}>
        {/* Title Bar */}
        <Container className={classNames(
          'flex flex-init flex-shrink-0',
          'w-full h-auto',
        )}>
          <div className={classNames(
            'flex flex-row flex-auto flex-wrap gap-y-4 items-center',
            'w-full h-auto py-3 px-5',
            'justify-between',
          )}>
            <div className='flex flex-row'>
              <p className={classNames(
                'font-bold text-lg',
              )}>
                Dart Class Generator
              </p>
              <p className={classNames(
                'px-3 text-primary',
                'font-mono text-sm font-semibold',
                'self-start'
              )}>
                (Beta)
              </p>
            </div>
            <DarkModeButton></DarkModeButton>
          </div>
        </Container>
        {/* Body Part */}
        <div className={classNames(
          'flex flex-auto flex-row',
          'h-full w-full',
          'gap-5 mt-5',
        )}>
          {/* Settings Area */}
          <div className={classNames(
            'flex flex-col',
            'w-full h-full',
          )}>
            <Container className={classNames(
              'w-full h-full',
              'px-4 py-2',
            )}>
              Setting Area
            </Container>
            <div className='mt-4'>
              <TriggerGenerateButton></TriggerGenerateButton>
            </div>
          </div>
          {/* Output Area */}
          <OutputArea />
        </div>
      </div>
    </>
  );
}
