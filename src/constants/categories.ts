import { IElement } from "../types/categoty";

interface ICategories {
	readonly [key: string]: IElement[];
}

export const categories: ICategories = {
	all: [
		{
			key: "all",
			categoryName: "카테고리 전체",
		},
	],
	Occupation: [
		{
			key: "HRGAL",
			categoryName: "인사/총무/노무",
		},
		{
			key: "MMD",
			categoryName: "마케팅/MD",
		},
		{
			key: "PRCSR",
			categoryName: "홍보/CSR",
		},
		{
			key: "SALES",
			categoryName: "영업/영업관리",
		},
		{
			key: "AFF",
			categoryName: "회계/재무/금융",
		},
		{
			key: "IS",
			categoryName: "해외영업",
		},
		{
			key: "DTP",
			categoryName: "유통/무역/구매",
		},
		{
			key: "SP",
			categoryName: "전략/기획",
		},
		{
			key: "CGO",
			categoryName: "공사/공기업",
		},
		{
			key: "ITD",
			categoryName: "IT개발/데이터",
		},
		{
			key: "UIUX",
			categoryName: "서비스기획/UI,UX",
		},
		{
			key: "DA",
			categoryName: "디자인/예술",
		},
		{
			key: "MEDIA",
			categoryName: "미디어",
		},
		{
			key: "SERVICE",
			categoryName: "서비스",
		},
		{
			key: "RD",
			categoryName: "연구/설계",
		},
		{
			key: "SPECIAL",
			categoryName: "전문/특수",
		},
		{
			key: "EDU",
			categoryName: "교육/상담/컨설팅",
		},
	],
	Career: [
		{
			key: "IE",
			categoryName: "해외취업",
		},
		{
			key: "JD",
			categoryName: "직무",
		},
		{
			key: "CAREER",
			categoryName: "진로",
		},
		{
			key: "SPEC",
			categoryName: "스펙",
		},
		{
			key: "FL",
			categoryName: "외국어",
		},
		{
			key: "PS",
			categoryName: "자소서",
		},
		{
			key: "JI",
			categoryName: "면접",
		},
		{
			key: "CL",
			categoryName: "회사생활",
		},
		{
			key: "SU",
			categoryName: "창업",
		},
		{
			key: "JC",
			categoryName: "이직",
		},
		{
			key: "ETC",
			categoryName: "기타",
		},
	],
};
