import { getCookie } from "@/utils/cookies";
import { atom } from "recoil";

export const loginState = atom({
	key: "loginState",
	default: getCookie("accessToken") !== undefined ? true : false,
});
