import { useState, useEffect } from 'react';
import UsersCard from '../components/Users/main'

const UsersPage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);
  return (
    <div className={`flex justify-center p-1 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <UsersCard/>
    </div>
  )
}

export default UsersPage
