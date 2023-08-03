"use client";
import { useState } from "react";
import usePartySocket from "partysocket/react";
import { RoomInfo, SINGLETON_ROOM_ID } from "@/party/chatRooms";
import RoomCard from "./RoomCard";
import ConnectionStatus from "../components/ConnectionStatus";

const host = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;

export const RoomList: React.FC<{ initialRooms: RoomInfo[] }> = ({
  initialRooms,
}) => {
  // render with initial data, update from websocket as messages arrive
  const [rooms, setRooms] = useState(initialRooms);

  const socket = usePartySocket({
    host,
    party: "chatrooms",
    room: SINGLETON_ROOM_ID,
    onMessage(event: MessageEvent<string>) {
      setRooms(JSON.parse(event.data) as RoomInfo[]);
    },
  });

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </ul>
      <ConnectionStatus socket={socket} />
    </>
  );
};
