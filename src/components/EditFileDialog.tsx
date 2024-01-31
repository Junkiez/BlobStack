import {Button, Dialog, DialogPanel, TextInput} from "@tremor/react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {updateFile} from "../lib/api/fileActions.ts";

export default function EditFileDialog({isOpen, setIsOpen, directory, previousName}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    previousName: string,
    directory: string
}) {
    const [fileName, setFileName] = useState<string>();

    useEffect(() => {
        setFileName(previousName);
    }, [previousName]);

    const buttonAction = async () => {
        if (fileName) {
            await updateFile(`${directory ? directory + '/' : ''}${previousName}`, `${directory ? directory + '/' : ''}${fileName}`);
            setIsOpen(false);
        }
    }

    return (
        <Dialog open={isOpen} onClose={setIsOpen} static={true}>
            <DialogPanel className="flex flex-col gap-2 items-end">
                <TextInput placeholder="Type file name..."
                           value={fileName}
                           onChange={e => setFileName(e.target.value)}/>
                <span className="space-x-2">
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                    <Button onClick={buttonAction}>
                        Update
                    </Button>
                </span>
            </DialogPanel>
        </Dialog>
    )
}
