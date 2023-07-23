'use client';

// Components
import { Container } from '@/components/container';
import { BooleanSelector } from '@/components/boolean_selector'

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
            'dark:[color-scheme:dark]',
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
                    'mt-5 mx-10'
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
                nullIfEmpty={false}
                onChange={function (newValue: string | null) {
                    classInfo.classname = newValue ?? '';
                    updateVer();
                }}
                isSingleLine={true}
            />
            {/* Class Comment Part */}
            <InputTile
                title='Comment'
                defaultValue={classInfo.comment ?? undefined}
                placeholder='Class comment...'
                nullIfEmpty={true}
                onChange={function (newValue: string | null) {
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
            <ul>
                {member_list.map(function (memberInfo: MemberInfo, index: number) {
                    return (
                        <div className={classNames(
                            'flex flex-auto min-w-0 w-full'
                        )}
                            key={index}>
                            <MemberInfoSettingTile
                                memberInfo={memberInfo}
                                index={index}
                            />
                        </div>
                    );
                })}
            </ul>
        </div>
    </>);
}

function MemberInfoSettingTile({ memberInfo, index }: {
    memberInfo: MemberInfo,
    index: number
}) {
    const classInfo: ClassInfo = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).info));
    const curVer: number = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).curVer));
    const updateVer = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).updateVer));
    const updateInfoByCallBack = useGenInfoStore((state) => ((state as useGenInfoStoreConfig).updateInfoByCallBack));

    /**
     * Change the memberinfo and sync to state
     * 
     * Prarms:
     * - `callback` A function that receives a member info and do some 
     * change directly in the received object
     */
    function updateMemberInfo(
        callback: (memberInfo: MemberInfo) => (void),
    ) {
        let curMemberInfo: MemberInfo = classInfo.member_list[index];
        callback(curMemberInfo);
        updateVer();
    }

    /**
     * Copy the memberInfo of this tile in the classInfo
     * 
     * Notice:
     * - The new member will be the next of this member in the list
     * - Calling this method will cause `classInfo` state refresh
     */
    function copyThisMember(): void {
        let curMemberInfo = classInfo.member_list[index];
        let newMemberInfo = MemberInfo.createWith(curMemberInfo);
        // Insert the new member info at the original index
        classInfo.member_list.splice(index, 0, newMemberInfo);
        // Since the new memberinfo has been insert to the current 
        // index, so the curMemberInfo will be at the inserted place 
        // and considered as the new member at user prespective
        curMemberInfo.identifier += '_copy';
        // call updateVer to trigger UI refresh
        updateVer();
    }

    /**
     * Remove this member from the classInfo member list
     * 
     * Notice:
     * - Remove operation is based on index, please make sure 
     * `index` param is correct in this component
     * - Calling this function will cause classInfo state change
     */
    function removeThisMember(): void {
        // Insert the new member info at the original index
        classInfo.member_list.splice(index, 1);
        updateVer();
    }

    return (<>
        <div className={classNames(
            'flex flex-col flex-auto w-full min-w-0',
        )}>
            {/* Tag and buttons */}
            <div className={classNames(
                'flex flex-row w-full h-auto min-h-0',
                'items-center',
                'gap-x-2 mt-5',
            )}>
                <div className={classNames(
                    'flex flex-auto w-full',
                    'rounded-xl',
                    'bg-primary/[.9] text-white',
                    'justify-between items-center text-center',
                    'px-2 py-2',
                    'mt-5',
                    'font-mono font-bold text-lg',
                )}>
                    <div>Member #{index + 1}</div>
                    <div className={classNames(
                        'flex flex-row min-w-0',
                        'gap-x-2'
                    )}>
                        <button onClick={copyThisMember}>
                            <div className={classNames(
                                'min-w-[2rem] max-w-max',
                                'rounded-lg',
                                'bg-black/[.3] hover:bg-primary text-white',
                                'transition-colors',
                                'items-center text-center',
                                'px-3',
                            )}>
                                COPY
                            </div>
                        </button>
                        <button onClick={removeThisMember}>
                            <div className={classNames(
                                'min-w-[2rem] max-w-max',
                                'rounded-lg',
                                'bg-black/[.3] hover:bg-red text-white',
                                'transition-colors',
                                'items-center text-center',
                                'px-3',
                            )}>
                                REMOVE
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {/* Input Part */}
            <InputTile
                title='Identifier'
                defaultValue={memberInfo.identifier}
                placeholder='Enter the variable name of this member...'
                isSingleLine={true}
                nullIfEmpty={false}
                onChange={(newValue: string | null) => {
                    updateMemberInfo(function (memberInfo: MemberInfo) {
                        memberInfo.identifier = newValue ?? '';
                    });
                }}
            />
            <InputTile
                title='Type'
                defaultValue={memberInfo.type_name}
                placeholder='Enter the type of this member...'
                isSingleLine={true}
                nullIfEmpty={false}
                onChange={(newValue: string | null) => {
                    updateMemberInfo(function (memberInfo: MemberInfo) {
                        memberInfo.type_name = newValue ?? '';
                    });
                }}
            />
            <InputTile
                title='Default'
                defaultValue={memberInfo.default_value ?? undefined}
                placeholder='Enter the default value of this member...'
                isSingleLine={true}
                nullIfEmpty={true}
                onChange={(newValue: string | null) => {
                    updateMemberInfo(function (memberInfo: MemberInfo) {
                        memberInfo.default_value = newValue;
                    });
                }}
            />
            <InputTile
                title='Comment'
                defaultValue={memberInfo.comment ?? undefined}
                placeholder='Enter the comment of this member...'
                isSingleLine={false}
                resizable={true}
                nullIfEmpty={true}
                onChange={(newValue: string | null) => {
                    updateMemberInfo(function (memberInfo: MemberInfo) {
                        memberInfo.comment = newValue;
                    });
                }}
            />
            <BooleanInputTile
                title='Is Class'
                defaultValue={memberInfo.is_class}
                onChange={(newValue: boolean | undefined) => {
                    updateMemberInfo(function (memberInfo: MemberInfo) {
                        memberInfo.is_class = newValue ?? false;
                    });
                }} />
            <BooleanInputTile
                title='Is List'
                defaultValue={memberInfo.is_list}
                onChange={(newValue: boolean | undefined) => {
                    updateMemberInfo(function (memberInfo: MemberInfo) {
                        memberInfo.is_list = newValue ?? false;
                    });
                }} />
            <BooleanInputTile
                title='Nullable'
                defaultValue={memberInfo.nullable}
                onChange={(newValue: boolean | undefined) => {
                    updateMemberInfo(function (memberInfo: MemberInfo) {
                        memberInfo.nullable = newValue ?? false;
                    });
                }} />
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
    nullIfEmpty,
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
    if (nullIfEmpty === undefined) {
        nullIfEmpty = true;
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
                    if (onChange === undefined) {
                        return;
                    }
                    if ((nullIfEmpty === true) && (event.target.value === '')) {
                        onChange(null);
                    }
                    else {
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
    onChange?: (newValue: string | null) => (void);

    /**If input area resizeable */
    resizable?: boolean;

    /**If the input area has only one line
     * 
     * Notice: If `isSingleLine` is `true`, then the resize will be 
     * set to none even if `resizable` is `true`
    */
    isSingleLine?: boolean;

    /** 
     * If the value should be considerea as `null` when there is an 
     * empty string ("")
    */
    nullIfEmpty?: boolean;
};


/**
 * Input tile with title that let user choose a boolean value
 */
function BooleanInputTile({
    title,
    defaultValue,
    onChange,
}: BooleanInputTileConfig) {
    return (<>
        <div className={classNames(
            'flex flex-row flex-auto min-w-0 w-full',
            'justify-between items-center',
            'px-1 py-2',
        )}>
            <p className={classNames(
                'flex flex-none',
                'font-bold',
            )}>
                {title}
            </p>
            <div className={classNames(
                'flex flex-none',
            )}>
                <BooleanSelector
                    defaultValue={defaultValue}
                    onChange={onChange} />
            </div>
        </div>
    </>);
}

interface BooleanInputTileConfig {
    title: string;
    defaultValue?: boolean;
    onChange?: (value: boolean | undefined) => any;
}