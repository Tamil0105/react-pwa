import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";
import { RiSettings3Fill } from "react-icons/ri";
import { cn } from "../../../utils/constants/cn";
import { SidebarUpContent } from "../../../Objects/main";
import { TriggerStore } from "../../../Store";

export const Sidebar = ({}) => {
  const store = TriggerStore((state) => state);

  const {setSideAction,sidebarAction} = TriggerStore((state) => state)


  // const { user } = UserStore((state) => state);

  // const EventCreation_store = EventCreationStore((state) => state);

  // const StepStore = stepStore((state) => state);



  const routeChange = () => {
  	// EventCreation_store.resetStore();
  	// StepStore.resetStore();
  	store.setSideAction(false);
  };
  return (
    <div
      className={cn(
        sidebarAction ? "w-[15rem] p-2" : "w-14 px-2",
        "h-full bg-white border-r flex  shadow-lg   flex-col lg:justify-center py-2 relative transition-all duration-500"
      )}
    >
      <div className={cn("flex flex-col  gap-8 py-2   mt-12 md:mt-0  rounded-xl lg:justify-center", !sidebarAction?"lg:border":"")}>
        {SidebarUpContent.map((list: any) => {
          const isActive =
           ( list.urlRoots as any)?.includes((location as any).pathname) ||
		   ( list.urlRoots as any)?.includes((location as any).pathname.split("/")?.[1]);

          return (
            <Link
              to={list?.url}
              key={list.url}
              className={cn(
                !sidebarAction && "group",
             
                   "bg-white hover:text-primary ",

				   sidebarAction?"hover:bg-green-50":"",
                  "flex w-full  gap-2 items-center  overflow-hidden px-2 cursor-pointer  py-2 rounded-lg text-sm"
              )}
              onClick={() => {
				store.setSideTrigger(false)

              	list.url === '/dashboard'
              		? routeChange()
              		: null;
              }}
            >
              <div className="transform transition duration-200 group-hover:scale-125">
                {isActive ? list.actionIcon : list.icon}
              </div>
              <NavLink
                className={`whitespace-nowrap pl-2 transition-all  font-mono duration-500 ${
                  !sidebarAction &&
                  " pl-0 opacity-0 translate-x-1 overflow-hidden pointer-events-none"
                }`}
                to={list?.url}
              >
                {list?.title}
              </NavLink>

              <div
                className={` absolute left-48 bg-gray-700 text-white font-sans font-semibold whitespace-pre z-50 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-4 group-hover:py-1 group-hover:left-[4rem] group-hover:duration-300 group-hover:w-fit `}
              >
                {list?.title}
              </div>
            </Link>
          );
        })}
      </div>
      {/* <div className="flex flex-col justify-center gap-1   text-sm mt-auto">
				<div
					className={cn(
						'flex gap-2 items-center hover:bg-gray-200   py-2   px-1  rounded-lg group cursor-pointer',
						!sidebarAction && 'group',
					)}
					onClick={() => {
						window.open(`${Config.RENDER_ENGINE_URL}/${user.display_name}`);
					}}
				>
					<div className={' relative pr-6  '}>
						<span className=" flex h-3 w-3 absolute top-1 transform translate-x-2.5 -translate-y-2.5">
							<span className="animate-ping absolute  h-full w-full rounded-full bg-primary opacity-75"></span>
							<span className="  rounded-full h-3	  w-3 bg-primary"></span>
						</span>
					</div>

					<span
						className={`whitespace-nowrap pl-3 transition-all duration-500 ${
							!sidebarAction &&
							' pl-0 opacity-0 translate-x-1 overflow-hidden pointer-events-none group-hover:text-white'
						}`}
					>
						View live page
					</span>
					<div
						className={cn(
							!sidebarAction ? 'visible' : 'hidden',
							'absolute left-48 bg-primary text-white font-sans font-semibold whitespace-pre z-50 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-4 group-hover:py-1 group-hover:left-[4rem] group-hover:duration-300 group-hover:w-fit ',
						)}
					>
						View live page
					</div>
				</div>
				<div
					className={cn(
						location.pathname.split('/')[1] === 'settings'
							? 'bg-primary/10 text-primary   '
							: 'bg-white hover:bg-gray-200',
						'flex gap-3 items-center  px-2.5  py-2 rounded-lg group cursor-pointer',
					)}
					onClick={() => {
						navigate('/settings/myAccount');
					}}
				>
					<div>
						<RiSettings3Fill
							className={cn(
								location.pathname.split('/')[1] === 'settings'
									? ' text-primary   '
									: 'text-gray-500',
								'h-5 w-5 ',
							)}
						/>
					</div>
					<span
						className={`whitespace-nowrap pl-2 transition-all duration-500 ${
							!sidebarAction &&
							' pl-0 opacity-0 translate-x-1 overflow-hidden pointer-events-none'
						}`}
					>
						Settings
					</span>
					<div
						className={cn(
							!sidebarAction ? 'visible' : 'hidden',
							'absolute left-48 bg-gray-700 text-white font-sans font-semibold whitespace-pre z-50 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-4 group-hover:py-1 group-hover:left-[4rem] group-hover:duration-300 group-hover:w-fit',
						)}
					>
						Settings
					</div>
				</div>

				<div
					className={
						'flex gap-3 items-center  hover:bg-gray-200 px-2.5  py-2 rounded-lg group cursor-pointer'
					}
					onClick={() => window.open('https://docs.gozen.io/gozen-cal')}
				>
					<div>
						<FiHelpCircle className="h-5 w-5  text-gray-500" />
					</div>
					<span
						className={`whitespace-nowrap pl-2 transition-all duration-500 ${
							!sidebarAction &&
							' pl-0 opacity-0 translate-x-1 overflow-hidden pointer-events-none'
						}`}
					>
						Docs
					</span>
					<div
						className={cn(
							!sidebarAction ? 'visible' : 'hidden',
							'absolute left-48 bg-gray-700 text-white font-sans font-semibold whitespace-pre z-50 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-4 group-hover:py-1 group-hover:left-[4rem] group-hover:duration-300 group-hover:w-fit',
						)}
					>
						Docs
					</div>
				</div>
				<div
					className={
						'flex gap-3 items-center hover:bg-gray-200 px-2.5  py-2 rounded-lg group cursor-pointer'
					}
				>
					
					<span
						className={`whitespace-nowrap pl-2 transition-all duration-500 ${
							!sidebarAction &&
							' pl-0 opacity-0 translate-x-1 overflow-hidden pointer-events-none'
						}`}
					>
						Help
					</span>
					<div
						className={cn(
							!sidebarAction ? 'visible' : 'hidden',
							'absolute left-48 bg-gray-700 text-white font-sans font-semibold whitespace-pre z-50 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-4 group-hover:py-1 group-hover:left-[4rem] group-hover:duration-300 group-hover:w-fit',
						)}
					>
						Help
					</div>
				</div>
			</div> */}
      <div
        className={`rounded-full absolute right-0 translate-x-1/2 bottom-16 bg-primary delay-50 duration-500 ${
          sidebarAction ? "rotate-0" : "rotate-180"
        } px-2.5 w-7 h-7 py-1 cursor-pointer md:block hidden`} // Add 'md:block hidden'
        style={{
          zIndex: "1",
        }}
        onClick={() => setSideAction(!sidebarAction)}
      >
        <MdArrowBackIos className="w-4 h-5 text-white" />
      </div>
    </div>
  );
};
