import React from "react";
import { gql, useQuery } from "@apollo/client";

const WinRate = ({ playerID }) => {
  const GET_PLAYERBYID = gql`
    query {
      player(steamAccountId: ${playerID}) {
        matchCount
        winCount
      }
    }
  `;
  const { data, loading } = useQuery(GET_PLAYERBYID);
  const player = loading ? null : data.player;
  const winRate =
    !loading && ((player.winCount * 100) / player.matchCount).toFixed(2);
  return loading ? (
    <div></div>
  ) : (
    <section className="flex w-full flex-col gap-6 rounded-md bg-dark-secondary px-5 py-7">
      <div className="flex items-center justify-between">
        <div>
          <span
            className={`${winRate >= 50 ? "text-dark-win" : "text-dark-lose"}`}
          >
            {winRate}
          </span>
          <span> Win Rate</span>
        </div>
        <div>
          <span className="text-dark-win">{player.winCount}</span>
          <span> - </span>
          <span className="text-dark-lose">
            {player.matchCount - player.winCount}
          </span>
        </div>
      </div>
      <div className="relative flex h-2 justify-center overflow-hidden rounded-md bg-dark-primary">
        <div className="z-10 h-full w-0.5 bg-light-secondary"></div>
        <div
          style={{ width: `${winRate}%` }}
          className={`${
            winRate >= 50 ? "bg-dark-win" : "bg-dark-lose"
          } absolute left-0 h-full`}
        ></div>
      </div>
    </section>
  );
};

export default WinRate;
