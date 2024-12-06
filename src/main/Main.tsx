import { useState, useEffect, useCallback } from 'react';
import Logo from '../assets/img/HC Logo.png';
import carouselImages from '../carouselImages';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface City {
    name: string;
    date: Date;
}

const cities: City[] = [
    { name: 'HYDERABAD', date: new Date('2024-12-14T00:00:00') },
    { name: 'BENGALURU', date: new Date('2024-12-21T00:00:00') },
    { name: 'VIZAG', date: new Date('2024-12-28T00:00:00') },
];

export default function Main() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const intervalTime = 3000;

    const nextImage = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
            );
            setFade(true);
        }, 250);
    };

    useEffect(() => {
        const interval = setInterval(nextImage, intervalTime);
        return () => clearInterval(interval);
    }, [currentImageIndex]);

    const [timeLefts, setTimeLefts] = useState<TimeLeft[]>([]);

    const updateCountDowns = useCallback(() => {
        const now = new Date();
        const newTimeLefts = cities.map((city) => {
            const difference = city.date.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                return { days, hours, minutes, seconds };
            } else {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
        });
        setTimeLefts(newTimeLefts);
    }, []);

    useEffect(() => {
        updateCountDowns();
        const countDownInterval = setInterval(updateCountDowns, 1000);
        return () => clearInterval(countDownInterval);
    }, [updateCountDowns]);

    const getSuffix = (date: number) => {
        if (date === 1 || date === 21 || date === 31) return 'st';
        if (date === 2 || date === 22) return 'nd';
        if (date === 3 || date === 23) return 'rd';
        return 'th';
    };

    const cityColors = ['#DD736E', '#E0B541', '#5E95CD'];

    return (
        <div>
            <nav className="sm:h-16 d-sm:h-16 d-md:h-24 d-lg:h-32 flex items-center">
                <img src={Logo} alt="Logo" className="sm:w-24 md:w-40 lg:w-56 ml-4 sm:ml-2" loading="lazy" />
            </nav>

            <div className="flex justify-center">
                <div className="w-full sm:m-2 md:m-4 lg:m-1">
                    <img
                        src={carouselImages[currentImageIndex]}
                        alt={`Carousel ${currentImageIndex + 1}`}
                        className={`w-full sm:h-[300px] md:h-[580px] lg:h-[780px] object-cover transition-opacity duration-300 ${
                            fade ? 'opacity-100' : 'opacity-0'
                        } rounded-lg`}
                        loading="lazy"
                    />
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8 sm:gap-4 sm:mt-6">
                {cities.map((city, index) => {
                    const { days, hours, minutes, seconds } = timeLefts[index] || {};
                    const currentColor = cityColors[index];
                    const eventDay = city.date.getDate();
                    const eventDaySuffix = getSuffix(eventDay);

                    return (
                        <div key={city.name} style={{ backgroundColor: currentColor }} className="relative rounded-lg p-5 text-white shadow-lg flex flex-col items-center w-screen sm:w-full sm:mx-2 m-2">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h1 className="text-[100px] sm:text-[60px] font-Tourney opacity-50 text-white" style={{ whiteSpace: 'nowrap', zIndex: 0 }}> {city.name}</h1>
                            </div>
                            <div className="relative z-10">
                                <p className="text-[30px] sm:text-[20px] font-ZenDots text-black">Event Date:</p>
                                <p className="font-ZenDots text-[30px] sm:text-[18px] text-black">
                                    <span>{eventDay}</span>
                                    <sup>{eventDaySuffix}</sup> December 2024
                                </p>
                                <div className="text-black">
                                    {days > 0 && (<p className="font-ZenDots text-[20px] sm:text-[16px]"> {days} <span className="font-ZenDots">Days to go!</span></p>)}
                                    {days === 0 && hours > 0 && (<p className="font-ZenDots text-[16px]">{hours} <span>Hours to go!</span></p>)}
                                    {days === 0 && hours === 0 && minutes > 0 && (<p className="font-Tourney text-[16px]">{minutes} <span>Minutes to go!</span></p>)}
                                    {days === 0 && hours === 0 && minutes === 0 && seconds > 0 && (<p className="font-Tourney text-[16px]">{seconds} <span>Seconds to go!</span></p>)}
                                    {days === 0 && hours === 0 && minutes === 0 && seconds === 0 && (<p className="font-Tourney text-[16px]">Event is live!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}