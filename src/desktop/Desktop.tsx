import { useState, useEffect, useCallback } from 'react';
import VizagLogo from '../assets/img/VizagLogo.jpg';
import BlrLogo from '../assets/img/BlrLogo.jpg';
import HydLogo from '../assets/img/HydLogo.jpg';
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
    logo: string;
}

const LeftArrow = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="-200 -960 960 960" width="30px" fill="#f0e9e9"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
    )
}

const RightArrow = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#f0e9e9"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
    )
}

const cities: City[] = [
    { name: 'Hyderabad', date: new Date('2024-12-14T00:00:00'), logo: HydLogo },
    { name: 'Bengaluru', date: new Date('2024-12-21T00:00:00'), logo: BlrLogo },
    { name: 'Vizag', date: new Date('2024-12-28T00:00:00'), logo: VizagLogo }
]

export default function Desktop() {
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

    const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(nextImage, intervalTime);
        return () => clearInterval(interval);
    }, [currentImageIndex]);

    const hexToRgba = (hex: string, alpha: number = 0.8) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    const cityColors = ['#DD736E', '#E0B541', '#5E95CD'];
    const currentColor = cityColors[currentCityIndex];
    const boxShadowColor = hexToRgba(currentColor);

    const updateCountDown = useCallback(() => {
        const eventDate = cities[currentCityIndex].date;
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            if (days > 0) {
                setTimeLeft({ days, hours: 0, minutes: 0, seconds: 0 });
            } else if (hours > 0) {
                setTimeLeft({ days: 0, hours, minutes: 0, seconds: 0 });
            } else if (minutes > 0) {
                setTimeLeft({ days: 0, hours: 0, minutes, seconds: 0 });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds });
            }
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    }, [currentCityIndex])

    useEffect(() => {
        updateCountDown();
        const countDownInterval = setInterval(updateCountDown, 1000);
        return () => clearInterval(countDownInterval);
    });

    const handlePreviousCity = () => {
        setCurrentCityIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
    }

    const handleNextCity = () => {
        setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }

    const getSuffix = (date: number) => {
        if(date === 1 || date === 21 || date === 31) return 'st';
        if(date === 2 || date === 22) return 'nd';
        if(date === 3 || date === 23) return 'rd';
        return 'th';
    };

    const eventDay = cities[currentCityIndex].date.getDate();
    const eventDaySuffix = getSuffix(eventDay);

    return (
        <div>
            <nav className="d-md:h-24 d-sm:h-20 d-lg:h-32 flex items-center">
                <img src={ cities[currentCityIndex].logo } alt="Logo" className="d-md:w-36 d-sm:w-28 d-lg:w-44 ml-4 mt-4" loading='lazy' />
            </nav>

            <div className="flex d-md:h-[599px] d-sm:h-[471px] d-lg:h-[791px] justify-around ">
                <div className="xl:w-[1000px] d-lg:w-[1200px] xl:mx-5">
                    <img src={carouselImages[currentImageIndex]} alt={`Carousel ${currentImageIndex + 1}`} className={`w-full d-md:h-[550px] d-sm:h-[440px] d-lg:h-[750px] object-cover transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'} rounded-lg m-5`} loading='lazy' />
                </div>

                <div style={{ backgroundColor: currentColor, boxShadow: `0px 0px 3px 2px ${ boxShadowColor }` }} className="d-sm:w-[550px] d-md:h-[550px] d-sm:h-[440px] d-lg:h-[750px] d-lg:w-[750px] rounded-lg d-lg:pl-4 d-sm:pl-2 m-5">
                    <h1 className='font-SpaceGrotesk pt-5 d-md:text-6xl d-lg:text-8xl d-sm:text-5xl d-md:pl-5 d-sm:pl-3'>{cities[currentCityIndex].name}</h1>
                    <p className='d-md:pl-5 d-sm:pl-3 d-md:mt-10 d-md:mb-5 d-sm:mt-5 d-lg:mt-14 d-sm:mb-3 d-lg:mb-10 d-md:text-5xl d-sm:text-3xl d-lg:text-7xl font-AlumniSansPinstripe font-bold'>We are doing our best to bring you this website.</p>
                    <p className='d-md:pl-5 d-sm:pl-3 d-md:text-5xl d-sm:text-3xl d-lg:text-7xl font-AlumniSansPinstripe font-bold'>Till then stay tuned!</p>
                    <br />
                    <div className='d-sm:pl-3 d-md:pl-5 d-md:mt-7 d-lg:mt-0'>
                        <p className='font-Tourney'><span className='font-ZenDots text-white d-sm:text-xl d-md:text-2xl d-lg:text-4xl'>{ eventDay }</span><sup className='font-ZenDots text-white pr-1 d-sm:text-lg d-lg:text-2xl'>{ eventDaySuffix }</sup> <span className='d-md:text-5xl d-sm:text-4xl d-lg:text-7xl'>December 2024</span></p>
                    </div>
                    <br />
                    <p className='d-md:pl-5 d-sm:pl-3 d-md:text-5xl d-sm:text-3xl d-lg:mt-3'>
                        {timeLeft.days > 0 && <p className='font-ZenDots d-sm:text-2xl d-lg:text-4xl'>{timeLeft.days} <span className='text-white font-Tourney d-sm:text-5xl d-lg:text-7xl'>Days</span> to go</p>}
                        {timeLeft.days === 0 && timeLeft.hours > 0 && <p className='font-ZenDots d-lg:text-4xl d-sm:text-3xl'>{timeLeft.hours} <span className='text-white font-Tourney d-md:text-7xl d-sm:text-5xl'>Hours</span> to go</p>}
                        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes > 0 && <p className='font-ZenDots d-lg:text-4xl d-sm:text-3xl'>{timeLeft.minutes} <span className='text-white font-Tourney d-md:text-6xl d-sm:text-4xl'>Minutes</span> to go</p>}
                        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && <p className='font-ZenDots d-lg:text-4xl d-sm:text-3xl'>{timeLeft.seconds} <span className='text-white font-Tourney d-md:text-6xl d-sm:text-4xl'>Seconds</span>to go</p>}
                    </p>
                    <br />
                    <div className='flex justify-around d-sm:mt-7 d-lg:mt-14'>
                        <button className='hover:bg-white/40 hover:rounded-full' onClick={ handlePreviousCity }>
                            <LeftArrow />
                        </button>

                        <button className='hover:bg-white/40 hover:rounded-full' onClick={ handleNextCity }>
                            <RightArrow />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}