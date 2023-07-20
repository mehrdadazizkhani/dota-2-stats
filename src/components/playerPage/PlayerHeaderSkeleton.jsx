import React from "react";

const PlayerHeaderSkeleton = () => {
  return (
    <section className=" z-10 w-full">
      <div className="container m-auto flex animate-pulse items-center gap-5">
        <div className="flex aspect-square w-24 items-center rounded-md bg-light-primary"></div>
        <div className="h-6 w-52 bg-dark-primary"></div>
      </div>
    </section>
  );
};

export default PlayerHeaderSkeleton;
