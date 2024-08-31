import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import { TriggerStore } from "../../../Store";

interface Notification {
  id: number;
  message: string;
}

export const Header = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState<boolean>(false); // State for profile drawer
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { setSideTrigger, setSideAction, sidebartrigger } = TriggerStore(
    (state) => state
  );
  const navigate = useNavigate();
  const location = useLocation();

  const routeChange = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setSideTrigger(!sidebartrigger);
    setSideAction(true);
  };

  const isLoginPage = location.pathname === "/login";

  const handleNotificationClick = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      setNotifications([]);
    }
  };

  const toggleProfileDrawer = () => {
    setShowProfileDrawer(!showProfileDrawer);
  };

  useEffect(() => {
    const fetchNotifications = () => {
      setNotifications([
        { id: 1, message: "New message from John" },
        { id: 2, message: "Your booking is confirmed" },
      ]);
    };

    fetchNotifications();
  }, []);

  return (
    <div
      className={`flex w-full bg-white justify-between items-center md:h-[8vh] z-50 xl:h-[8vh] shadow-md`}
    >
      {!isLoginPage && (
        <div className="md:hidden hover:bg-slate-100 hover:rounded-full">
          <button onClick={toggleSidebar} className="p-2 text-primary">
            <MdOutlineMenu className="h-8 w-8" />
          </button>
        </div>
      )}

      <button className="text-dark lg:text-primary text-lg text-start px-2 md:text-dark font-bold capitalize w-full">
        Selvam Rental Management
      </button>

      {!isLoginPage && (
        <div className={`flex items-center text-sm w-full`}>
          <div className="flex items-center ml-auto">
            <div className="relative">
              <div className="flex gap-3 items-center pl-2 text-gray-800 cursor-pointer">
                <div onClick={handleNotificationClick} className="relative">
                  <BsBellFill className="h-5 w-5" />
                  {notifications.length > 0 && !showDropdown && (
                    <span className="absolute top-[-8px] right-[-8px] h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </div>

                <img
                  onClick={toggleProfileDrawer}
                  className="flex-shrink-0 object-cover object-center w-10 h-10 border rounded-full cursor-pointer"
                  src={`https://via.placeholder.com/100x100.png?text=T`}
                  alt="T"
                />
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-2 border-b last:border-b-0"
                      >
                        {notification.message}
                      </div>
                    ))
                  ) : (
                    <div className="p-2">No notifications</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Profile Drawer */}
      {showProfileDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="w-64 bg-white h-full shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-bold">Profile</span>
              <button onClick={toggleProfileDrawer}>
                <AiOutlineClose className="h-6 w-6 text-gray-800" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold">Tamilselvan</p>
              <ul className="mt-4">
                <li className="py-2 cursor-pointer hover:bg-gray-100">
                  Profile
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray-100">
                  Settings
                </li>
                <li className="py-2 cursor-pointer hover:bg-gray-100">
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
