import React from "react";
import { gql, useQuery } from "@apollo/client";

const MatchCount = ({ playerID }) => {
  const GET_PLAYERBYID = gql`
    query {
      player(steamAccountId: ${playerID}) {
        matchCount
        firstMatchDate
      }
    }
  `;
  const { data, loading } = useQuery(GET_PLAYERBYID);
  const player = loading ? null : data.player;
  let firstMatchDate = new Date("1970-01-01T00:00Z");
  if (!loading) {
    firstMatchDate.setSeconds(
      firstMatchDate.getSeconds() + player.firstMatchDate,
    );
    firstMatchDate = firstMatchDate.toDateString();
  }
  const matchCountDens =
    !loading && Array.from(Array(Math.round(player.matchCount / 100)).keys());

  return loading ? (
    <div></div>
  ) : (
    <section className="flex w-full flex-col gap-6 rounded-md bg-dark-secondary px-5 py-7">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-dark-draw">{player.matchCount}</span>
          <span> Matches</span>
        </div>
        <div>
          First Match:{" "}
          <span className="text-dark-draw">{!loading && firstMatchDate}</span>
        </div>
      </div>
      <div className="relative flex h-2 justify-evenly overflow-hidden rounded-md bg-light-draw">
        {matchCountDens.map((item) => (
          <div
            key={item}
            className="z-10 h-full w-[1px] bg-light-secondary"
          ></div>
        ))}
      </div>
    </section>
  );
};

export default MatchCount;
