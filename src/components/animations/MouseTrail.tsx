import React, { useEffect, useRef } from 'react';

interface MouseTrailProps {
    color: string;
    symbol?: string; // New optional prop for custom symbols (e.g., ❄️, ⚡)
}

export const MouseTrail: React.FC<MouseTrailProps> = ({ color, symbol }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const pointsRef = useRef<{ x: number, y: number, opacity: number }[]>([]);
    const numPoints = symbol ? 15 : 20; // Fewer points for symbols to avoid clutter

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();

        // Initialize points
        pointsRef.current = Array(numPoints).fill(0).map(() => ({
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            opacity: 1
        }));

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update points with spring physics
            let prev = mouseRef.current;
            pointsRef.current.forEach((point, i) => {
                point.x += (prev.x - point.x) * (symbol ? 0.2 : 0.4);
                point.y += (prev.y - point.y) * (symbol ? 0.2 : 0.4);
                point.opacity = 1 - (i / numPoints);
                prev = point;
            });

            if (symbol) {
                // Draw Symbols
                ctx.font = '24px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                pointsRef.current.forEach((point) => {
                    ctx.globalAlpha = point.opacity;
                    ctx.fillText(symbol, point.x, point.y);

                    // Add subtle glow to symbols
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = color;
                    ctx.fillText(symbol, point.x, point.y);
                    ctx.shadowBlur = 0;
                });
                ctx.globalAlpha = 1;
            } else {
                // Draw Continuous Line
                ctx.beginPath();
                ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

                for (let i = 1; i < pointsRef.current.length; i++) {
                    const p1 = pointsRef.current[i - 1];
                    const p2 = pointsRef.current[i];
                    const xc = (p1.x + p2.x) / 2;
                    const yc = (p1.y + p2.y) / 2;
                    ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
                }

                ctx.strokeStyle = color;
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();

                // Draw glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = color;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, symbol, numPoints]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9998,
                opacity: 0.8
            }}
        />
    );
};
