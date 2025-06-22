import React from "react";
import Image from "next/image";

export default function Introduction() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4 -mb-10 text-center">
          <div className="sm:w-1/2 mb-10 px-4">
            <div className="rounded-lg  overflow-hidden text-5xl text-black pt-4">
              Introduction
            </div>
            <br />
            <p className="leading-relaxed text-base p-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              temporibus laborum quas. Quam quidem reprehenderit, modi dolores,
              nostrum fugiat facere ratione corrupti inventore consectetur
              libero accusantium adipisci. Tempora, delectus beatae?
              <br /> <br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
              commodi corrupti! Maxime doloribus, ullam voluptatem nam,
              voluptatum explicabo iusto, veniam in nemo a consequuntur neque
              soluta incidunt non corporis cum.
            </p>
          </div>

          <div className="sm:w-1/2 mb-10 px-6">
            <Image
              className="object-cover object-center rounded-full border-8 "
              alt="hero"
              src="/circleHands.png"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
