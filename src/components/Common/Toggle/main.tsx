import React, { useState } from 'react';

interface TapProps {
  tabs: string[];
}

const Tap: React.FC<TapProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="tap-component flex space-x-4 h-full p-1 bg-slate-400">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab px-4 py-2 rounded-lg  h-10 w-20 focus:outline-none transition duration-300 ease-in-out transform ${
            activeTab === tab
              ? 'bg-blue-500 text-white scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white'
          }`}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tap;
