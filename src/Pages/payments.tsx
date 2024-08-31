import React, { useEffect, useState } from 'react'
import PaymentCard from '../components/Payments/main'

const PaymentsPage = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);
  return (
    <div className={`flex justify-center p-1 transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <PaymentCard/>
    </div>
  )
}

export default PaymentsPage
