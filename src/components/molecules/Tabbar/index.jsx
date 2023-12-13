import React, { useState } from "react";

export const TabBar = ({ tabs, onChange, handleActionType }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    onChange(tabIndex);
    if (handleActionType) {
      handleActionType();
    }
  };

  return (
    <div className="tab-bar flex gap-3 overflow-y-auto ">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`bg-gray-800 text-white px-3 w-40 flex justify-center items-center cursor-pointer rounded-md${
            index === activeTab ? " bg-red-900 w-40" : ""
          }`}
          onClick={() => {
            handleTabChange(index);
          }}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};
