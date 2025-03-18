import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

function LogOutButton() {

  const {loading,logout}=useLogout();
  return (
    <div className="mt-auto">
     {
      !loading ?(
        <BiLogOut  className='w-8 h-6  text-white cursor-pointer mt-4 '  onClick={logout} />
      ):(
        <span className="loading loading-spinner"></span>
      )
     }
    </div>
  )
}

export default LogOutButton;
