import React, { useState } from "react";
import PlayerHeader from "./PlayerHeader";
import { gql, useQuery } from "@apollo/client";
import WinRate from "./WinRate";
import MatchCount from "./MatchCount";
import PlayerMatches from "./PlayerMatches";

const Player = ({ playerID }) => {
  const GET_PLAYERBYID = gql`
query {
  player(steamAccountId: ${playerID}) {
    matchCount
    winCount
    firstMatchDate
    team {
      team {
        id
        name
        logo
      }
    }
    matches(request: { take: 10 }) {
      id
    }
    heroesPerformance(take: 5, request: { orderBy: ASC }) {
      winCount
      kDA
      matchCount
      hero {
        id
        shortName
        displayName
      }
    }
    steamAccount {
      id
      name
      avatar
      isDotaPlusSubscriber
      seasonRank
      seasonLeaderboardRank
      activity {
        activity
      }

      guild {
        guild {
          name
          tag
        }
      }
      proSteamAccount {
        name
        realName
        isPro
        totalEarnings
        position
      }
    }
  }
}
`;

  return (
    <main className="bg-dark-primary text-dark-content">
      <PlayerHeader playerID={playerID} />
      <section className="w-full">
        <div className="container m-auto flex flex-col justify-between gap-5 p-6 xl:flex-row">
          <div className="flex w-full flex-col gap-5 xl:w-2/3">
            <div className="flex flex-col gap-5 xl:flex-row">
              <MatchCount playerID={playerID} />
              <WinRate playerID={playerID} />
            </div>
            <PlayerMatches playerID={playerID} />
          </div>
          <div className="flex w-full shrink flex-col gap-5 xl:w-1/3">
            <div className="h-2/3 w-full bg-dark-secondary"></div>
            <div className="h-1/3 w-full bg-dark-secondary"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Player;
