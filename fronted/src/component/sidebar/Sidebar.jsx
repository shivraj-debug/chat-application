import { useState } from "react";
import Conversations from "./Conversations.jsx";
import SearchInput from "./SearchInput.jsx";
import LogOutButton from "./LogOutButton.jsx";

function Sidebar() {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className=" border-r w-3/12 border-slate-500 p-10  flex flex-col ">
            <SearchInput setSearchResults={setSearchResults} />
            <div className="divider px-3"></div>
            <Conversations searchResults={searchResults} />
            <LogOutButton />
        </div>
    );
}

export default Sidebar;




// import { useState } from "react";
// import Conversations from "./Conversations.jsx";
// import SearchInput from "./SearchInput.jsx";
// import LogOutButton from "./LogOutButton.jsx";

// function Sidebar() {
//     const [searchResults, setSearchResults] = useState([]);

//     return (
//         <div className="border-r border-slate-500 p-4 flex flex-col">
//             <SearchInput setSearchResults={setSearchResults} />
//             <div className="divider px-3"></div>
//             <Conversations searchResults={searchResults} />
//             <LogOutButton />
//         </div>
//     );
// }

// export default Sidebar;


// // import React from 'react'
// import Conversations from "./Conversations.jsx"
// import SearchInput from "./SearchInput.jsx"
// import LogOutButton from "./LogOutButton.jsx"

// function Sidebar() {
//   return (
//     <div className="border-r border-slate-500 p-4 flex flex-col">
//       <SearchInput/>
//       <div className="divider px-3"> </div>
//       <Conversations/>         
//       <LogOutButton/>
//     </div>
//   )
// }

// export default Sidebar
