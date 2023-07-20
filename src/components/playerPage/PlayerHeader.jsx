import React from "react";
import { gql, useQuery } from "@apollo/client";
import PlayerHeaderSkeleton from "./PlayerHeaderSkeleton";
import bgImage from "../../assets/bg1.jpg";

const PlayerHeader = ({ playerID }) => {
  const GET_PLAYERBYID = gql`
    query {
      player(steamAccountId: ${playerID}) {
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
            team {
             id
             tag
            }
          }
        }
      }
    }
  `;
  const { data, loading } = useQuery(GET_PLAYERBYID);
  const player = loading ? null : data.player.steamAccount;
  const imortalType =
    player && player.seasonLeaderboardRank
      ? player.seasonLeaderboardRank <= 10
        ? "c"
        : "b"
      : "";

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-dark-primary py-10 md:py-4">
      <img
        className="absolute animate-pulse object-cover object-center opacity-40 blur-md"
        src={bgImage}
        alt="bg"
      />
      {player ? (
        <div className="container z-10 m-auto flex flex-col-reverse justify-between px-6 md:flex-row">
          <div className="relative flex w-full flex-col-reverse items-center md:flex-row">
            {player.proSteamAccount ? (
              <div>
                <img
                  src={`https://cdn.stratz.com/images/dota2/players/${player.id}.png`}
                  alt={player.name}
                  className="absolute w-24 translate-y-10 scale-150 rounded-md blur-lg  brightness-0 filter md:translate-y-4"
                />
                <img
                  src={`https://cdn.stratz.com/images/dota2/players/${player.id}.png`}
                  alt={player.name}
                  className="w-24 translate-y-10 rounded-md md:translate-y-4"
                />
              </div>
            ) : (
              <img
                src={player.avatar}
                alt={player.name}
                className="w-24 translate-y-6 rounded-md md:translate-y-0"
              />
            )}
            <div className="ml-3 flex translate-y-5 items-center md:translate-y-0">
              {player.proSteamAccount && (
                <svg
                  fill="#e85b45"
                  height="25"
                  viewBox="0 0 24 24"
                  className="sc-dkPtRN fbhZlp"
                >
                  <path d="M11.354,23.25L12.646,23.25C15.075,23.25 17.327,22.493 19.174,21.203C19.151,21.144 19.139,21.082 19.139,21.016C19.14,20.884 19.139,20.743 19.138,20.596C19.126,19.02 19.11,16.681 20.697,15.066C21.619,14.129 22.979,14.21 23.751,14.335L23.755,14.336C23.915,13.582 24,12.801 24,12C24,5.791 18.912,0.75 12.646,0.75L11.354,0.75C5.088,0.75 0,5.791 0,12C0,12.801 0.085,13.582 0.246,14.336L0.249,14.335C1.021,14.21 2.381,14.129 3.303,15.066C4.89,16.681 4.874,19.02 4.862,20.596C4.861,20.743 4.86,20.884 4.861,21.016C4.861,21.082 4.849,21.144 4.826,21.203C6.674,22.493 8.925,23.25 11.354,23.25ZM10.089,13.516L16.968,6.13C17.132,5.957 17.398,5.957 17.562,6.13L18.552,7.175C18.716,7.348 18.716,7.628 18.552,7.801L10.386,16.545C10.222,16.718 9.956,16.718 9.792,16.545L5.416,11.921C5.338,11.838 5.293,11.726 5.293,11.608C5.293,11.49 5.338,11.377 5.416,11.294L6.406,10.25C6.57,10.077 6.836,10.077 7,10.25L10.089,13.516Z"></path>
                </svg>
              )}
              {player.proSteamAccount && (
                <a
                  href=""
                  className="ml-3 text-3xl font-bold text-dark-content/50"
                >
                  {player.proSteamAccount.team.tag}.
                </a>
              )}
              <h2 className="text-3xl font-medium text-dark-heading">
                {player.proSteamAccount
                  ? player.proSteamAccount.name
                  : player.name}
              </h2>
              <span className="ml-3 text-dark-draw">
                {player.guild && `[${player.guild.guild.tag}]`}
              </span>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-2 md:w-fit md:gap-5">
            <img
              src="https://cdn.stratz.com/images/dota2/plus/logo.png"
              alt="dota plus"
              className={`${!player.isDotaPlusSubscriber && "hidden"} w-10`}
            />
            <div
              className={`${
                !player.isDotaPlusSubscriber && "hidden"
              } h-1/2 w-0.5 bg-light-secondary`}
            ></div>
            {player.seasonRank ? (
              <div className="relative flex aspect-square w-16 items-center justify-center">
                <div className="w-20">
                  <img
                    className="w-full"
                    src={`https://cdn.stratz.com/images/dota2/seasonal_rank/medal_${player.seasonRank
                      .toString()
                      .substring(0, 1)}${imortalType}.png`}
                    alt="medal"
                  />
                  {player.seasonLeaderboardRank && (
                    <span className="absolute bottom-0 z-20 flex w-16 -translate-y-1 justify-center text-[10px] font-bold text-dark-heading">
                      {player.seasonLeaderboardRank}
                    </span>
                  )}
                </div>
                {!imortalType && (
                  <img
                    className="absolute"
                    src={`https://cdn.stratz.com/images/dota2/seasonal_rank/star_${player.seasonRank
                      .toString()
                      .substring(1, 2)}.png`}
                    alt="stars"
                  />
                )}
              </div>
            ) : (
              <img
                className="w-20"
                src={`https://cdn.stratz.com/images/dota2/seasonal_rank/medal_0.png`}
                alt="medal"
              />
            )}
          </div>
        </div>
      ) : (
        <PlayerHeaderSkeleton />
      )}
    </section>
  );
};

export default PlayerHeader;
