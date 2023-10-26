import { ITabs } from "@/types/community";
import { atom } from "recoil";

const INITAIL_VALUE: ITabs = {
	key: "all",
	tabName: "전체",
};

export const communityTabState = atom<ITabs>({
	key: "communityTab",
	default: INITAIL_VALUE,
});
