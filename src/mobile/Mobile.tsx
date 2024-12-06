import { useState, useEffect, useCallback } from 'react';
import carouselImages from '../carouselImages';
import Logo from '../assets/img/HC Logo.png';

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
    { name: 'Hyderabad', date: new Date('2024-12-14T00:00:00') },
    { name: 'Bengaluru', date: new Date('2024-12-21T00:00:00') },
    { name: 'Vizag', date: new Date('2024-12-28T00:00:00') }
];

export default function Mobile() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const intervalTime = 3000;

    // City and countdown states
    const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Image Carousel Logic
    const nextImage = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
            );
            setFade(true);
        }, 150);
    };

    useEffect(() => {
        const interval = setInterval(nextImage, intervalTime);
        return () => clearInterval(interval);
    }, [currentImageIndex]);

    // Countdown Logic
    const updateCountDown = useCallback(() => {
        const eventDate = cities[currentCityIndex].date;
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    }, [currentCityIndex]);

    useEffect(() => {
        updateCountDown();
        const countDownInterval = setInterval(updateCountDown, 1000);
        return () => clearInterval(countDownInterval);
    }, [updateCountDown]);

    const handlePreviousCity = () => {
        setCurrentCityIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
    };

    const handleNextCity = () => {
        setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    };

    return (
        <div>
            <nav className="d-md:h-24 d-sm:h-20 d-lg:h-32 flex items-center sm:h-24">
                <img src={ Logo } alt="Logo" className="d-md:w-36 d-sm:w-28 d-lg:w-44 ml-10 mt-4 sm:h-32 sm:mt-3 sm:ml-[-12px]" loading='lazy' />
            </nav>
            <div className="grid grid-cols-1 gap-4 p-2 lg:grid-cols-3 lg:gap-8">

                <div className="d-md:h-screen d-lg:h-screen d-sm:h-screen rounded-2xl bg-gray-200 relative overflow-hidden lg:col-span-2" id="topbox">
                    <img
                        src={carouselImages[currentImageIndex]}
                        alt={`Carousel ${currentImageIndex + 1}`}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
                        loading="lazy"
                    />
                </div>

                <div className="h-96 lg:h-screen rounded-2xl bg-slate-950 p-4 flex flex-col justify-between items-start text-left" id="basebox">

                    <h1 className="text-5xl font-extrabold text-white">{cities[currentCityIndex].name}</h1>
                    <p className='font-semibold text-lg text-white'>We are working hard to bring you the best experince!</p>

                    <div className="text-4xl font-extrabold text-white">
                        {timeLeft.days > 0 && (
                            <p>
                                <span className="text-6xl ">{timeLeft.days}</span>
                                <br />
                                <span>Days to go</span>
                            </p>
                        )}

                        {timeLeft.days === 0 && timeLeft.hours > 0 && (
                            <p>
                                <span className="text-6xl">{timeLeft.hours}</span>
                                <span> Hours to go</span>
                            </p>
                        )}

                        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes > 0 && (
                            <p>
                                <span className="text-6xl">{timeLeft.minutes}</span>
                                <span> Minutes to go</span>
                            </p>
                        )}

                        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && (
                            <p>
                                <span className="text-6xl">{timeLeft.seconds}</span>
                                <span> Seconds to go</span>
                            </p>
                        )}
                    </div>


                    {/* Navigation buttons for cities */}
                    <div className="flex gap-4">
                        <button
                            onClick={handlePreviousCity}
                            className="p-4 bg-gray-600 rounded-full  w-16 h-16 flex justify-center items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-8 h-8 text-blue-300"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={4}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={handleNextCity}
                            className="p-4 bg-blue-300 rounded-full  w-16 h-16 flex justify-center items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-8 h-8 text-black"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={4}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
}