// Tools
import * as http from '@/tools/http';

// Classes
import { ClassInfo, MemberInfo } from '@/stores/genInfoStore';

// Config
import * as apiConfig from '@/config/api';


export async function getDartClassStr(classInfo: ClassInfo): Promise<string> {
    let res = await http.post(apiConfig.baseUrl, classInfo);
    // if server failed to generated class string
    if (res.success === false) {
        if (res.err_msg !== null) {
            throw `[GenerateError] ${res.err_msg}`;
        }
        else {
            throw '[UnknownGenerateError] Unknown error occured when generating dart class, ' +
            'please try again later';
        }
    }
    return res.generate_class_str;
}