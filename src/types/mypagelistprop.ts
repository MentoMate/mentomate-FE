type MyPageItem = {
	readonly label: string;
	readonly icon: React.ReactNode; // 이 부분을 알맞게 지정하세요.
};
export interface ImyPageListProps {
	myPageItems: MyPageItem[]; // myPageItems의 타입을 지정합니다.
	selectedItemIndex: number;
	setSelectedItemIndex: (index: number) => void;
}
