import React from "react";
import { useParams } from "react-router-dom";
import Player from "../components/playerPage/Player";

const PlayerPage = () => {
  const params = useParams();
  const playerID = params.id;

  return <Player playerID={playerID} />;
};

export default PlayerPage;
