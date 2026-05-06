import type { Variants, Transition } from "framer-motion";

export const springConfig: Transition = { 
  type: "spring", 
  stiffness: 100, 
  damping: 20 
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: springConfig },
};

export const interactiveItem: Variants = {
  rest: { scale: 1, boxShadow: "0 10px 30px -10px rgba(42,75,70,0.15)" },
  hover: { scale: 1.05, boxShadow: "0 20px 40px -10px rgba(42,75,70,0.25)", transition: springConfig },
  tap: { scale: 0.97, boxShadow: "0 5px 15px -10px rgba(42,75,70,0.1)", transition: springConfig },
};