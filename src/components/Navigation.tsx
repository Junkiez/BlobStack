import {Link} from "@tanstack/react-router";
import icon from "../assets/icon.svg";
import {Icon} from "@tremor/react";
import {
    MenuIcon,
    DocumentIcon,
    MusicNoteIcon,
    VideoCameraIcon,
    HomeIcon,
    PhotographIcon
} from "@heroicons/react/outline";
import {useEffect, useRef, useState} from "react";

const links = [
    {
        icon: HomeIcon,
        text: "Home",
        link: "/",
    },
    {
        icon: PhotographIcon,
        text: "Photo",
        link: "/photo",
    },
    {
        icon: VideoCameraIcon,
        text: "Video",
        link: "/video",
    },
    {
        icon: MusicNoteIcon,
        text: "Music",
        link: "/music",
    },
    {
        icon: DocumentIcon,
        text: "Docs",
        link: "/docs",
    },
]
export default function Navigation() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const closeSidebar = () => {
            setSidebarOpen(false);
        };

        document.addEventListener('click', closeSidebar);

        return () => {
            document.removeEventListener('click', closeSidebar);
        };
    }, [sidebarRef]);

    return (
        <>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                    type="button"
                    onClick={toggleSidebar}
                    className="absolute left-0 top-[5vh] -translate-y-1/2 items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <Icon icon={MenuIcon}/>
            </button>

            <aside ref={sidebarRef} id="logo-sidebar" onClick={e=>e.stopPropagation()}
                   className={`fixed md:relative top-0 left-0 z-40 min-w-64 h-screen transition-transform ${
                       sidebarOpen ? '' : '-translate-x-full sm:translate-x-0'
                   }`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center ps-2.5 mb-5">
                        <img src={icon} className="h-6 me-3 sm:h-7"
                             alt="BlobStack Logo"/>
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            BlobStack
                        </span>
                    </div>
                    <ul className="space-y-2 font-medium">
                        {links.map(l => (
                            <li key={l.text}>
                                <Link to={l.link}
                                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <Icon icon={l.icon}/>
                                    <span className="ms-3">{l.text}</span>
                                </Link>
                            </li>)
                        )}
                    </ul>
                </div>
            </aside>
        </>
    )
}
