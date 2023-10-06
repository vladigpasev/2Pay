"use client";

import { motion } from "framer-motion";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
