import { useUser } from '@/hooks/useUser';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UploadButton } from './utils/Uoloader';
import { NotificationType, useDispatchNotification } from './utils/Notifyers';
import { useAuthenticatedMutation } from '@/hooks/useAuthenticatedMutation';
import { trpc } from '@/trpc/client';
import { useSetTokens } from '@/auth/token';
import { UploadFileResponse } from 'uploadthing/client';

export default function UserProfilePictureUploader() {
  const user = useUser();

  const dispatchNotification = useDispatchNotification();
  const [_, refreshTokenAsyncMutation] = useAuthenticatedMutation(trpc.user.updateToken);
  const setTokens = useSetTokens();

  return (
    <div className='flex flex-col'>
      <img
        src={user!.profilePictureURL || '/images/pngs/user-profile.png'}
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
          setTokens(await refreshTokenAsyncMutation());
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
  );
}
