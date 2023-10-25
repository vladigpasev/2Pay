'use client';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { atom, useAtom } from 'jotai';

export const alertAtom = atom({
  opened: false,
  content: <></>
});

export default function AlertDialog() {
  const [alert, setAlert] = useAtom(alertAtom);

  return (
    <>
      <dialog
        open={alert.opened}
        id='my_modal_5'
        className='modal fixed flex text-neutral-content modal-bottom sm:modal-middle w-[99vw] backdrop-blur-sm backdrop-contrast-50'
      >
        <div className='modal-box left-1/2 relative -translate-x-1/2 p-3 pt-0'>
          <form onSubmit={() => setAlert({ opened: false, content: alert.content })} className='modal-action'>
            {alert.content}
          </form>
          <button
            className='btn top-0 right-0 absolute rounded-tl-none rounded-br-none rounded-bl-xl'
            type='button'
            onClick={() => setAlert({ opened: false, content: alert.content })}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </dialog>
    </>
  );
}
