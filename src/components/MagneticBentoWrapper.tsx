import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "../lib/utils";

export interface MagneticBentoWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  maxOffset?: number;
  tilt?: boolean;
  disabled?: boolean;
}

/**
 * MagneticBentoWrapper
 * Adds a subtle 'magnetic' hover effect using Framer Motion (motion/react).
 * The card smoothly responds to cursor movement, tracking mouse position with spring physics.
 */
export const MagneticBentoWrapper: React.FC<MagneticBentoWrapperProps> = ({
  children,
  className,
  strength = 0.08,
  maxOffset = 10,
  tilt = true,
  disabled = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 240, mass: 0.45 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-maxOffset, maxOffset], [tilt ? 3.5 : 0, tilt ? -3.5 : 0]);
  const rotateY = useTransform(springX, [-maxOffset, maxOffset], [tilt ? -3.5 : 0, tilt ? 3.5 : 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = Math.max(-maxOffset, Math.min(maxOffset, (e.clientX - centerX) * strength));
    const offsetY = Math.max(-maxOffset, Math.min(maxOffset, (e.clientY - centerY) * strength));
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.012 }}
      transition={{ duration: 0.2 }}
      className={cn("will-change-transform", className)}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
};

export default MagneticBentoWrapper;
