import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export function GoogleButton() {
  return (
    <button type='button' className='btn glass bg-[#CF2C1F] hover:bg-[#a62319] text-white'>
      <FontAwesomeIcon className='absolute left-3' size='lg' icon={faGoogle} />
      Google
    </button>
  );
}
