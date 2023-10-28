'use client';

import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

export const modalAtom = atom({
  opened: false,
  canClose: true,
  onClose: () => {},
  content: <></>
});

export function useCloseModal() {
  const [modal, setModal] = useAtom(modalAtom);

  return useCallback(
    (invokeOnClose: boolean = true) => {
      setModal({ ...modal, opened: false });
      if (invokeOnClose) modal.onClose();
    },
    [modal, setModal]
  );
}

export function useOpenModal() {
  const [modal, setModal] = useAtom(modalAtom);

  return useCallback(
    (content: JSX.Element, onClose: () => void, canClose: boolean = true) =>
      setModal({
        opened: true,
        content,
        onClose,
        canClose
      }),
    [modal, setModal]
  );
}

export default function modalDialog() {
  const [modal] = useAtom(modalAtom);
  const closeModal = useCloseModal();

  return (
    <>
      <dialog
        onClick={() => modal.opened && modal.canClose && closeModal()}
        open={modal.opened}
        className='modal fixed flex modal-bottom sm:modal-middle w-[100vw] backdrop-blur-sm backdrop-contrast-50'
      >
        <div className='modal-box left-1/2 relative -translate-x-1/2 p-3' onClick={e => e.stopPropagation()}>
          {modal.content}
        </div>
      </dialog>
    </>
  );
}
