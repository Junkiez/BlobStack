import {ReactNode} from "react";

export default function Main({children}: { children: ReactNode; }) {
    return (
        <main className="h-screen w-screen flex flex-col md:flex-row items-center justify-center">
            {children}
        </main>
    )
}
