'use client';

// Components
import { Container } from '@/components/container';

// Tools
import { classNames } from '@/tools/css_tools';

// Stores
import { useGenInfoStore, useGenInfoStoreConfig, ClassInfo, MemberInfo } from '@/stores/genInfoStore';


/**
 * Setting Board Aera Component
 */
export function SettingBoard() {
    return (<>
        <Container className={classNames(
            'flex flex-auto h-full w-full',
            'overflow-y-auto',
        )}>
            <div className={classNames(
                'flex flex-col',
                'h-full w-full',
                'overflow-y-auto',
                'px-4 py-2',
            )}>
                <ClassInfoSettingCard />
                <hr className={classNames(
                    'border-bgcolor dark:border-bgcolor-dark',
                    'my-5 mx-10'
                )}></hr>
                <MemberInfoSettingCard />
                <TestComponent />
            </div>
        </Container>
    </>)
}

/**
 * Components to set the class fundamental info like 
 * class name
 */
function ClassInfoSettingCard() {

    let classInfo: ClassInfo = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).info));
    let curVer = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).curVer));
    let updateVer = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).updateVer));

    return (<>
        <div className={classNames(
            'flex flex-col flex-none'
        )}>
            {/* Class Name Part */}
            <InputTile
                title='ClassName'
                defaultValue={classInfo.classname}
                placeholder='Enter your classname here...'
                onChange={function (newValue: string) {
                    classInfo.classname = newValue;
                    updateVer();
                }}
                isSingleLine={true}
            />
            {/* Class Comment Part */}
            <InputTile
                title='Comment'
                defaultValue={classInfo.comment ?? undefined}
                placeholder='Class comment...'
                onChange={function (newValue: string) {
                    classInfo.comment = newValue;
                    updateVer();
                }}
            />
        </div>
    </>);
}


function MemberInfoSettingCard() {
    const member_list: MemberInfo[] = useGenInfoStore((state) => {
        return (state as useGenInfoStoreConfig).info.member_list;
    });
    const curVer: number = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).curVer));


    return (<>
        <div>
            {member_list.map(function (memberInfo: MemberInfo) {
                return (<>
                    <div className={classNames(
                        'flex flex-auto min-w-0 w-full'
                    )}>
                        <MemberInfoSettingTile
                            memberInfo={memberInfo}
                            key={memberInfo.identifier}
                        />
                    </div>
                </>);
            })}
        </div>
    </>);
}

function MemberInfoSettingTile({ memberInfo, key }: {
    memberInfo: MemberInfo,
    key: any
}) {
    return (<>
        <div className={classNames(
            'flex flex-auto w-full min-w-0',
        )}>
            <InputTile
                title='VariableName'
                defaultValue={memberInfo.identifier}
                placeholder='Enter the variable name of this member...'
                isSingleLine={true}
            />
        </div>
    </>);
}

/**
 * Test components that shows the current class info
 */
function TestComponent() {
    let classInfo: ClassInfo = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).info));
    let curVer = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).curVer));

    return (<>
        <pre className={classNames(
            'break-all whitespace-pre-wrap',
        )}>
            {JSON.stringify(classInfo, null, 2)}
        </pre>
    </>);
}


/**
 * Input tile component with unified format and UI
 */
function InputTile({ title,
    placeholder,
    defaultValue,
    onChange,
    resizable,
    isSingleLine,
}: InputTileConfig) {
    // Set default value
    if (resizable === undefined) {
        resizable = true;
    }
    if (isSingleLine === undefined) {
        isSingleLine = false;
    }
    // if isSingleLine, then it must not be 
    // resizable
    if (isSingleLine === true) {
        resizable = false;
    }
    return (<>
        <div className={classNames(
            'flex flex-auto flex-col',
            'items-start justify-start',
            'px-1 py-2'
        )}>
            {/* Input Title Part */}
            <p className={classNames(
                'font-bold',
                'ml-1 mb-1'
            )}>
                {title}
            </p>
            {/* Input Text Part */}
            <textarea
                className={classNames(
                    'rounded-xl',
                    'bg-bgcolor/[.5] dark:bg-bgcolor-dark/[.5]',
                    'px-2 py-1',
                    'flex w-full',
                    resizable ? '' : 'resize-none',
                )}
                defaultValue={defaultValue}
                onChange={function (event) {
                    if (onChange !== undefined) {
                        onChange(event.target.value);
                    }
                }}
                rows={isSingleLine ? 1 : 3}
                placeholder={placeholder}>
            </textarea>
        </div>
    </>);
}

interface InputTileConfig {
    /**Title of this input tile, will show as title above */
    title: string;

    /**The placeholder showed as a short hint in the textarea */
    placeholder?: string;

    /** The default value in the block */
    defaultValue?: string;

    /**Callback function when value changed in this InputTile */
    onChange?: (newValue: string) => (void);

    /**If input area resizeable */
    resizable?: boolean;

    /**If the input area has only one line
     * 
     * Notice: If `isSingleLine` is `true`, then the resize will be 
     * set to none even if `resizable` is `true`
    */
    isSingleLine?: boolean;
};