import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="absolute inset-0">
                <img
                    src="/test.png"
                    alt="Hero"
                    className="w-full h-full object-cover opacity-40"
                />
                
            </div>
            <div className="relative flex flex-col md:flex-row items-center justify-center md:space-x-8 mt-16 md:mt-8 z-10">
                <img src="63700.png" alt="Image" className="rounded-md object-cover" />
                <div className="md:w-2/3 text-center md:text-left ">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Vaš poslovni partner <br /> za <br /> {' '}
                        <TypeAnimation
                            sequence={[
                                'merjenje',
                                2000,
                                'analizo',
                                2000,
                                'izposojo opreme',
                                2000,
                                'programsko opremo',
                                2000,
                                'svetovanje',
                                2000,
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            style={{ display: 'inline-block' }}
                        />
                    </h1>
                    <h3 className="text-2xl text-gray-700 mt-4">kontaktirajte nas se danes</h3>
                    <div className="flex justify-center md:justify-start mt-4 space-x-4">
                       
                        <Button variant="secondary"> CTA</Button>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
