"use client"
import React from 'react';
import { useStripeConnect } from '@/hooks/useStripeConnect';

function StripeConnectTest() {
  const { handleOnboarding } = useStripeConnect();

  return (
    <button onClick={handleOnboarding}>Start Onboarding</button>
  );
}

export default StripeConnectTest;