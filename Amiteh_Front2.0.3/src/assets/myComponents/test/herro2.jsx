import React from 'react';

const Hero = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
        <div className="md:w-1/2">
          <img
            src="your-image-url.jpg"
            alt="Hero"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">Your Hero Title</h1>
          <h3 className="text-2xl text-gray-700 mt-4">Your Hero Subtitle</h3>
        </div>
      </div>
    </div>
  );
};

export default Hero;