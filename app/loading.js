"use client";
import { useEffect, useState } from 'react';

export default function LoadingAnimation() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="cosmic-background"></div>
      <div className="nebula"></div>
      <div className="star-field">
        {Array.from({ length: isMobile ? 2 : 3 }).map((_, layerIndex) => (
          <div 
            key={layerIndex}
            className="star-layer"
            style={{ transform: `translateZ(${-layerIndex * 200}px)` }}
          >
            {Array.from({ length: isMobile ? 30 : 50 }).map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translateZ(${Math.random() * 400}px)`,
                  animationDelay: `${-Math.random() * 20}s`
                }}
              />
            ))}
          </div>
        ))}
        {Array.from({ length: isMobile ? 4 : 8 }).map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="shooting-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}
      </div>
      <div className="loading-text-container">
        <div className="letter-wrapper">
          {'LET'.split('').map((letter, i) => (
            <span
              key={i}
              className="letter bold"
              data-letter={letter}
              style={{
                animationDelay: `${0.9 + i * 0.12}s`,
                '--random-y': `${Math.random() * 360}deg`,
                '--random-z': `${Math.random() * 90 - 45}deg`
              }}
            >
              {letter}
            </span>
          ))}
          {'ORA'.split('').map((letter, i) => (
            <span
              key={i + 3}
              className="letter light"
              data-letter={letter}
              style={{
                marginLeft: i === 0 ? '0.1em' : '0',
                letterSpacing: '0.15em',
                animationDelay: `${1.26 + i * 0.12}s`,
                '--random-y': `${Math.random() * 360}deg`,
                '--random-z': `${Math.random() * 90 - 45}deg`
              }}
            >
              {letter}
            </span>
          ))}
          <div className="dot"></div>
          <div className="moon"></div>
        </div>
      </div>
    </>
  );
} 