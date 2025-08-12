import { AnimatePresence, motion } from "framer-motion";

const AnnimationWrapper = ({  children, keyValue, initial = { opacity: 0 }, 
  animate = { opacity: 1 }, 
  transition = { duration: 1 }, className }) => {
  return (
    <AnimatePresence>
        <motion.div
      key={keyValue} // Use a valid key or remove if unnecessary
      initial={initial}
      animate={animate}
      transition={transition} // Corrected typo
      className={className}
    >
      {children}
    </motion.div>
    </AnimatePresence>
  );
};

export default AnnimationWrapper;
