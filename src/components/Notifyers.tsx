'use client';

import { splitAtom } from 'jotai/utils';
import { PrimitiveAtom, atom, useAtom } from 'jotai';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faCancel } from '@fortawesome/free-solid-svg-icons';
import { faBomb } from '@fortawesome/free-solid-svg-icons/faBomb';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';

export const notificationAtom = atom([
  {
    type: 'success',
    key: 'idk',
    message: 'Something went wright!'
  }
]);
export const notifications = splitAtom(notificationAtom);

function Notifye({
  notificationAtom
}: {
  notificationAtom: PrimitiveAtom<{
    type: string;
    key: string;
    message: string;
  }>;
}) {
  const typeColourMapper = new Map([
    ['success', ['green', faCircleCheck]],
    ['error', ['red', faBomb]],
    ['alert', ['auto', faBullhorn]]
  ]);

  const [notification] = useAtom(notificationAtom);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='alert text-white shadow-md shadow-accent border-base-content border'
      style={{
        backgroundColor: typeColourMapper.has(notification.type)
          ? (typeColourMapper.get(notification.type)![0] as string)
          : 'auto'
      }}
      key={notification.key}
    >
      <span>
        <FontAwesomeIcon
          icon={
            typeColourMapper.has(notification.type)
              ? (typeColourMapper.get(notification.type)![1] as IconDefinition)
              : faBullhorn
          }
          className='pr-1.5 mr-2.5 border-r-2 border-r-white'
        />
        {notification.message}
      </span>
    </motion.div>
  );
}

export default function Notifyers() {
  const [notifyes, dispatchNotifications] = useAtom(notifications);

  if (notifyes.length > 0)
    setTimeout(() => {
      dispatchNotifications({ type: 'remove', atom: notifyes[0] });
    }, 8500);

  useEffect(() => {
    dispatchNotifications({ type: 'remove', atom: notifyes[0] });
  }, []);

  return (
    <div className='toast toast-end'>
      {notifyes.map(notification => (
        <Notifye notificationAtom={notification} />
      ))}
    </div>
  );
}
