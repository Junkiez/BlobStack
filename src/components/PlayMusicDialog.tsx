import {Button, Dialog, DialogPanel} from "@tremor/react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import supabase from "../lib/supabase/supabase.ts";

export default function PlayMusicDialog({isOpen, setIsOpen, file}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    file: string
}) {
    const [song, setSong] = useState<string>("")

    useEffect(() => {
        (async () => {
            const {data} = await supabase.storage.from(sessionStorage.getItem('bucket') as string).download(file);
            if (data) {
                setSong(URL.createObjectURL(data));
            }
        })()
    }, [file]);

    return (
        <Dialog open={isOpen} onClose={setIsOpen} static={true}>
            <DialogPanel className="flex flex-col gap-2 items-end">
                <audio controls src={song} className="w-full"></audio>
                <span className="space-x-2">
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </span>
            </DialogPanel>
        </Dialog>
    )
}
