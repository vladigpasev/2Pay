import React from 'react';

const StripePaymentErrorPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Payment Error</h1>
      <p className="text-lg mb-4">There was an error processing your payment. Please try again later.</p>
      {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out">Try Again</button> */}
    </div>
  );
};

export default StripePaymentErrorPage;