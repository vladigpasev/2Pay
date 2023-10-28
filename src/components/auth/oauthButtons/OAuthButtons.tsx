import { FacebookButton } from './FacebookButton';
import { GoogleButton } from './GoogleButton';

export function OAuthButtons() {
  return (
    <>
      <div className='divider'>OR</div>
      <GoogleButton />
      {/* <FacebookButton /> */}
    </>
  );
}

