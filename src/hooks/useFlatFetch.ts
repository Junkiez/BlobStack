import {useCallback} from "react";
import supabase from "../lib/supabase/supabase.ts";
import IFileObject from "../models/IFileObject.ts";

export default function useFlatFetch(directory: string, setFiles: (param: IFileObject[])=>void) {
    return useCallback(async () => {
        if (sessionStorage.getItem('bucket')) {
            const files = await supabase.storage.from(sessionStorage.getItem('bucket') as string).list(directory);
            console.log(files.data);
            if (files.data) {
                setFiles(files.data);
            }
        }
    }, [directory, setFiles])
}
