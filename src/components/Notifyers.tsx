"use client";

import { splitAtom } from "jotai/utils";
import { PrimitiveAtom, atom, useAtom } from "jotai";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const notificationAtom = atom([
  {
    type: "success",
    key: "idk",
    message: "Something went wright!",
  },
]);
export const notifications = splitAtom(notificationAtom);

function Notifye({
  notificationAtom,
}: {
  notificationAtom: PrimitiveAtom<{
    type: string;
    key: string;
    message: string;
  }>;
}) {
  const [notification] = useAtom(notificationAtom);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`alert alert-${notification.type}`}
      key={notification.key}
    >
      <span>{notification.message}</span>
    </motion.div>
  );
}

export default function Notifyers() {
  const [notifyes, dispatchNotifications] = useAtom(notifications);

  console.log(notifyes);

  if (notifyes.length > 0)
    setTimeout(() => {
      dispatchNotifications({ type: "remove", atom: notifyes[0] });
    }, 5000);

  useEffect(() => {
    dispatchNotifications({ type: "remove", atom: notifyes[0] });
  }, []);

  return (
    <div className="toast toast-end">
      {notifyes.map((notification) => (
        <Notifye notificationAtom={notification} />
      ))}
    </div>
  );
}
