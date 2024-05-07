import React from "react";
import { motion, Transition, Variants } from "framer-motion";

const dashTransition: Transition = {
  repeat: Infinity,
  ease: "easeInOut",
  duration: 1.5,
};

const rotationTransition: Transition = {
  repeat: Infinity,
  ease: "linear",
  duration: 4,
};

const strokeDashArrayVariants: Variants = {
  animate: {
    strokeDasharray: ["1, 200", "89, 200", "89, 200"],
    strokeDashoffset: [0, -35, -124],
  },
};

export const Spinner: React.FC = () => {
  return (
    <motion.div
      className="relative w-5 h-5"
      animate={{ rotate: 360 }}
      transition={rotationTransition}
    >
      <svg className="circular" viewBox="25 25 50 50">
        <motion.circle
          className="path stroke-background"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="7"
          strokeMiterlimit="10"
          strokeDasharray="1, 200"
          strokeDashoffset="0"
          variants={strokeDashArrayVariants}
          animate="animate"
          transition={{
            strokeDasharray: dashTransition,
            strokeDashoffset: dashTransition,
          }}
        />
      </svg>
    </motion.div>
  );
};
