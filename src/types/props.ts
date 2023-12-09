import { Timestamp } from "firebase/firestore";

export type HitoricCardProps = {
  code: string;
  createdAt: Timestamp;
  finishedAt: Timestamp;
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
