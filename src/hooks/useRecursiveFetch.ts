import {useCallback} from "react";
import IFileObject from "../models/IFileObject.ts";
import supabase from "../lib/supabase/supabase.ts";

export default function useRecursiveFetch(mimetype: string, setFiles: (param: IFileObject[])=>void) {
    const recursiveFetch = useCallback(async () => {
        if (sessionStorage.getItem('bucket')) {
            const audio = [];
            const folders = [""] as string[];
            while (folders.length !== 0) {
                const d = folders.pop();
                const files = await supabase.storage.from(sessionStorage.getItem('bucket') as string).list(d);
                console.log(files)
                if (files.data) {
                    for (const f of files.data) {
                        if (f.metadata) {
                            if (f.metadata.mimetype.includes(mimetype)) {
                                audio.push({...f,path:(d?d+'/':'')+f.name});
                            }
                        } else {
                            folders.push((d ? d + '/' : '') + f.name);
                        }
                    }
                }
            }
            setFiles(audio);
        }
    }, [mimetype, setFiles])
    
    return [recursiveFetch]
}
