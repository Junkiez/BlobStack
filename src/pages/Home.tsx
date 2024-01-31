import {
    Card,
    Icon,
    TextInput,
    Table,
    TableHead,
    MultiSelect,
    MultiSelectItem, TableRow, TableBody, TableCell, TableHeaderCell,
} from "@tremor/react";
import {useEffect, useState} from "react";
import {
    DownloadIcon,
    FolderIcon,
    PencilIcon,
    SearchIcon,
    TrashIcon,
    UploadIcon
} from "@heroicons/react/outline";
import AddFolderDialog from "../components/AddFolderDialog.tsx";
import AddFileDialog from "../components/AddFileDialog.tsx";
import User from "../components/User.tsx";
import EditFileDialog from "../components/EditFileDialog.tsx";
import FileObject from "../models/IFileObject.ts";
import useBucket from "../hooks/useBucket.ts";
import {deleteFile, readFile} from "../lib/api/fileActions.ts";
import useFlatFetch from "../hooks/useFlatFetch.ts";

function CustomTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell className="text-right">Type</TableHeaderCell>
                <TableHeaderCell className="text-right">Size</TableHeaderCell>
                <TableHeaderCell className="text-right">Created</TableHeaderCell>
                <TableHeaderCell className="text-right">Download</TableHeaderCell>
                <TableHeaderCell className="text-right">Edit</TableHeaderCell>
                <TableHeaderCell className="text-right">Delete</TableHeaderCell>
            </TableRow>
        </TableHead>
    )
}

export default function Home() {
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [editingFile, setEditingFile] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [directory, setDirectory] = useState("");
    const [addDirectoryModal, setAddDirectoryModal] = useState<boolean>(false);
    const [addFileModal, setAddFileModal] = useState<boolean>(false);
    const [editFileModal, setEditFileModal] = useState<boolean>(false);
    const isTypeSelected = (f: FileObject) => (f.metadata && selectedNames.includes(f.metadata.mimetype)) || (!f.metadata && selectedNames.includes('folder')) || selectedNames.length === 0;
    const isSearched = (f: FileObject) => (f.name.includes(searchQuery));

    const [files, setFiles] = useState<FileObject[] | null>()

    const updateData = useFlatFetch(directory, setFiles);

    const downloadFile = async (name: string) => {
        const {data, error} = await readFile(name, directory);
        if (data) {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(data);
            downloadLink.download = name;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } else {
            alert(error?.message);
        }
    }

    useBucket(updateData);

    useEffect(() => {
        updateData().then(console.log);
    }, [addFileModal, addDirectoryModal, editFileModal, directory, updateData]);

    return (
        <>
            <div className="h-full w-full p-2 space-y-2">
                <div className="h-[10vh] w-full flex items-center justify-between">
                    <TextInput icon={SearchIcon}
                               placeholder="Search..."
                               className="w-64"
                               value={searchQuery}
                               onChange={e => setSearchQuery(e.target.value)}
                    />
                    <User/>
                </div>
                <Card className="grow">
                    <div className="flex">
                        <MultiSelect
                            onValueChange={setSelectedNames}
                            placeholder="Select type..."
                            className="max-w-xs"
                        >
                            {files && [...new Set(files.map(f => f.metadata ? f.metadata.mimetype : "folder"))].map((t) => (
                                <MultiSelectItem key={t} value={t}>
                                    {t}
                                </MultiSelectItem>
                            ))}
                        </MultiSelect>
                        <span className="flex">
                            <button onClick={() => setAddFileModal(true)}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Icon icon={UploadIcon}/>
                            </button>
                            <button onClick={() => setAddDirectoryModal(true)}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Icon icon={FolderIcon}/>
                            </button>
                        </span>
                    </div>
                    <div className="flex">
                        <button className="cursor-pointer hover:text-blue-600"
                                onClick={() => setDirectory('')}>Home&gt;</button>
                        {directory && directory.split('/').map(((d) => <button
                            className="cursor-pointer hover:text-blue-600"
                            onClick={() => setDirectory((directory.split(d)[0] ? directory.split(d)[0] + '/' : '') + d)}>{d}&gt;</button>))}
                    </div>
                    <Table className="mt-6 overflow-y-scroll h-[65vh]">
                        <CustomTableHead/>

                        <TableBody>
                            {files && files
                                .filter((item) => isTypeSelected(item))
                                .filter((item) => isSearched(item))
                                .map((item) => (
                                    <TableRow key={item.name}
                                              onDoubleClick={() => setDirectory((directory ? directory + '/' : '') + item.name)}>
                                        <TableCell className="truncate max-w-64"
                                                   title={item.name}>{item.name}</TableCell>
                                        <TableCell
                                            className="text-right">{item.metadata && item.metadata.mimetype}</TableCell>
                                        <TableCell
                                            className="text-right">{item.metadata && `${(item.metadata.size / 1000000).toFixed(2)}Mb`}</TableCell>
                                        <TableCell
                                            className="text-right">{item.updated_at && item.updated_at.split('T')[0]}</TableCell>
                                        <TableCell className="text-right">
                                            {item.metadata &&
                                                <button onClick={() => downloadFile(item?.name)}
                                                        className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <Icon color="green" icon={DownloadIcon}/>
                                                </button>
                                            }
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <button onClick={async () => {
                                                setEditingFile(item.name);
                                                setEditFileModal(true);
                                            }}
                                                    className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <Icon icon={PencilIcon}/>
                                            </button>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <button onClick={async () => {
                                                await deleteFile(item.name, directory, item.metadata);
                                                await updateData();
                                            }}
                                                    className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <Icon color="red" icon={TrashIcon}/>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
            <AddFileDialog isOpen={addFileModal} setIsOpen={setAddFileModal} directory={directory}/>
            <AddFolderDialog isOpen={addDirectoryModal} setIsOpen={setAddDirectoryModal} directory={directory}/>
            <EditFileDialog isOpen={editFileModal} setIsOpen={setEditFileModal} directory={directory}
                            previousName={editingFile}/>
        </>
    )
}
