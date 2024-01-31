import {Button, Dialog, DialogPanel} from "@tremor/react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import supabase from "../lib/supabase/supabase.ts";

export default function ShowPictureDialog({isOpen, setIsOpen, file}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    file: string
}) {
    const [picture, setPicture] = useState<string>("")

    useEffect(() => {
        (async () => {
            const {data} = await supabase.storage.from(sessionStorage.getItem('bucket') as string).download(file);
            if (data) {
                setPicture(URL.createObjectURL(data));
            }
        })()
    }, [file]);

    return (
        <Dialog open={isOpen} onClose={setIsOpen} static={true}>
            <DialogPanel className="flex flex-col gap-2 items-end">
                <div className="w-full flex justify-center">
                    <img src={picture} className="w-auto max-h-[80vh]" alt={file}></img>
                </div>
                <span className="space-x-2">
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </span>
            </DialogPanel>
        </Dialog>
    )
}
