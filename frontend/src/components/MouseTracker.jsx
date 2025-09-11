import React, { useState, useEffect, useRef } from 'react';
import './MouseTracker.css';
import mousePointerSvg from '../images/mouse-pointer-svgrepo-com.svg';

const MouseTracker = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef();
  const prevMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = {
        x: e.clientX,
        y: e.clientY
      };
      
      // Calculate movement direction for rotation
      const dx = newPosition.x - prevMousePosition.current.x;
      const dy = newPosition.y - prevMousePosition.current.y;
      
      // Only update rotation if there's significant movement
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setRotation(angle);
      }
      
      prevMousePosition.current = newPosition;
      setMousePosition(newPosition);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Keep default cursor visible
    document.body.style.cursor = 'auto';

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Smooth trailing animation that follows mouse movement continuously
  useEffect(() => {
    const animateTrail = () => {
      setTrailPosition(prevPos => {
        const dx = mousePosition.x - prevPos.x;
        const dy = mousePosition.y - prevPos.y;
        
        // Reduced interpolation for more trailing distance
        // Lower value = more distance behind the cursor
        return {
          x: prevPos.x + dx * 0.05,
          y: prevPos.y + dy * 0.05
        };
      });
      
      animationRef.current = requestAnimationFrame(animateTrail);
    };

    animationRef.current = requestAnimationFrame(animateTrail);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <div className="mouse-tracker-container">
      <div 
        className={`custom-cursor-trail ${isClicking ? 'clicking' : ''}`}
        style={{
          left: trailPosition.x,
          top: trailPosition.y
        }}
      >
        <img 
          src={mousePointerSvg} 
          alt="Cursor Trail" 
          className="cursor-svg"
          style={{
            transform: `rotate(${rotation}deg) ${isClicking ? 'scale(1.2)' : 'scale(1)'}`
          }}
        />
      </div>
    </div>
  );
};

export default MouseTracker;
