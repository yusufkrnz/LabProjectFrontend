// Dock.tsx
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';

export type DockItemData = {
  icon: React.ReactNode;
  label: string | React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  distance?: number;
  dockHeight?: number;
  spring?: any;
  className?: string;
};

const Dock: React.FC<DockProps> = ({
  items,
  panelHeight = 68,
  baseItemSize = 50,
  magnification = 70,
  distance = 200,
  dockHeight = 256,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  className = ''
}) => {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = Math.max(dockHeight, magnification + magnification / 2 + 4);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height }} className={`dock-outer ${className}`}>
      <motion.div
        className="dock-panel"
        onMouseMove={({ pageX }) => { isHovered.set(1); mouseX.set(pageX); }}
        onMouseLeave={() => { isHovered.set(0); mouseX.set(Infinity); }}
        style={{ height: panelHeight }}
      >
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            className="dock-item"
            onClick={item.onClick}
          >
            <div className="dock-icon">{item.icon}</div>
            <AnimatePresence>
              <motion.div
                className="dock-label"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Dock;
