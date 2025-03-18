import  { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const App = () => {
  const [activePage, setActivePage] = useState("messenger");

  const renderPage = () => {
    switch (activePage) {
      case "messenger":
        return <Messenger />;
      case "call":
        return <CallPage />;
      default:
        return <Messenger />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Sidebar */}
      <div className="flex h-full">
        <div className="w-1/5 bg-gray-800 p-4 text-white">
          <ul>
            <li
              className="cursor-pointer hover:text-blue-500"
              onClick={() => setActivePage("messenger")}
            >
              Messenger
            </li>
            <li
              className="cursor-pointer hover:text-blue-500 mt-4"
              onClick={() => setActivePage("call")}
            >
              Call
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-4/5 bg-purple-200 p-4">
          <Card>
            <CardContent>{renderPage()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;