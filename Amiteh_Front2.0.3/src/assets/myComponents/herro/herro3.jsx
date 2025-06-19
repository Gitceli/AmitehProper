import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"


const Hero = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
                <div className="md:w-2/3">
                    <div className="w-[600px]">
                        <AspectRatio ratio={16 / 9}>
                            <img src="../../../public/herroimg.png" alt="Image" className="rounded-md object-cover" />
                        </AspectRatio>
                    </div>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Vas poslovni partner za  <br />{' '}
                        <TypeAnimation
                            sequence={[
                                'Merjenje',
                                2000,
                                'Analizo',
                                2000,
                                'Izposojo Opreme',
                                2000
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            style={{ display: 'inline-block' }}
                        />
                    </h1>
                    <h3 className="text-2xl text-gray-700 mt-4">kontaktirajte nas se danes</h3>
                    <div className="flex">
                        <Button className="m-5">Kontaktirajte nas </Button><Button className="m-10">CTA</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;