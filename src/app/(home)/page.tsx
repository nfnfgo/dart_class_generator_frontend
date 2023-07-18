// Components
import { Container } from '@/components/container';
import { DarkModeButton } from './darkmode_button';

// Tools
import { classNames } from '@/tools/css_tools';

export default function Home() {
  return (
    <>
      {/* Root Padding Container */}
      <div className={classNames(
        'px-5 py-5',
        'md:px-10 md:py-5',
      )}>
        {/* Title Bar */}
        <Container className={classNames(
          'flex min-h-fit w-full h-full',
          'px-5 py-3',
        )}>
          <div className={classNames(
            'flex flex-row items-center'
          )}>
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
              (Bata)
            </p>
            <DarkModeButton></DarkModeButton>
          </div>
        </Container>
      </div>
    </>
  );
}
