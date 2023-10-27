import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function CompaniesProfile() {
  const companies: any[] = [];
  return (
    <section className='flex flex-grow w-full text-start flex-col my-auto rounded-xl border border-neutral mx-auto bg-neutral py-10 gap-10 px-8 min-w-[450px] max-md:min-w-min max-sm:w-full max-sm:min-h-screen max-sm:rounded-none max-sm:py-16'>
      <h1 className='text-3xl font-bold'>
        <u>Your companies: </u>
      </h1>
      {companies.length > 0 ? (
        companies.map(companie =>
          companies.map((company, index) => (
            <div
              key={index}
              className='bg-[#00b65e0d] p-2 rounded-xl transition-transform transform hover:scale-105 cursor-pointer'
            >
              <div className='flex items-start'>
                <img
                  src={company.logo}
                  alt={company.title}
                  className='w-12 h-12 rounded-full object-cover mr-2 border-2 border-indigo-200'
                />
                <div className='flex-1 min-w-0'>
                  <h2 className='text-md font-semibold text-base-content truncate'>{company.title}</h2>
                  <p className='text-xs text-gray-500 mt-0.5 line-clamp-3 overflow-hidden'>{company.description}</p>
                  <a
                    href={`mailto:${company.email}`}
                    className='text-[#00b65eb4] text-xs hover:underline mt-0.5 block truncate overflow-hidden'
                  >
                    {company.email}
                  </a>
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <div className='flex w-full h-full'>
          <div className='flex mx-auto my-auto flex-col p-10 gap-3'>
            <h3 className='text-xl font-semibold'>
              You are not connected to any <strong>Companies</strong>!
            </h3>
            <Link href='/companies/create' className='flex gap-10 btn btn-primary rounded-lg w-fit mx-auto pr-10'>
              <FontAwesomeIcon icon={faPlusCircle} size='2x' className='-ml-2 my-auto' />
              <span className='flex-grow font-bold my-auto'>Create Company</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
