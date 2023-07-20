import React from "react";
import { useParams } from "react-router-dom";
import Player from "../components/playerPage/Player";

const PlayerPage = () => {
  const params = useParams();
  const playerID = params.id;
  console.log(playerID);
  return <Player playerID={playerID} />;
};

export default PlayerPage;
