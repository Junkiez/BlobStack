import {SearchIcon} from "@heroicons/react/outline";
import {TextInput} from "@tremor/react";
import {useState} from "react";

export default function useSearch() {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return [searchQuery, <TextInput icon={SearchIcon}
        placeholder="Search..."
        className="w-64"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}/>]
}
