import React, { useState } from "react";
import PlayerHeader from "./PlayerHeader";
import { gql, useQuery } from "@apollo/client";

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
    </main>
  );
};

export default Player;
