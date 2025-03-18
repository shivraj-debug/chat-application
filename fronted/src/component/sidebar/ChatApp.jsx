
import Conversations from './Conversations';
import SearchInput from './SearchInput';
import Chat from './Chat';
import useConversation from '../../zustand/useConversation';

const ChatApp = () => {
    const { selectedConversation } = useConversation();

    return (
        <div className="chat-app">
            <SearchInput />
            <Conversations />
            {selectedConversation && (
                <div className="selected-chat">
                    <Chat selectedConversation={selectedConversation} />
                </div>
            )}
        </div>
    );
};

export default ChatApp;
