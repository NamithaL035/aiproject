import React from 'react';

const TestimonialCard: React.FC<{ quote: string, name: string, role: string, avatar: string }> = ({ quote, name, role, avatar }) => (
    <div className="card !p-8 h-full flex flex-col justify-between">
        <p className="text-text-secondary text-lg mb-6">"{quote}"</p>
        <div className="flex items-center">
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <p className="font-bold text-text-primary">{name}</p>
                <p className="text-sm text-text-secondary">{role}</p>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    const testimonials = [
        {
            quote: "The AI grocery planner is a game-changer! It saves me hours every week and I'm spending way less on impulse buys.",
            name: "Priya Sharma",
            role: "Working Mom, Bangalore",
            avatar: "https://i.pravatar.cc/80?img=1"
        },
        {
            quote: "I finally feel in control of my finances. The savings tips are so practical and have already saved me hundreds.",
            name: "Rajesh Kumar",
            role: "Software Engineer, Hyderabad",
            avatar: "https://i.pravatar.cc/80?img=2"
        },
        {
            quote: "Scanning receipts is incredibly fast and accurate. It's made expense tracking something I actually do now.",
            name: "Anjali Mehta",
            role: "Freelancer, Mumbai",
            avatar: "https://i.pravatar.cc/80?img=3"
        }
    ];

    return (
        <>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">Loved by households across India</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                    Don't just take our word for it. Here's what our users are saying.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map(testimonial => <TestimonialCard key={testimonial.name} {...testimonial} />)}
            </div>
        </>
    );
};

export default Testimonials;
