import { useState } from "react";
import Conversations from "./Conversations.jsx";
import SearchInput from "./SearchInput.jsx";

function Sidebar() {
    const [searchResults] = useState([]);

    return (
        <div className=" border-r w-2/5 border-slate-500 p-7  flex flex-col ">    
            <SearchInput />
            <div className="divider px-3"></div>
            <Conversations searchResults={searchResults} />
        </div>
    );
}

export default Sidebar;