import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarSymbol from "../../components/sidebar2/SidebarSymbol";
import { useSocketContext } from "../../context/useSocketContext";
import Setting from "../Setting";

function Home() {
  const { activePage } = useSocketContext(); // Comes from context

  const renderContent = () => {
    switch (activePage) {
      case "messenger":
        return (
          <>
            <Sidebar />
            <MessageContainer />
          </>
        );
      case "call":
        return <div className="flex-1 p-4 text-white text-xl font-bold">📞 Calls Page</div>;
      case "archive":
        return <div className="flex-1 p-4 text-white text-xl font-bold">🗂️ Archived Chats</div>;
      case "status":
        return <div className="flex-1 p-4 text-white text-xl font-bold">🟢 Status Page</div>;
      case "chatbot":
        return <div className="flex-1 p-4 text-white text-xl font-bold">🤖 Chatbot Page</div>;
      case "settings":
        return (
          <Setting/>
        );
      default:
        return <div className="flex-1 p-4 text-white text-xl font-bold">Welcome</div>;
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-r from-gray-900 to-purple-950 backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="flex w-full h-full">
        <SidebarSymbol/>
        {renderContent()}
      </div>
    </div>
  );
}

export default Home;
