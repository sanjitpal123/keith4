import { useEffect, useState, useRef } from 'react';

function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });
  const cursorVisibleRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      // Speed factor (lower = smoother)
      const smoothFactor = 0.15;

      // Calculate the distance to move
      const dx = cursorRef.current.x - cursorVisibleRef.current.x;
      const dy = cursorRef.current.y - cursorVisibleRef.current.y;

      // Update the visible cursor position
      cursorVisibleRef.current.x += dx * smoothFactor;
      cursorVisibleRef.current.y += dy * smoothFactor;

      // Update cursor elements
      const elements = document.querySelectorAll('.custom-cursor');
      elements.forEach(element => {
        element.style.transform = `translate(${cursorVisibleRef.current.x}px, ${cursorVisibleRef.current.y}px)`;
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const updatePosition = (e) => {
      cursorRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener('mousemove', updatePosition);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.body.style.cursor = 'auto';
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer ring cursor */}
      <div
        className={`custom-cursor fixed top-0 left-0 pointer-events-none rounded-full z-[99998] mix-blend-difference transition-all duration-300 ease-out ${
          isHovering ? 'w-[60px] h-[60px]' : 'w-[40px] h-[40px]'
        }`}
        style={{
          margin: '-20px 0 0 -20px',
          background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.15), rgba(30, 58, 138, 0.15))',
          border: '2px solid transparent',
          backgroundImage: 'linear-gradient(45deg, rgb(249, 115, 22), rgb(30, 58, 138))',
          backgroundOrigin: 'border-box',
          WebkitBackgroundClip: 'padding-box, border-box',
          animation: isHovering ? 'none' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      />

      {/* Inner dot cursor */}
      <div
        className={`custom-cursor fixed top-0 left-0 pointer-events-none rounded-full z-[99999] transition-all duration-200 ease-out ${
          isHovering ? 'w-[12px] h-[12px]' : 'w-[8px] h-[8px]'
        }`}
        style={{
          margin: '-4px 0 0 -4px',
          background: 'linear-gradient(45deg, rgb(249, 115, 22), rgb(30, 58, 138))',
          boxShadow: '0 0 10px rgba(249, 115, 22, 0.5), 0 0 20px rgba(30, 58, 138, 0.3)'
        }}
      />
    </>
  );
}

export default CustomCursor;