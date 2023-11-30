import { atom } from "recoil";

export const notification = atom<number>({
	key: "notification",
	default: 0,
});

export const notificationEmitterId = atom<string>({
	key: "notificationEmitterId",
	default: "",
});
