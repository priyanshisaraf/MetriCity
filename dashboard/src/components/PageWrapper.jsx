// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
