import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Dock.css';

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    if (val === Infinity || !val) return distance + 1;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return distance + 1;
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, { ...spring, restDelta: 0.5 });

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        minWidth: baseItemSize,
        minHeight: baseItemSize,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      role="button"
    >
      {Children.map(children, child => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, className = '', ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items = [],
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50
}) {
  const mouseX = useMotionValue(Infinity);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const dockContent = (
    <div 
      className="dock-outer" 
      style={{ 
        position: 'fixed', 
        bottom: '1rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 9999, 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        pointerEvents: 'none'
      }}
    >
      <div 
        className={`dock-panel ${className}`} 
        style={{ 
          minHeight: `${panelHeight}px`, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          padding: '0.75rem 1rem', 
          backgroundColor: 'rgba(6, 0, 16, 0.95)', 
          borderRadius: '1rem', 
          border: '1px solid rgba(34, 34, 34, 0.8)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          pointerEvents: 'all'
        }}
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <DockItem
              key={index}
              onClick={item.onClick}
              className={item.className || ''}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          ))
        ) : null}
      </div>
    </div>
  );

  if (!mounted) return null;

  return createPortal(dockContent, document.body);
}
