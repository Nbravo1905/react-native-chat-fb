import { Timestamp } from "firebase/firestore";

export const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const getRoomId = (user1: string, user2: string) => {
  const sortedIds = [user1, user2].sort();
  const roomId = sortedIds.join('-');
  return roomId;
};

export const formatTimestampToTime = (time: Timestamp) => {
  const date = new Date(time.seconds * 1000 + Math.floor(time.nanoseconds / 1e6));
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}