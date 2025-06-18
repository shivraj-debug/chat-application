import PropTypes from 'prop-types';
import { FaComment, FaPhone, FaCog } from 'react-icons/fa';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { LuArchiveRestore } from 'react-icons/lu';
import { SiChatbot } from 'react-icons/si';
import SidebarIcon from './SidebarIcon';
import { useSocketContext } from '../../context/useSocketContext';


const SidebarSymbol = () => {

  const { activePage, setActivePage } = useSocketContext();

  const notifications = {
    messages: 2,
    items: 1,
  };

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div className="flex flex-col justify-between bg-gray-800 text-white w-20 h-full p-4">
        <div className="flex flex-col gap-4 mt-4">
          <SidebarIcon
            Icon={FaComment}
            badge={notifications.messages}
            active={activePage === 'messenger'}
            onClick={() => setActivePage('messenger')}
            title="Messages"
          />
          <SidebarIcon
            Icon={FaPhone}
            active={activePage === 'call'}
            onClick={() => setActivePage('call')}
            title="Call"
          />
          <SidebarIcon
            Icon={LuArchiveRestore}
            active={activePage === 'archive'}
            onClick={() => setActivePage('archive')}
            title="Archive"
          />
          <SidebarIcon
            Icon={HiOutlineStatusOnline}
            badge={notifications.items}
            active={activePage === 'status'}
            onClick={() => setActivePage('status')}
            title="Status"
          />
          <SidebarIcon
            Icon={SiChatbot}
            active={activePage === 'chatbot'}
            onClick={() => setActivePage('chatbot')}
            title="Chatbot"
          />
        </div>

        <SidebarIcon
          Icon={FaCog}
          active={activePage === 'settings'}
          onClick={() => setActivePage('settings')}
          title="Settings"
        />
      </div>

      {/* Main Content Area */}
    </div>
  );
};

export default SidebarSymbol;


SidebarSymbol.propTypes = {
  activePage: PropTypes.string,
  setActivePage: PropTypes.func,
};