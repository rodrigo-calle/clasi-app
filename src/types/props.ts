import { Timestamp } from "firebase/firestore";

export type HitoricCardProps = {
  id: string;
  createdAt: Timestamp["nanoseconds"];
  finishedAt: Timestamp["nanoseconds"] | null;
};

export enum IconType {
  camera = "camera",
  image = "image",
  video = "video",
  forward = "forward",
  back = "back",
  retweet = "retweet",
  check = "check",
  play = "controller-play",
  stop = "controller-stop",
}

export type CameraButtonProps = {
  title: string;
  onPress: () => void;
  icon: IconType;
  color?: string;
};

export type LoadingProp = {
  text: string | undefined | null;
  open: boolean;
};
