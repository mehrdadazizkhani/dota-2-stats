import React from "react";
import { FaMoon } from "react-icons/fa";

const LiveMatchSkeleton = () => {
  const players = [0, 1, 2, 3, 4];
  return (
    <div className="flex w-[350px] animate-pulse cursor-pointer flex-col items-center justify-between gap-2 rounded-md border-2 border-dark-secondary/90 bg-dark-secondary p-2 text-xs text-dark-heading transition-all duration-300 hover:bg-dark-secondary/30">
      <div className="flex w-full items-center justify-between gap-2 border-b border-dark-primary p-2">
        <span>Unknown</span>
        <div className="flex items-center gap-1">
          <FaMoon />
          <span>00:00</span>
        </div>
        <span>viewers N/A</span>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <span>Radiant</span>
        <div className="flex gap-2">
          <span className="mr-2 flex aspect-square w-5 items-center justify-center rounded-sm bg-light-primary p-0.5 text-[12px] font-bold text-dark-primary"></span>
          {players.map((player) => {
            return (
              <div
                className="aspect-square w-5 rounded-full bg-light-primary"
                key={player}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <span>Dire</span>
        <div className="flex gap-2">
          <span className="mr-2 flex aspect-square w-5 items-center justify-center rounded-sm bg-light-primary p-0.5 text-[12px] font-bold text-dark-primary"></span>
          {players.map((player) => {
            return (
              <div
                className="aspect-square w-5 rounded-full bg-light-primary"
                key={player}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LiveMatchSkeleton;
