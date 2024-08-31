import React, { useState, Fragment, Suspense } from 'react';
import { Sidebar } from '../Navigation/Sidebar/sidebar';
import { Header } from '../Navigation/Header/main';
import { Outlet } from 'react-router-dom';
import { LoadingSpinner } from '../Common/Spinner/loadingSpinner';
import { TriggerStore } from '../../Store';

const Layout = () => {
	const {setSideTrigger,sidebartrigger} =  TriggerStore((state) => state)

	const toggleSidebar = () => {
		setSideTrigger(!sidebartrigger);
	};


	return (
		<Fragment>
			<Header />
			<div className="flex w-full h-full overflow-hidden transition-all duration-700">
				{/* Sidebar */}
				<div
					className={`fixed inset-0 z-40 md:relative md:z-auto md:translate-x-0 transition-transform duration-300 ease-in-out ${
						sidebartrigger ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<Sidebar />
				</div>

				{/* Content Area */}
				<div className="w-full h-full bg-[#f9fafb] overflow-auto transition-all duration-700">
					<Suspense fallback={<LoadingSpinner />}>
						<Outlet />
					</Suspense>
				</div>
			</div>

			{/* Sidebar Toggle Button for Mobile */}
		
		</Fragment>
	);
};

export default Layout;
