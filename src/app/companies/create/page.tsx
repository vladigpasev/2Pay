'use client';

import { useSetTokens } from '@/auth/token';
import { NotificationType, useDispatchNotification } from '@/components/utils/Notifyers';
import { UploadButton } from '@/components/utils/Uoloader';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CreateCompany() {
  const dispatchNotification = useDispatchNotification();

  return (
    <div className='h-[calc(100vh-90px)] w-full flex justify-center items-center'>
      <div className='sm:shadow-xl px-12 py-12 sm:bg-base-200 rounded-xl'>
        <h1 className='font-semibold text-3xl text-start'>
          Create a <strong>Company</strong>
        </h1>
        <div className='flex gap-5'>
          <div className='flex flex-col'>
            <img
              src={'/images/pngs/user-profile.png'}
              alt='user proifle'
              className='mx-auto rounded-md w-full max-w-[350px] aspect-square bg-cover'
            />
            <UploadButton
              endpoint='profilePicture'
              className='mt-2'
              onClientUploadComplete={async res => {
                // Do something with the response
                console.log('Files: ', res);
                alert('Upload Completed');
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                dispatchNotification({
                  type: NotificationType.Error,
                  message: error.message || 'Upload Failed'
                });
              }}
              content={{
                button: (
                  <a className='flex mx-auto link cursor-pointer font-semibold gap-2'>
                    Change Photo <FontAwesomeIcon icon={faCamera} className='my-auto' />
                  </a>
                )
              }}
              appearance={{
                button: {
                  width: '100%',
                  maxWidth: '350px'
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
