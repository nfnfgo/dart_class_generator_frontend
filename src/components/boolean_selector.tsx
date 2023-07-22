'use client';

// Fundamentals
import { classNames } from '@/tools/css_tools';
import { useState } from 'react';

// Components
import { Container } from '@/components/container';


/**
 * Simple component that let user choose if the 
 * value is true or false, can has default value 
 * and undifined value
 */
export function BooleanSelector({
    defaultValue,
    onChange,
}: BooleanSelectorConfig) {

    // state to store user choice, created from default value
    const [curChoice, setCurChoice]: [boolean | undefined, Function] = useState(defaultValue);

    /**
     * Callback function used to handle all the click callback from child button
     */
    function onButtonClick(value?: boolean) {
        // Call the received callback function if possible
        if (onChange !== undefined) {
            onChange(value);
        }
        // Change the state
        setCurChoice(value);
    }

    return (
        <>
            <div className={classNames(
                'flex flex-auto flex-row min-w-0',
                'gap-x-1',
            )}>
                <BooleanSelectorButton
                    title='Default'
                    value={undefined}
                    curValue={curChoice}
                    onClick={onButtonClick}
                />
                <BooleanSelectorButton
                    title='True'
                    value={true}
                    curValue={curChoice}
                    onClick={onButtonClick}
                />
                <BooleanSelectorButton
                    title='False'
                    value={false}
                    curValue={curChoice}
                    onClick={onButtonClick}
                />
            </div>
        </>
    );
}

interface BooleanSelectorConfig {
    /**
     * Default value of this boolean selector, could be undefined
     */
    defaultValue?: boolean;

    /**
     * Callback function when value of this selector changed, this 
     * callback function should receive a value which can be `boolean` or 
     * `undefined`, and return `any`
     */
    onChange?: (value: boolean | undefined) => (any);
}


/**The button in the Boolean Selector */
function BooleanSelectorButton({
    title,
    value,
    curValue,
    onClick,
}: BooleanSelectorButtonConfig) {
    // if title is undefined
    if (title === undefined) {
        title = JSON.stringify(value);
    }
    return (
        <>
            <button className={classNames(
            )}
                onClick={function () {
                    if (onClick !== undefined) {
                        onClick(value);
                    }
                }}>
                <Container
                    transparent={true}
                    hoverColor={true}
                    className={classNames(
                        (() => {
                            if (value === curValue) {
                                return classNames(
                                    'bg-black text-white',
                                    'dark:bg-white dark:text-black',
                                    'font-semibold',
                                    'shadow-lg');
                            }
                            else {
                                return 'bg-bgcolor/[.5] dark:bg-bgcolor-dark/[.5]';
                            }
                        })(),
                        'transition',
                    )}>
                    <div className={classNames(
                        'mx-2 my-1',
                        (() => {
                            if (value === curValue) {
                                return 'text-white dark:text-black';
                            }
                            else {
                                return '';
                            }
                        })(),
                    )}>
                        {title}
                    </div>
                </Container>
            </button >
        </>
    );
}

interface BooleanSelectorButtonConfig {
    /**
     * The title of this button, will be showed as button text
     * 
     * If undefined, title will be autoset to JSON.stringify(value)
     */
    title?: string;

    /**
     * Value which will be used as return value when onClick triggered 
     * and calling the callback function
     */
    value?: boolean;

    /**
     * Current value of the parent selector of this button, used to 
     * check if this button is selected and changed the CSS style based on 
     * the current select situation
     * 
     * Notice:
     * - In usual, this value should be a state of the parent component
     */
    curValue?: boolean;

    /**
     * Callback function when this button has been clicked
     */
    onClick?: (value: boolean | undefined) => (any);
}