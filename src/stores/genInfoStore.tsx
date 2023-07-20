import { create } from 'zustand';

class MemberInfo {
    constructor(identifier: string, type_name: string, default_value: string | null = null) {
        this.identifier = identifier;
        this.type_name = type_name;
        this.default_value = default_value;
        if (default_value === null) {
            this.nullable = true;
        }
    }

    copyWith(anoIns: MemberInfo): MemberInfo {
        this.identifier = anoIns.identifier;
        this.type_name = anoIns.type_name;
        this.default_value = anoIns.default_value;
        this.comment = anoIns.comment;
        this.nullable = anoIns.nullable;
        this.is_class = anoIns.is_class;
        this.is_list = anoIns.is_list;
        return this;
    }

    static createWith(anoIns: MemberInfo): MemberInfo {
        let newMemberInfo: MemberInfo = new MemberInfo(anoIns.identifier, anoIns.type_name);
        newMemberInfo.copyWith(anoIns);
        return newMemberInfo;
    }

    identifier: string = 'newMember';
    type_name: string = 'int';
    default_value: string | null = null;
    comment: string | null = null;
    nullable: boolean = false;
    is_class: boolean = false;
    is_list: boolean = false;
}

class ClassInfo {
    constructor(classname: string | null, comment: string | null = null) {
        this.classname = classname ?? 'NewDartClass';
        this.comment = comment;
        this.member_list = [];
    }
    classname: string = 'TestDartClass';
    comment: string | null = null;
    member_list: MemberInfo[];

    /**
     * Update the value of this instance based on another ClassInfo instance
     */
    copyWith(anoIns: ClassInfo): ClassInfo {
        this.classname = anoIns.classname;
        this.comment = anoIns.comment;
        this.member_list = [];
        let cnt: number = anoIns.member_list.length;
        for (let i = 0; i < cnt; i++) {
            this.member_list.push(MemberInfo.createWith(anoIns.member_list[i]));
        }
        return this;
    }

    /**
     * Create a new copy of a ClassInfo instance
     */
    static createWith(anoIns: ClassInfo): ClassInfo {
        let newClassInfo = new ClassInfo('NewDartClass');
        newClassInfo.copyWith(anoIns);
        return newClassInfo;
    }
}


export interface useGenInfoStoreConfig {
    info: ClassInfo,
    curVer: number,
    updateVer: () => void,
    updateInfo: (newClassInfo: ClassInfo) => void,
    updateInfoByCallBack: (callback: (info: ClassInfo) => ClassInfo) => void,
}

const useGenInfoStore = create((set) => ({
    // The genInfo
    info: new ClassInfo('NewDartClass'),
    // Current State Version
    curVer: 0,
    /**
     * Update the state version by one
     */
    updateVer: function (): void {
        set(((state: useGenInfoStoreConfig) => ({
            curVer: state.curVer + 1,
        })));
    },
    updateInfo: function (newClassInfo: ClassInfo): void {
        set((state: useGenInfoStoreConfig) => {
            return { info: newClassInfo };
        });
    },
    /** 
     * Update the info based on a callback modify function that receive a new class info 
     * which is same to the current state, the callback function should modify the received 
     * class instance than return it, which will become the new info in the state
     */
    updateInfoByCallBack: function (callback: (info: ClassInfo) => ClassInfo): void {
        set((state: useGenInfoStoreConfig) => {
            // Create a new info instance
            let newClassInfo: ClassInfo = ClassInfo.createWith(state.info);
            // pass to callback function to modifiy the new class info
            newClassInfo = callback(newClassInfo);
            // finally return the ovveride prop to update the info in state
            return { info: newClassInfo };
        });
    },
}));

export { useGenInfoStore }