import { ITabs } from "@/interface/community";
import { atom } from "recoil";

const INITIAL_VALUE: ITabs = {
	key: "all",
	tabName: "전체",
};

export const communityTabState = atom<ITabs>({
	key: "communityTab",
	default: INITIAL_VALUE,
});
