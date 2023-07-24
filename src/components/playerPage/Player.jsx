import React, { useState } from "react";
import PlayerHeader from "./PlayerHeader";
import { gql, useQuery } from "@apollo/client";
import WinRate from "./WinRate";
import MatchCount from "./MatchCount";

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
        <div className="container m-auto flex flex-col justify-between gap-5 p-6 lg:flex-row">
          <MatchCount playerID={playerID} />
          <WinRate playerID={playerID} />
        </div>
      </section>
    </main>
  );
};

export default Player;
