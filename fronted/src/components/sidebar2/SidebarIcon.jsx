import PropTypes from 'prop-types';


const SidebarIcon = ({ Icon, badge, active, onClick, title }) => {
  return(
    <div
    onClick={onClick}
    className={`relative cursor-pointer p-2 rounded-xl transition-all duration-200 ease-in-out ${
      active ? 'bg-blue-600' : 'hover:bg-gray-700'
    }`}
    title={title}
  >
    <Icon className="text-3xl" />
    {badge > 0 && (
      <span className="absolute top-0 right-0 bg-green-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
        {badge}
      </span>
    )}
  </div>
  )
}

export default SidebarIcon;

SidebarIcon.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  badge: PropTypes.number,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string
};