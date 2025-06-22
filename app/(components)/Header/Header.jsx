import React from "react";

export default function Header() {
  return (
    // <header className="relative bg-[url('/hands.jpg')] bg-cover bg-center h-96 flex items-center justify-center text-black">
    //   <div className="flex">
    //     <div className="text-center space-y-2 ">
    //       <h1 className="text-5xl font-bold tracking-tight text-gray-900">
    //         CHARITY
    //       </h1>
    //       <h2 className="text-3xl font-semibold text-gray-700">
    //         FOR THE NATION
    //       </h2>
    //     </div>
    //     <div>
    //       <p className="text-3xl font-semibold text-gray-700">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
    //         debitis, distinctio officiis itaque, deleniti a recusandae omnis
    //         neque odit consectetur, in libero? Tempora repellat obcaecati quo
    //         nihil. Unde, beatae consequatur?
    //       </p>
    //     </div>
    //   </div>
    // </header>

      <header className="relative bg-[url('/hands.jpg')] bg-cover bg-center min-h-[24rem] md:min-h-[32rem] flex items-center justify-center text-black">
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Charity Text - 50% width on lg screens */}
          <div className="lg:w-1/2 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black">
              CHARITY
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black/90">
              FOR THE NATION
            </h2>
          </div>

          {/* Description Text - 50% width on lg screens */}
          <div className="lg:w-1/2">
            <p className="text-lg md:text-xl lg:text-2xl text-black/90 font-medium bg-black/30 p-6 rounded-lg backdrop-blur-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              debitis, distinctio officiis itaque, deleniti a recusandae omnis
              neque odit consectetur, in libero? Tempora repellat obcaecati quo
              nihil. Unde, beatae consequatur?
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
