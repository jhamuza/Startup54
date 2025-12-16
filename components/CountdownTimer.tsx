import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
    // Target date: January 23, 2026 6:00 PM
    const targetDate = new Date('2026-01-23T18:00:00').getTime();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="mt-4 grid grid-cols-2 gap-4 @[640px]:grid-cols-4">
            <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[var(--bg-color)] p-4 card-shadow-doodle card-border">
                <p className="font-heading text-4xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">{timeLeft.days}</p>
                <p className="text-sm font-medium leading-normal text-[var(--text-color)]/80">Days</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[var(--bg-color)] p-4 card-shadow-doodle card-border">
                <p className="font-heading text-4xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">{timeLeft.hours}</p>
                <p className="text-sm font-medium leading-normal text-[var(--text-color)]/80">Hours</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[var(--bg-color)] p-4 card-shadow-doodle card-border">
                <p className="font-heading text-4xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">{timeLeft.minutes}</p>
                <p className="text-sm font-medium leading-normal text-[var(--text-color)]/80">Minutes</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[var(--bg-color)] p-4 card-shadow-doodle card-border">
                <p className="font-heading text-4xl font-bold leading-tight tracking-tighter text-[var(--text-color)]">{timeLeft.seconds}</p>
                <p className="text-sm font-medium leading-normal text-[var(--text-color)]/80">Seconds</p>
            </div>
        </div>
    );
};

export default CountdownTimer;