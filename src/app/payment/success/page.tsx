import React from 'react';

const StripePaymentSuccessPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Payment Successful</h1>
      <p className="text-lg mb-4">Thank you for your payment. Your transaction has been completed successfully.</p>
      <a href="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out">Continue Shopping</a>
    </div>
  );
};

export default StripePaymentSuccessPage;