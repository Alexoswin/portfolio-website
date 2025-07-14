import { useEffect, useRef, useState } from 'react';
import './Achievementcard.css';

export default function Achievementcard({ name, Description, image, index }) {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const directionClass = index % 2 === 0 ? 'slide-left' : 'slide-right';

    return (
        <div
            ref={cardRef}
            className={`AchievementCardContainer ${isVisible ? directionClass : ''}`}
        >
            <div className='AchievementCard'>
                <div className='img'>
                    <img className='img' src={image} alt={name} />
                </div>
                <h5><b>{name}</b></h5>
                <p>{Description}</p>
            </div>
        </div>
    );
}
