import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import LiveMatch from "./LiveMatch";
import LiveMatchSkeleton from "./LiveMatchSkeleton";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";

const GET_LIVEMATCHES = gql`
  query {
    live {
      matches(request: { isParsing: true, take: 20 }) {
        matchId
        gameTime
        gameMinute
        spectators
        radiantScore
        direScore
        radiantLead
        completed
        averageRank
        radiantTeam {
          id
          name
        }
        direTeam {
          id
          name
        }
        liveWinRateValues {
          time
          winRate
        }
        league {
          id
          tournamentUrl
          displayName
        }
        players {
          isRadiant
          steamAccount {
            id
            name
          }
          hero {
            shortName
          }
        }
      }
    }
  }
`;

const LiveMatches = () => {
  const { data, loading, error } = useQuery(GET_LIVEMATCHES);
  const matches = loading ? [] : data.live.matches;
  const [collapse, setCollapse] = useState(true);

  const skeletons = [0, 1, 2, 3, 4, 5];

  return (
    <div className="flex gap-2 bg-dark-primary p-2">
      <div
        onClick={() => setCollapse(!collapse)}
        className="flex cursor-pointer items-center rounded-md px-2 text-dark-heading transition-all duration-300 hover:bg-dark-secondary/40"
      >
        {collapse ? <BsArrowsExpand /> : <BsArrowsCollapse />}
      </div>
      <div className="flex w-full overflow-x-scroll scrollbar-none">
        <div className="flex w-fit gap-2">
          {loading
            ? skeletons.map((item) => {
                return <LiveMatchSkeleton key={item} />;
              })
            : matches.map((match) => {
                return (
                  <LiveMatch
                    key={match.matchId}
                    matchData={match}
                    collapse={collapse}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default LiveMatches;
