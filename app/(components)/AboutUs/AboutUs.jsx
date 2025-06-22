import React from "react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="text-gray-600 body-font " id="aboutUs">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4 -mb-10 text-center">
          <div className="sm:w-1/2 mb-10 px-6">
            <Image src="/AboutUs.png" alt="Picture" width={500} height={500} />
          </div>

          <div className="sm:w-1/2 mb-10 px-6">
            <div className="sm:w-1/2 mb-10 px-4">
              <div className="rounded-lg  overflow-hidden text-5xl text-black pt-4">
                About Us
              </div>
              <br />
              <p className="leading-relaxed text-base p-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                temporibus laborum quas. Quam quidem reprehenderit,
              </p>

              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 ">
                  <div className="w-20 h-20 rounded-full inline-flex items-center  justify-center bg-gray-200 text-gray-400">
                    <Image
                      src="/AboutUs1.png"
                      alt="Picture"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                      +3.487K
                    </h2>
                  </div>
                </div>
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <Image
                      src="/AboutUs2.png"
                      alt="Picture"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                      +1.298K
                    </h2>
                  </div>
                </div>
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <Image
                      src="/AboutUs3.png"
                      alt="Picture"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                      +4.321K
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
