import React from 'react';

const mentors = [
    {
        name: "Samantha Lo Ee Xin",
        role: "Digital Marketing Strategist - VPS Malaysia",
        description: "Brings extensive experience in digital marketing for SaaS products, as well as startup ecosystem building. Involved in various roles from SMEs to Startups in Malaysia and Singapore.",
        image: "/mentors/samantha.png",
        accent: "var(--primary-accent)",
        icon: "marketing"
    },
    {
        name: "Louis De Rozario",
        role: "Programme Manager - Growth Charger",
        description: "Architect turned SME business owner turned Community Builder. Specializes in entrepreneurship programme design and execution with experience running FnB business for 4+ years.",
        image: "/mentors/louis.png",
        accent: "var(--secondary-accent)",
        icon: "diversity_3"
    },
    {
        name: "Siti Kasmah",
        role: "Lecturer - Curtin University",
        description: "Co-founding advisor of Founders Malaysia. Helps inspire students and communities by putting her business spectrum knowledge into action.",
        image: "/mentors/siti.png",
        accent: "var(--tertiary-accent)",
        icon: "school"
    },
    {
        name: "Garenth",
        role: "Lecturer - Curtin University",
        description: "Building AI3D, a startup exploring AI-powered 3D solutions that bridge creativity, design, and technology for next-generation applications.",
        image: "/mentors/garenth.png",
        accent: "var(--primary-accent)",
        icon: "precision_manufacturing"
    },
    {
        name: "Aidiel Mat Isa",
        role: "Head of Partnership - Pandai (YC21)",
        description: "Empowers people through education, leadership, and community building. Bridges innovation, culture, and growth as a Partnership Manager at Pandai.",
        image: "/mentors/aidiel.png",
        accent: "var(--secondary-accent)",
        icon: "handshake"
    },
    {
        name: "Collin Estera Lee",
        role: "Project Manager",
        description: "Community-driven innovator passionate about tech and youth empowerment. Supporting founders and creating opportunities for young changemakers.",
        image: "/mentors/collin.png",
        accent: "var(--tertiary-accent)",
        icon: "groups"
    },
    {
        name: "Augustinne Wong",
        role: "Associate Economist - MARC Ratings",
        description: "Specializing in macroeconomic research and capital market analysis. Passionate about data-driven insights and financial sustainability.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
        accent: "var(--primary-accent)",
        icon: "monitoring"
    },
    {
        name: "Law Jen Ni",
        role: "Budget Analyst - FP&A, Xsolla",
        description: "Focused on financial planning and budget management. Delivers financial insights that drive strategic business performance in the gaming industry.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
        accent: "var(--secondary-accent)",
        icon: "payments"
    }
];

const SpeakersSection: React.FC = () => {
    return (
        <section className="py-16 sm:py-20" id="speakers">
            <div className="mx-auto max-w-4xl text-center mb-16">
                <h2 className="font-heading text-4xl font-bold tracking-tight text-[var(--text-color)] sm:text-5xl">Meet Our Mentors</h2>
                <p className="mt-4 text-lg leading-8 text-[var(--text-color)]/80">Learn from industry leaders, successful founders, and domain experts who will guide you through your startup journey.</p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
                {mentors.map((mentor, index) => (
                    <div key={index} className="flex flex-col items-center text-center group">
                        <div className={`relative ${index % 2 === 0 ? 'rotate-small' : 'rotate-small-alt'} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-0`}>
                            <img 
                                alt={mentor.name} 
                                className="h-48 w-48 rounded-2xl object-cover card-border shadow-lg" 
                                src={mentor.image} 
                            />
                            <div className="absolute -bottom-3 -right-3 rounded-xl p-2 card-shadow-doodle card-border" style={{ backgroundColor: mentor.accent }}>
                                <span className="material-symbols-outlined text-white text-2xl">{mentor.icon}</span>
                            </div>
                        </div>
                        <h3 className="mt-8 font-heading text-xl font-bold text-[var(--text-color)]">{mentor.name}</h3>
                        <p className="text-sm font-bold leading-7 mb-2" style={{ color: mentor.accent }}>{mentor.role}</p>
                        <p className="text-sm text-[var(--text-color)]/80 leading-relaxed px-2">{mentor.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SpeakersSection;