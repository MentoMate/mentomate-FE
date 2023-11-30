import { ICommunityItem } from "./community";
import { IMentorItem } from "./mainPageMentor";
import { IMentoringCard } from "./mainPageMentoringCard";

export interface IMentoringCardInProps {
	readonly data: IMentoringCard[];
}

export interface ICommunityItemInProps {
	readonly data: ICommunityItem[];
}

export interface IMentorItemInProps {
	readonly data: IMentorItem[];
}
