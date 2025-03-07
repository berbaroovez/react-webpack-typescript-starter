import * as React from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { Player } from "../../utils/types";
import { motion, AnimatePresence } from "framer-motion";
interface Props {
  socketState: Socket;
  playerList: Player[];
  room: string;
  setDrinkOrGive: React.Dispatch<
    React.SetStateAction<"give" | "drink" | "waitingForAnswer">
  >;
}

const GiveDrinkModal = ({
  socketState,
  playerList,
  room,
  setDrinkOrGive,
}: Props) => {
  const giveOutDrink = (player: Player) => {
    socketState.emit("giveOutDrink", { player, room });
    setTimeout(() => {
      socketState?.emit("update_whose_turn_it_is", { room: room });
      setDrinkOrGive("waitingForAnswer");
    }, 1000);
  };

  return (
    <DrinkZone
      initial={{
        scale: 0.8,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{ duration: 0.4, ease: "linear" }}
    >
      Click A player to make them drink!
      {playerList.map((player, index) => {
        return (
          <PlayerName
            onClick={() => {
              giveOutDrink(player);
            }}
          >
            {player.name}
          </PlayerName>
        );
      })}
    </DrinkZone>
  );
};

const DrinkZone = styled(motion.div)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #a02121;
  color: white;
  padding: 10px;
  border-radius: 10px;
`;

const PlayerName = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  &:hover {
    background-color: #a04141;
    cursor: pointer;
  }
`;
export default GiveDrinkModal;
