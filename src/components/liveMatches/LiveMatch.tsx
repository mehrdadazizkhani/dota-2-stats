import React from "react";
import { FaSun, FaMoon, FaRegEye } from "react-icons/fa";
import { AreaChart, ResponsiveContainer, Area } from "recharts";
import { Link } from "react-router-dom";

const LiveMatch = ({ matchData, collapse }) => {
  const min = String(
    (matchData.gameTime - (matchData.gameTime % 60)) / 60,
  ).padStart(2, "0");
  const sec = String(matchData.gameTime % 60).padStart(2, "0");
  const isNight = ((+min - (+min % 5)) / 5) % 2 === 0 ? false : true;
  const winRateData = matchData.liveWinRateValues;

  return (
    <div className="group flex w-[350px] cursor-pointer flex-col items-center justify-between gap-2 rounded-md border-2 border-dark-secondary/90 bg-dark-secondary p-2 text-xs text-dark-heading transition-all duration-300 hover:bg-dark-secondary/30">
      <div className="relative flex w-full items-center justify-between gap-2 rounded-sm bg-dark-primary/50 p-2">
        <span
          className={`${
            matchData.completed
              ? "text-dark-lose"
              : "animate-pulse text-dark-win"
          } font-bold`}
        >
          {matchData.completed ? "Finished" : "Live"}
        </span>
        <div className="flex items-center gap-1">
          {matchData.gameTime > 0 &&
            (isNight ? (
              <FaSun className="text-dark-draw" />
            ) : (
              <FaMoon className="text-dark-win" />
            ))}
          <span>
            {matchData.gameTime < 0 ? "Upcoming" : min}
            {matchData.gameTime < 0 ? " Match" : `:${sec}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegEye className="text-dark-chart2" /> {matchData.spectators}
        </div>
        <div className="absolute left-0 hidden h-full w-full rounded-sm bg-light-secondary group-hover:flex">
          {matchData.league ? (
            <div className="flex w-full items-center justify-between px-4">
              <h1>{matchData.league.displayName}</h1>
              <img
                className="h-full"
                src={`https://cdn.stratz.com/images/dota2/leagues/${matchData.league.id}.png`}
                alt=""
              />
            </div>
          ) : (
            <div className="flex w-full items-center justify-between px-4">
              <span>Average MMR</span>
              <span>{matchData.averageRank}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="mr-1 flex aspect-square w-5 items-center justify-center rounded-sm bg-light-primary/50 p-0.5 text-[12px] font-bold text-dark-content">
            {matchData.radiantScore}
          </span>
          Radiant{" "}
          {matchData.radiantLead != 0 && matchData.radiantLead > 0 && (
            <div className="flex items-center gap-1 text-dark-draw">
              <span>+{(matchData.radiantLead / 1000).toFixed(1)}k</span>
              <img
                src="https://stratz.com/images/dota2/gold.png"
                alt="gold"
                className="w-3"
              />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {matchData.radiantTeam ? (
            <div className="flex items-center gap-2">
              <h1>{matchData.radiantTeam.name}</h1>
              <div className="flex w-10 items-center justify-center">
                <img
                  className="h-6"
                  src={`https://cdn.stratz.com/images/dota2/teams/${matchData.radiantTeam.id}.png`}
                  alt=""
                />
              </div>
            </div>
          ) : (
            matchData.players.map((player) => {
              return (
                player.isRadiant && (
                  <Link
                    key={player.steamAccount.id}
                    to={`/player/${player.steamAccount.id}`}
                  >
                    {matchData.gameMinute > 0 ? (
                      <img
                        title={player.steamAccount.name}
                        className="w-5"
                        src={`https://cdn.stratz.com/images/dota2/heroes/${player.hero.shortName}_icon.png`}
                        alt={player.steamAccount.name}
                      />
                    ) : (
                      <div
                        title={player.steamAccount.name}
                        className="aspect-square w-5 rounded-full bg-light-primary"
                      ></div>
                    )}
                  </Link>
                )
              );
            })
          )}
        </div>
      </div>
      <div
        className={`${
          collapse ? "hidden" : "flex"
        } relative h-20 w-full items-center justify-center`}
      >
        {matchData.gameMinute > 0 ? (
          <ResponsiveContainer aspect={undefined} height={100} className="z-10">
            <AreaChart data={winRateData}>
              <Area
                width={10}
                height={50}
                className=" stroke-dark-chart1"
                type="monotone"
                dataKey="winRate"
                stroke="stroke"
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <span className="animate-pulse text-dark-chart1">
            no data available
          </span>
        )}
        {matchData.gameMinute > 0 && (
          <div className="absolute h-[1px] w-full bg-light-primary"></div>
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="mr-1 flex aspect-square w-5 items-center justify-center rounded-sm bg-light-primary/50 p-0.5 text-[12px] font-bold text-dark-content">
            {matchData.direScore}
          </span>
          Dire{" "}
          {matchData.radiantLead < 0 && (
            <div className="flex items-center gap-1 text-dark-draw">
              <span>+{((matchData.radiantLead * -1) / 1000).toFixed(1)}k</span>
              <img
                src="https://stratz.com/images/dota2/gold.png"
                alt="gold"
                className="w-3"
              />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {matchData.direTeam ? (
            <div className="flex items-center gap-2">
              <h1>{matchData.direTeam.name}</h1>
              <div className="flex w-10 items-center justify-center">
                <img
                  className="h-6"
                  src={`https://cdn.stratz.com/images/dota2/teams/${matchData.direTeam.id}.png`}
                  alt=""
                />
              </div>
            </div>
          ) : (
            matchData.players.map((player) => {
              return (
                !player.isRadiant && (
                  <Link
                    key={player.steamAccount.id}
                    to={`/player/${player.steamAccount.id}`}
                  >
                    {matchData.gameMinute > 0 ? (
                      <img
                        title={player.steamAccount.name}
                        className="w-5"
                        src={`https://cdn.stratz.com/images/dota2/heroes/${player.hero.shortName}_icon.png`}
                        alt={player.steamAccount.name}
                      />
                    ) : (
                      <div
                        title={player.steamAccount.name}
                        className="aspect-square w-5 rounded-full bg-light-primary"
                      ></div>
                    )}
                  </Link>
                )
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveMatch;
