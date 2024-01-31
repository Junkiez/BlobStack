import {Button, Dialog, DialogPanel} from "@tremor/react";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {createFile} from "../lib/api/fileActions.ts";

export default function AddFileDialog({isOpen, setIsOpen, directory}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    directory: string
}) {
    const [file, setFile] = useState<File | null>();

    const buttonAction = async () => {
        if (file) {
            await createFile(`${directory}/${file?.name}`, file);
            setFile(null);
            setIsOpen(false);
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <Dialog open={isOpen} onClose={setIsOpen} static={true}>
            <DialogPanel className="flex flex-col gap-2 items-end">
                <input type="file" onChange={handleFileChange} placeholder="Select file to upload..."/>
                <span className="space-x-2">
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                    <Button onClick={buttonAction}>
                        Add
                    </Button>
                </span>
            </DialogPanel>
        </Dialog>
    )
}
