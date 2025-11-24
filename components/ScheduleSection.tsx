import React from 'react';

const ScheduleSection: React.FC = () => {
    return (
        <section className="py-10 sm:py-12" id="schedule">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="font-heading text-4xl font-bold tracking-tight text-[var(--text-color)] sm:text-5xl">Event Schedule</h2>
                <p className="mt-4 text-lg leading-8 text-[var(--text-color)]/80">Three days of intense collaboration, learning, and creation.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 card-shadow-doodle card-border rotate-small rotate-v6">
                    <h3 className="font-heading text-2xl font-bold">Day 1: Friday</h3>
                    <p className="font-semibold text-[var(--primary-accent)]">Meet, Pitch &amp; Team Up</p>
                    <ul className="mt-2 space-y-2 text-[var(--text-color)]/90">
                        <li><span className="font-bold">6:00 PM:</span> Dinner &amp; Networking</li>
                        <li><span className="font-bold">7:00 PM:</span> Welcome &amp; Speakers</li>
                        <li><span className="font-bold">7:30 PM:</span> Pitches Start</li>
                        <li><span className="font-bold">9:00 PM:</span> Voting &amp; Team Formation</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 card-shadow-doodle card-border rotate-small-alt rotate-v7">
                    <h3 className="font-heading text-2xl font-bold">Day 2: Saturday</h3>
                    <p className="font-semibold text-[var(--secondary-accent)]">Build, Validate &amp; Learn</p>
                    <ul className="mt-2 space-y-2 text-[var(--text-color)]/90">
                        <li><span className="font-bold">9:00 AM:</span> Breakfast &amp; Work</li>
                        <li><span className="font-bold">12:00 PM:</span> Lunch</li>
                        <li><span className="font-bold">2:00 PM:</span> Mentor Meetings</li>
                        <li><span className="font-bold">7:00 PM:</span> Dinner</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 card-shadow-doodle card-border rotate-small rotate-v8">
                    <h3 className="font-heading text-2xl font-bold">Day 3: Sunday</h3>
                    <p className="font-semibold text-[var(--tertiary-accent)]">Present, Judge &amp; Celebrate</p>
                    <ul className="mt-2 space-y-2 text-[var(--text-color)]/90">
                        <li><span className="font-bold">9:00 AM:</span> Breakfast &amp; Final Touches</li>
                        <li><span className="font-bold">12:00 PM:</span> Lunch</li>
                        <li><span className="font-bold">4:00 PM:</span> Final Presentations</li>
                        <li><span className="font-bold">6:30 PM:</span> Judging &amp; Awards</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ScheduleSection;