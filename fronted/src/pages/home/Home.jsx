// import React from 'react'

import MessageContainer from "../../component/messages/MessageContainer"
import Sidebar from "../../component/sidebar/Sidebar"
import SidebarSymbol from "../../component/sidebar2/SidebarSymbol"

function Home() {
  return (
    <div className="flex flex-row md:w-full sm:h-[450px] md:h-[750px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
      <SidebarSymbol/>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
};

export default Home
