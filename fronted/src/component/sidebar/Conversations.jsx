
import Conversation from "./Conversation.jsx";
import useGetConversation from "../../hooks/useGetConversation.js";
import propTypes from "prop-types";

function Conversations({ searchResults }) {
    const { loading, conversations } = useGetConversation();

    return (
        <div className="py-2 flex flex-col overflow-auto relative">
            {/* Search results */}
            {searchResults.length > 0 && (
                <div className="absolute top-0 left-0 right-0 bg-white z-10 p-4">
                    <h3 className="text-gray-700 font-bold mb-2">Search Results</h3>
                    {searchResults.map((conversation, idx) => (
                        <Conversation
                            key={conversation._id}
                            conversation={conversation}
                            lastIdx={idx === searchResults.length - 1}
                        />
                    ))}
                    {/* <div className="divider"></div> */}
                </div>
            )}

            {/* Original conversations with blur */}
            <div
                className={`transition-all duration-300 ${
                    searchResults.length > 0 ? "filter blur-md pointer-events-none opacity-50" : ""
                } `}
            >
                {conversations.map((conversation, idx) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        lastIdx={idx === conversations.length - 1}
                    />
                ))}
            </div>

            {/* Loading spinner */}
            {loading && <span className="loading loading-spinner mx-auto"></span>}
        </div>
    );
}

Conversations.propTypes = {
    searchResults: propTypes.array.isRequired,
};

export default Conversations;







// import Conversation from "./Conversation.jsx";
// import useGetConversation from "../../hooks/useGetConversation.js";
// import propTypes from "prop-types";

// function Conversations({ searchResults }) {
//     const { loading, conversations } = useGetConversation();

//     return (
//         <div className="py-2 flex flex-col overflow-auto">
//             {/* Display searched users */}
//             {searchResults.length > 0 && (
//                 <div>
//                     <h3 className="text-gray-500 font-bold mb-2">Search Results</h3>
//                     {searchResults.map((conversation, idx) => (
//                         <Conversation
//                             key={conversation._id}
//                             conversation={conversation}
//                             lastIdx={idx === searchResults.length - 1}
//                         />
//                     ))}
//                     <div className="divider"></div>
//                 </div>
//             )}

//             {/* Display original conversations with conditional blur */}
//             <div
//                 className={`transition-all duration-300 ${
//                     searchResults.length > 0 ? "blur-sm opacity-50 pointer-events-none" : ""
//                 }`}
//             >
//                 {conversations.map((conversation, idx) => (
//                     <Conversation
//                         key={conversation._id}
//                         conversation={conversation}
//                         lastIdx={idx === conversations.length - 1}
//                     />
//                 ))}
//             </div>

//             {loading && <span className="loading loading-spinner mx-auto"></span>}
//         </div>
//     );
// }

// Conversations.propTypes = {
//     searchResults: propTypes.array.isRequired,
// };

// export default Conversations;







// import Conversation from "./Conversation.jsx";
// import useGetConversation from "../../hooks/useGetConversation.js";
// // import getRandomEmoji from "../../utils/emoji.js";


// function Conversations() {
//     const {loading,conversations}=useGetConversation();

//   return(
//     <div className="py-2 flex flex-col overflow-auto">

//         {conversations.map((conversation,idx) => (
//             <Conversation key={conversation._id} 
//                           conversation={conversation}
//                           // emoji={getRandomEmoji()}
//                           lastIdx={idx===conversations.length-1}
//             />
//         )) }

//         {loading ? <span className="loading loading-spinner mx-auto"></span> : null}

//     </div>
//   )
// }

// export default Conversations;
