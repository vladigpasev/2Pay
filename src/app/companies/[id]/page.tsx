import Products from '@/components/Products';
import React from 'react';

function CompanyInfo() {
  // Dummy data for the company
  const companyData = {
    logo: 'https://placekitten.com/200/200',
    title: 'Company A',
    email: 'contactA@example.com',
    description:
      'Company A specializes in advanced tech solutions. With over a decade in the industry, we strive to innovate and lead.Company A specializes in advanced tech solutions. With over a decade in the industry, we strive to innovate and lead.'
  };

  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-[#00a54d20] to-secondary'>
      <div className='w-full md:w-1/2 p-8 flex flex-col items-center justify-center border-r-2 md:border-b-0 border-[#00a54d56]'>
        <div className='text-center'>
          <img
            src={companyData.logo}
            alt='Company Logo'
            className='w-40 h-40 md:w-52 md:h-52 rounded-full mx-auto border-4 border-[#00a54d56] shadow-xl'
          />
          <h1 className='mt-6 text-3xl md:text-4xl font-bold text-primary'>{companyData.title}</h1>
          <a
            href={`mailto:${companyData.email}`}
            className='text-md md:text-lg text-primary hover:text-accent hover:underline mt-2 block'
          >
            {companyData.email}
          </a>
          <p className='mt-4 text-md md:text-lg text-description max-w-2xl mx-auto'>{companyData.description}</p>
        </div>
      </div>
      <div className='w-full md:w-1/2 p-8'>
        <Products />
      </div>
    </div>
  );
}

export default CompanyInfo;
