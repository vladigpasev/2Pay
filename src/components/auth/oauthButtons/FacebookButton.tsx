import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

export function FacebookButton() {
  return (
    <button type='button' className='btn bg-blue-600 hover:bg-blue-500 glass mt-2 text-white'>
      <FontAwesomeIcon className='absolute left-3' size='lg' icon={faFacebook} />
      Facebook
    </button>
  );
}
