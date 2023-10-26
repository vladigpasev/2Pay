import { faBomb, faClipboardCheck, faEnvelope, faHome, faMailReply, faUser } from '@fortawesome/free-solid-svg-icons';
import { faWpexplorer } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { verifyUser } from '@/server/service/auth/verification';
import Link from 'next/link';

export default async function VerifyAccount({ params }: { params: { key: string } }) {
  const verified = await verifyUser(params.key);

  return (
    <main className='w-full h-screen flex justify-center'>
      <div className='flex gap-5 flex-row max-md:flex-col my-auto'>
        <FontAwesomeIcon icon={verified ? faClipboardCheck : faBomb} className='w-1/5 mx-auto max-md:w-1/2' />
        <div className='flex flex-col gap-5 p-5 mx-auto rounded-xl bg-base300 my-auto'>
          <hgroup>
            <h1 className='font-semibold text-3xl text-center gap-3 w-full'>
              {verified ? 'Your email has been verified successfully.' : 'Failed to verify the E-Mail'}
            </h1>
            <p className='text-center text-'>
              {verified
                ? 'Your account is now activated and you can use it as intendet.'
                : 'Something went wrong during the verification of your E-Mail. Please try requesting a new validation by the button below!'}
            </p>
          </hgroup>
          <div className='flex gap-3 flex-row max-sm:flex-col'>
            {verified ? (
              <>
                <Link href='/' className='btn flex-grow btn-primary flex w-1/2 max-sm:w-full'>
                  <FontAwesomeIcon icon={faWpexplorer} className='max-w-full h-9 -ml-2' />
                  <p className='text-center flex-grow flex text-xl max-sm:text-lg'>
                    <span className='mx-auto'>Explore</span>
                  </p>
                </Link>
                <Link href='/user/profile' className='btn flex-grow w-1/2 max-sm:w-full btn-secondary flex'>
                  <p className='text-center flex-grow flex text-xl max-sm:text-lg'>
                    <span className='mx-auto'>Profile Settings</span>
                  </p>
                  <FontAwesomeIcon icon={faUser} className='max-w-full h-9 -ml-2' />
                </Link>
              </>
            ) : (
              <>
                <Link href='/' className='btn flex-grow btn-primary flex w-1/2 max-sm:w-full'>
                  <FontAwesomeIcon icon={faHome} className='max-w-full h-9 -ml-2' />
                  <p className='text-center flex-grow flex text-xl max-sm:text-lg'>
                    <span className='mx-auto'>Back To Home</span>
                  </p>
                </Link>
                <Link href='/auth/verify/sent' className='btn flex-grow w-1/2 max-sm:w-full btn-secondary flex'>
                  <p className='text-center flex-grow flex text-xl max-sm:text-lg'>
                    <span className='mx-auto'>Resend Varification</span>
                  </p>
                  <FontAwesomeIcon icon={faEnvelope} className='max-w-full h-9 -ml-2' />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
