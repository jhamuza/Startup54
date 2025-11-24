import React, { useEffect, useState } from 'react';

const ScrollBackground: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                setScrollY(window.scrollY);
            });
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // --- Phase 1: Top Left Rainbow (Hero Section) ---
    // Occurs from scroll 0 to 500px
    // Effect: "Completes a full rainbow" (Draws 90deg arc)
    const p1Limit = 500;
    const p1Progress = Math.min(1, Math.max(0, scrollY / p1Limit));
    
    // Logic update: Removed fade out. It retains opacity 1.

    // --- Phase 2: Right Side Arcs (Partners Section) ---
    // Starts appearing around 500px, fully visible by 1000px
    const p2Start = 500;
    const p2End = 1000;
    const p2Progress = Math.min(1, Math.max(0, (scrollY - p2Start) / (p2End - p2Start)));
    
    // Slide in from right (translateX 100% -> 0%)
    const p2TranslateX = 100 * (1 - p2Progress);
    
    // Logic update: Removed fade out. It retains visibility once entered.
    const p2Visible = scrollY > p2Start;


    // Colors matching the prompt images (Red, Yellow, White)
    const cRed = "var(--primary-accent)";
    const cYellow = "var(--tertiary-accent)";
    const cWhite = "white";
    const strokeWidth = 25;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Phase 1: Top Left Concentric Arcs */}
            <svg 
                className="absolute top-0 left-0 w-[400px] h-[400px] overflow-visible"
                style={{ opacity: 1 }}
            >
                {/* Outer Red Arc */}
                <path 
                    d="M0 300 A300 300 0 0 1 300 0" 
                    fill="none" 
                    stroke={cRed} 
                    strokeWidth={strokeWidth} 
                    strokeDasharray={471} 
                    strokeDashoffset={471 * (1 - p1Progress)}
                    strokeLinecap="round"
                />
                {/* Middle Yellow Arc */}
                <path 
                    d="M0 250 A250 250 0 0 1 250 0" 
                    fill="none" 
                    stroke={cYellow} 
                    strokeWidth={strokeWidth} 
                    strokeDasharray={392} 
                    strokeDashoffset={392 * (1 - p1Progress)}
                    strokeLinecap="round"
                />
                {/* Inner White Arc */}
                <path 
                    d="M0 200 A200 200 0 0 1 200 0" 
                    fill="none" 
                    stroke={cWhite} 
                    strokeWidth={strokeWidth} 
                    strokeDasharray={314} 
                    strokeDashoffset={314 * (1 - p1Progress)}
                    strokeLinecap="round"
                />
            </svg>

            {/* Phase 2: Right Side Arcs */}
            <svg 
                className="absolute top-[30vh] right-0 w-[150px] h-[400px] overflow-visible"
                style={{ 
                    opacity: p2Visible ? 1 : 0,
                    transform: `translateX(${p2TranslateX}px)` 
                }}
            >
                <path d="M150 0 Q0 200 150 400" fill="none" stroke={cRed} strokeWidth={strokeWidth} strokeLinecap="round"/>
                <path d="M150 40 Q40 200 150 360" fill="none" stroke={cYellow} strokeWidth={strokeWidth} strokeLinecap="round"/>
                <path d="M150 80 Q80 200 150 320" fill="none" stroke={cWhite} strokeWidth={strokeWidth} strokeLinecap="round"/>
            </svg>
        </div>
    );
};

export default ScrollBackground;