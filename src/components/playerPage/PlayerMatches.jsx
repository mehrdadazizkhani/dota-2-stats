import React from "react";
import { gql, useQuery } from "@apollo/client";
import Position from "./Position";
import Award from "./Award";

const PlayerMatches = ({ playerID }) => {
  const matchNum = 15;
  const GET_PLAYERBYID = gql`
    query {
      player(steamAccountId: ${playerID}) {
        matches(request: { take: ${matchNum} }) {
          id
          durationSeconds
          startDateTime
          actualRank
          lobbyType
          bottomLaneOutcome
          midLaneOutcome
          topLaneOutcome
          league {
            id
            displayName
          }
          players(steamAccountId: ${playerID}) {
            kills
            deaths
            assists
            partyId
            lane
            position
            imp
            isVictory
            award
            hero {
              displayName
              shortName
            }
          }
        }
      }
    }
  `;
  const { data, loading } = useQuery(GET_PLAYERBYID);
  const matches = loading ? [] : data.player.matches;

  return (
    !loading && (
      <section className="overflow-hidden rounded-md bg-dark-content/10">
        <h1 className="bg-dark-secondary px-4 py-6 text-xl font-medium">
          Matches
        </h1>
        <div className="flex flex-col gap-[1px] overflow-x-auto">
          {matches.map((match, index) => (
            <a
              key={match.id}
              className={`flex h-12 cursor-pointer items-center justify-between bg-dark-secondary px-4 py-2 hover:bg-dark-primary/10`}
            >
              <div className="flex h-full shrink-0 items-center gap-3">
                <div className="sticky left-0 flex h-full shrink-0 items-center gap-2 bg-light-secondary px-2">
                  <img
                    title={match.players[0].hero.displayName}
                    src={`https://cdn.stratz.com/images/dota2/heroes/${match.players[0].hero.shortName}_horz.png`}
                    alt={match.players[0].hero.displayName}
                    className="hidden h-full rounded-sm xl:block"
                  />
                  <img
                    title={match.players[0].hero.displayName}
                    src={`https://cdn.stratz.com/images/dota2/heroes/${match.players[0].hero.shortName}_icon.png`}
                    alt={match.players[0].hero.displayName}
                    className="block xl:hidden"
                  />
                  <Position pos={match.players[0].position} />
                </div>
                <div className="h-4/5 w-[1px] bg-dark-content/10"></div>
                <span
                  className={`${
                    match.players[0].isVictory ? "bg-dark-win" : "bg-dark-lose"
                  } flex aspect-square h-2/3  items-center justify-center rounded-md font-bold text-dark-secondary`}
                >
                  {match.players[0].isVictory ? "W" : "L"}
                </span>
                <div className="h-4/5 w-[1px] bg-dark-content/10"></div>
                <div className="flex items-center gap-5">
                  <div
                    title="K/D/A"
                    className="flex w-20 justify-center gap-1 text-xs"
                  >
                    <span className="text-dark-heading">
                      {match.players[0].kills}
                    </span>
                    <span>/</span>
                    <span className="text-dark-heading">
                      {match.players[0].deaths}
                    </span>
                    <span>/</span>
                    <span className="text-dark-heading">
                      {match.players[0].assists}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex aspect-square w-7 items-center justify-center">
                      {match.players[0].imp > 0
                        ? "+" + match.players[0].imp
                        : match.players[0].imp}
                    </span>
                    <div
                      className={`relative flex h-2 w-28 overflow-hidden rounded-md bg-light-primary ${
                        match.players[0].imp > 0 && "flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`flex  ${
                          Math.abs(match.players[0].imp) > 25
                            ? match.players[0].imp > 0
                              ? "w-full flex-row-reverse"
                              : "w-full flex-row"
                            : match.players[0].imp > 0
                            ? "w-1/2 flex-row-reverse justify-end"
                            : "w-1/2 flex-row justify-end"
                        }`}
                      >
                        <div
                          style={{
                            width: `${
                              Math.abs(match.players[0].imp) > 25
                                ? Math.abs(match.players[0].imp) > 50
                                  ? 100
                                  : 50 +
                                    (Math.abs(match.players[0].imp) * 50) / 100
                                : (Math.abs(match.players[0].imp) * 100) / 25
                            }%`,
                          }}
                          className={`${
                            match.players[0].imp < 0
                              ? "bg-gradient-to-l from-dark-content/40 to-dark-content"
                              : "bg-gradient-to-r from-dark-chart2/60 to-dark-chart2"
                          } h-full w-9`}
                        ></div>
                        <div className="h-full w-0.5 bg-dark-heading"></div>
                      </div>
                    </div>
                    <Award award={match.players[0].award} />
                  </div>
                </div>
              </div>
              <div className="h-full w-20 shrink-0 ">sdf</div>
            </a>
          ))}
        </div>
      </section>
    )
  );
};

export default PlayerMatches;
