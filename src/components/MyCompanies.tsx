import React from 'react';

function MyCompanies() {
    const companies = [
        {
            logo: 'https://placekitten.com/100/100',
            title: 'Company A',
            email: 'contactA@example.com',
            description: 'Company A specializes in advanced tech solutions. With over a decade in the industry, we strive to innovate and lead.',
        },
        {
            logo: 'https://placekitten.com/101/101',
            title: 'Company B',
            email: 'contactB@example.com',
            description: 'Company B has a passion for creating eco-friendly products. Sustainability and green tech are at our core.',
        },
        {
            logo: 'https://placekitten.com/102/102',
            title: 'Company C',
            email: 'contactC@example.com',
            description: 'Company C focuses on healthcare innovations. Our products have been recognized globally for improving patient care.',
        },
        {
            logo: 'https://placekitten.com/103/103',
            title: 'Company D',
            email: 'contactD@example.com',
            description: 'Company D is all about AI and ML. Harnessing the power of data, we drive business transformations.',
        },
    ];
    

    return (
        <div className="relative">
            {/* The dropdown box */}
            <div className="absolute top-full left-0 mt-3 max-w-[600px] p-4 rounded-lg bg-base-200 shadow-xl transform transition-transform origin-top">
                <h2 className='pb-2'>My Companies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {companies.map((company, index) => (
                        <div key={index} className="bg-[#00b65e0d] p-2 rounded-xl transition-transform transform hover:scale-105 cursor-pointer">
                            <div className="flex items-start">
                                <img src={company.logo} alt={company.title} className="w-12 h-12 rounded-full object-cover mr-2 border-2 border-indigo-200" />
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-md font-semibold text-base-content truncate">{company.title}</h2>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-3 overflow-hidden">{company.description}</p>
                                    <a href={`mailto:${company.email}`} className="text-[#00b65eb4] text-xs hover:underline mt-0.5 block truncate overflow-hidden">{company.email}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="bg-[#00b65e0d] p-2 rounded-xl transition-transform transform hover:scale-105 cursor-pointer flex items-center justify-center">
                        <span className="text-2xl font-bold mr-2">+</span>
                        <span>New Company</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default MyCompanies;
