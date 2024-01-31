import {
    Card,
    Icon,
    Table,
    TableHead,
    TableRow, TableBody, TableCell, TableHeaderCell,
} from "@tremor/react";
import {useEffect, useState} from "react";
import {VideoCameraIcon} from "@heroicons/react/outline";
import User from "../components/User.tsx";
import FileObject from "../models/IFileObject.ts";
import useRecursiveFetch from "../hooks/useRecursiveFetch.ts";
import useSearch from "../hooks/useSearch.tsx";
import PlayVideoDialog from "../components/PlayVideoDialog.tsx";

function CustomTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell className="text-right">Type</TableHeaderCell>
                <TableHeaderCell className="text-right">Size</TableHeaderCell>
                <TableHeaderCell className="text-right">Created</TableHeaderCell>
                <TableHeaderCell className="text-right">Play</TableHeaderCell>
            </TableRow>
        </TableHead>
    )
}

export default function Video() {
    const [searchQuery, Search] = useSearch();
    const [selectedVideo, setSelectedVideo] = useState<string>("");
    const [videoModal, setVideoModal] = useState<boolean>(false);
    const isSearched = (f: FileObject) => (f.name.includes(searchQuery as string));

    const [files, setFiles] = useState<FileObject[] | null>()

    const [updateData] = useRecursiveFetch("video", setFiles);

    const openPlayer = (path: string) => {
        setSelectedVideo(path as string);
        setVideoModal(true);
    }

    useEffect(() => {
        updateData().then(console.log);
    }, [updateData]);

    return (
        <>
            <div className="h-full w-full p-2 space-y-2">
                <div className="h-[10vh] w-full flex items-center justify-between">
                    {Search}
                    <User/>
                </div>
                <Card className="grow">
                    <Table className="mt-6 overflow-y-scroll h-[75vh]">
                        <CustomTableHead/>
                        <TableBody>
                            {files && files
                                .filter((item) => isSearched(item))
                                .map((item) => (
                                    <TableRow key={item.name}>
                                        <TableCell className="truncate max-w-64"
                                                   title={item.name}>{item.name}</TableCell>
                                        <TableCell
                                            className="text-right">{item.metadata && item.metadata.mimetype}</TableCell>
                                        <TableCell
                                            className="text-right">{item.metadata && `${(item.metadata.size / 1000000).toFixed(2)}Mb`}</TableCell>
                                        <TableCell
                                            className="text-right">{item.updated_at && item.updated_at.split('T')[0]}</TableCell>
                                        <TableCell className="text-right">
                                            <button onClick={() => openPlayer(item.path as string)}
                                                    className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <Icon color="green" icon={VideoCameraIcon}/>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
            <PlayVideoDialog isOpen={videoModal} setIsOpen={setVideoModal} file={selectedVideo}/>
        </>
    )
}
