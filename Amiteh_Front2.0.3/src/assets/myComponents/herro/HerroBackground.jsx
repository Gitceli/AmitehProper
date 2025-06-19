import React from 'react';
import { ParallaxLayer } from '@react-spring/parallax';

const HeroBackground = () => {
    return (
        <>
            {/* Background parallax layer */}
            <ParallaxLayer
                offset={0} // Start at the top of the page
                speed={0.1} // Scroll at half the normal speed for parallax effect
                factor={1} // This covers more space vertically
                style={{
                    backgroundImage: `url('/test.png')`,
                    backgroundSize: 'cover',
                    position: 'absolute', 
                    opacity: 0.4,
                    top: 0, left: 0, width: '100%', height: '100%',
                }}
            />
        </>
    );
};

export default HeroBackground;
