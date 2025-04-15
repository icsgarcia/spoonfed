const HeroSVG = () => {
    return (
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] z-20">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
                className="relative block w-[calc(100%+1.5px)] h-[70px] fill-white"
            >
                <path d="M0,64L48,64C96,64,192,64,288,58.7C384,53,480,43,576,48C672,53,768,75,864,74.7C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
            </svg>
        </div>
    );
};
export default HeroSVG;
