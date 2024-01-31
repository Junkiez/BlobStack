import supabase from "../supabase/supabase.ts";

export const createFile = async (path: string, file: File) => {
    const res = await supabase.storage.from(sessionStorage.getItem('bucket') as string).upload(path, file)
    console.log(res);
}

export const createFolder = async (path: string) => {
    const res = await supabase.storage.from(sessionStorage.getItem('bucket') as string).upload(`${path}/.empty`, '')
    console.log(res);
}

export const readFile = async (name: string, directory: string) => {
    return await supabase.storage.from(sessionStorage.getItem('bucket') as string).download((directory ? directory + "/" : '') + name);
}

export const updateFile = async (path: string, newPath: string) => {
    await supabase.storage.from(sessionStorage.getItem('bucket') as string).copy(path, newPath)
    await supabase.storage.from(sessionStorage.getItem('bucket') as string).remove([path]);
}

export const deleteFile = async (file: string, directory: string, metadata: any|undefined) => {
    if (metadata) {
        const {error} = await supabase.storage.from(sessionStorage.getItem('bucket') as string).remove([`${directory ? directory + '/' : ''}${file}`]);
        if (error) {
            alert(error.message);
        }
    } else {
        const {data} = await supabase.storage.from(sessionStorage.getItem('bucket') as string).list(file);
        const files = data?.map(f => `${file}/${f.name}`) || []
        const {error} = await supabase.storage.from(sessionStorage.getItem('bucket') as string).remove(files);
        if (error) {
            alert(error.message);
        }
    }
}
