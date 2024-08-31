import React, { useEffect, useState } from 'react'
import Dashboard from "../components/Dashbord/main"
const DashboardPage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);
  return (
    <div className={`flex justify-center p-1 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <Dashboard/>
    </div>
  )
}

export default DashboardPage
