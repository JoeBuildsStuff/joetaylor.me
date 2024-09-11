"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CarouselProps {
  items: string[];
}

export const InfiniteCarousel: React.FC<CarouselProps> = ({ items }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <motion.div ref={carousel} className="cursor-grab overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ right: -width, left: 0 }}
        className="flex"
        animate={{ x: [0, -width] }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
      >
        {items.concat(items).map((item, index) => (
          <motion.div
            key={index}
            className="min-w-max px-4 py-4 border border-border rounded-lg m-4 text-sm"
          >
            {item}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
