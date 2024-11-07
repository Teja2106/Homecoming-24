import { useState, useEffect, useCallback } from 'react';
import Logo from '../assets/img/Logo.png';
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
    { name: 'Hyderabad', date: new Date('2024-12-14T00:00:00') },
    { name: 'Bengaluru', date: new Date('2024-12-21T00:00:00') },
    { name: 'Vizag', date: new Date('2024-12-28T00:00:00') }
]

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
        }, 150);
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
            <nav className="m-md:h-24 m-sm:h-20 m-lg:h-32 flex items-center">
                <img src={Logo} alt="Logo" className="m-md:w-36 m-sm:w-28 m-lg:w-44 ml-10" loading='lazy' />
            </nav>

            <div className="flex m-md:h-[599px] m-sm:h-[471px] m-lg:h-[791px] justify-around ">
                <div className="xl:w-[1000px] m-lg:w-[1200px] xl:mx-5">
                    <img src={carouselImages[currentImageIndex]} alt={`Carousel ${currentImageIndex + 1}`} className={`w-full m-md:h-[550px] m-sm:h-[440px] m-lg:h-[750px] object-cover transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'} rounded-lg m-5`} loading='lazy' />
                </div>

                <div style={{ backgroundColor: currentColor, boxShadow: `0px 0px 3px 2px ${ boxShadowColor }` }} className="m-sm:w-[550px] m-md:h-[550px] m-sm:h-[440px] m-lg:h-[750px] m-lg:w-[750px] rounded-lg m-lg:pl-4 m-sm:pl-2 m-5">
                    <h1 className='font-SpaceGrotesk pt-5 m-md:text-6xl m-lg:text-8xl m-sm:text-5xl m-md:pl-5 m-sm:pl-3'>{cities[currentCityIndex].name}</h1>
                    <p className='m-md:pl-5 m-sm:pl-3 m-md:mt-10 m-md:mb-5 m-sm:mt-5 m-lg:mt-14 m-sm:mb-3 m-lg:mb-10 m-md:text-5xl m-sm:text-3xl m-lg:text-7xl font-AlumniSansPinstripe font-bold'>We are doing our best to bring you this website.</p>
                    <p className='m-md:pl-5 m-sm:pl-3 m-md:text-5xl m-sm:text-3xl m-lg:text-7xl font-AlumniSansPinstripe font-bold'>Till then stay tuned!</p>
                    <br />
                    <div className='m-sm:pl-3 m-md:pl-5 m-md:mt-7 m-lg:mt-0'>
                        <p className='font-Tourney'><span className='font-ZenDots text-white m-sm:text-xl m-md:text-2xl m-lg:text-4xl'>{ eventDay }</span><sup className='font-ZenDots text-white pr-1 m-sm:text-lg m-lg:text-2xl'>{ eventDaySuffix }</sup> <span className='m-md:text-5xl m-sm:text-4xl m-lg:text-7xl'>December 2024</span></p>
                    </div>
                    <br />
                    <p className='m-md:pl-5 m-sm:pl-3 m-md:text-5xl m-sm:text-3xl m-lg:mt-3'>
                        {timeLeft.days > 0 && <p className='font-ZenDots m-sm:text-2xl m-lg:text-4xl'>{timeLeft.days} <span className='text-white font-Tourney m-sm:text-5xl m-lg:text-7xl'>Days</span> to go</p>}
                        {timeLeft.days === 0 && timeLeft.hours > 0 && <p className='font-ZenDots m-lg:text-4xl m-sm:text-3xl'>{timeLeft.hours} <span className='text-white font-Tourney m-md:text-7xl m-sm:text-5xl'>Hours</span> to go</p>}
                        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes > 0 && <p className='font-ZenDots m-lg:text-4xl m-sm:text-3xl'>{timeLeft.minutes} <span className='text-white font-Tourney m-md:text-6xl m-sm:text-4xl'>Minutes</span> to go</p>}
                        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && <p className='font-ZenDots m-lg:text-4xl m-sm:text-3xl'>{timeLeft.seconds} <span className='text-white font-Tourney m-md:text-6xl m-sm:text-4xl'>Seconds</span>to go</p>}
                    </p>
                    <br />
                    <div className='flex justify-around m-sm:mt-7 m-lg:mt-14'>
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