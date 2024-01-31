import {Button, Dialog, DialogPanel, TextInput} from "@tremor/react";
import {Dispatch, SetStateAction, useState} from "react";
import {createFolder} from "../lib/api/fileActions";

export default function AddFolderDialog({isOpen, setIsOpen, directory}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    directory: string
}) {
    const [folderName, setFolderName] = useState("");

    const buttonAction = async () => {
        if (folderName) {
            await createFolder(`${directory}/${folderName}`);
            setFolderName('');
            setIsOpen(false);
        }
    }

    return (
        <Dialog open={isOpen} onClose={setIsOpen} static={true}>
            <DialogPanel className="flex flex-col gap-2 items-end">
                <TextInput placeholder="Type folder name..."
                           value={folderName}
                           onChange={e => setFolderName(e.target.value)}/>
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
