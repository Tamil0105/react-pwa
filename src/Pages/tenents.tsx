import React, { useEffect, useState } from 'react'
import PropertiesCard from '../components/Properties/main'
import TenantsCard from '../components/Tenents/main'

const TenentsPage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);
  return (
    <div className={`flex justify-center p-1 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <TenantsCard/>
    </div>
  )
}

export default TenentsPage
