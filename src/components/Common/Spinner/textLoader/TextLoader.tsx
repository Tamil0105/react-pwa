import React from 'react';
import './TextLoader.css';

const TextLoader = () => {
	return (
		<div className=" flex flex-col gap-4 h-screen justify-center items-center">
			<div className="text-gray-600  gap-2 font-medium text-2xl box-content h-10 ml-32 flex rounded-lg ">
				<p className="font-bold">GoZen</p>
				<div className="overflow-hidden ">
					<span className="word">Meetings</span>
					<span className="word">Availabilities</span>
					<span className="word">Scheduled Meetings</span>
					<span className="word">Calendars</span>
					<span className="word">Time Slots</span>
				</div>
			</div>
		</div>
	);
};

export default TextLoader;
