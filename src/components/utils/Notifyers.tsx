'use client';

import { splitAtom } from 'jotai/utils';
import { PrimitiveAtom, atom, useAtom } from 'jotai';
import { motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faCancel } from '@fortawesome/free-solid-svg-icons';
import { faBomb } from '@fortawesome/free-solid-svg-icons/faBomb';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { Optional } from '@/utils/Optional';
import { id } from '@/utils/id';

export enum NotificationType {
  Success = 'Success',
  Error = 'error',
  Alert = 'alert'
}

export interface Notification {
  type: NotificationType;
  key: string;
  message: string;
  created: number;
}

export const notificationAtom = atom([] as Notification[]);
export const notifications = splitAtom(notificationAtom);

const firstNotificationAtom = atom(get => {
  const _notifications = get(notifications);
  if (_notifications.length == 0) return null;
  return get(_notifications[0]);
});

export function useDispatchNotification() {
  const [_, dispatchNotification] = useAtom(notifications);

  return useCallback(
    (notification: Optional<Notification, 'key' | 'created'>) => {
      if (!notification.key) notification.key = id();
      notification.created = Date.now();

      dispatchNotification({
        type: 'insert',
        value: notification as Notification
      });

      return notification.key;
    },
    [dispatchNotification]
  );
}

function Notifye({ notificationAtom }: { notificationAtom: PrimitiveAtom<Notification> }) {
  const typeColourMapper = new Map([
    [NotificationType.Success, ['green', faCircleCheck]],
    [NotificationType.Error, ['red', faBomb]],
    [NotificationType.Alert, ['auto', faBullhorn]]
  ]);

  const [notification] = useAtom(notificationAtom);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='alert text-white shadow-md shadow-accent border-base-content border max-w-[95vw] overflow-auto'
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
  const [fitstNotification] = useAtom(firstNotificationAtom);

  useEffect(() => {
    if (fitstNotification != null) {
      const timeoutId = setTimeout(
        () => {
          dispatchNotifications({ type: 'remove', atom: notifyes[0] });
        },
        Math.max(fitstNotification.created + 8500 - Date.now(), 0)
      );

      return () => clearTimeout(timeoutId);
    }
  }, [notifyes, fitstNotification]);

  return (
    <div className='toast toast-end'>
      {notifyes.map(notification => (
        <Notifye notificationAtom={notification} key={id()} />
      ))}
    </div>
  );
}
