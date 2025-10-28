import React, { useRef, useEffect } from 'react';

interface GlassSurfaceProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  displace?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  brightness?: number;
  opacity?: number;
  mixBlendMode?: string;
  className?: string;
  children: React.ReactNode;
}

export default function GlassSurface({
  width = 300,
  height = 200,
  borderRadius = 24,
  displace = 0,
  distortionScale = 0,
  redOffset = 0,
  greenOffset = 0,
  blueOffset = 0,
  brightness = 100,
  opacity = 0.8,
  mixBlendMode = 'normal',
  className = '',
  children
}: GlassSurfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create glass effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.3})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.1})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.2})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add distortion effect if enabled
      if (distortionScale !== 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor(i / 4 / canvas.width);
          
          const distortion = Math.sin(x * 0.01) * Math.cos(y * 0.01) * distortionScale;
          
          data[i] = Math.min(255, Math.max(0, data[i] + redOffset + distortion));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + greenOffset + distortion));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + blueOffset + distortion));
        }
        
        ctx.putImageData(imageData, 0, 0);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [displace, distortionScale, redOffset, greenOffset, blueOffset, brightness, opacity]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    overflow: 'hidden',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    background: `rgba(255, 255, 255, ${opacity * 0.1})`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    mixBlendMode: mixBlendMode as any,
  };

  return (
    <div 
      ref={containerRef}
      className={className}
      style={containerStyle}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}

