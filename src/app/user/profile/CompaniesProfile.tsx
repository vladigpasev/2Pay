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
        companies.map(companie => <></>)
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
