type MyPageItem = {
	readonly label: string;
	readonly icon: React.ReactNode;
};
export interface IMyPageListProps {
	myPageItems: MyPageItem[];
	selectedItemIndex: number;
	setSelectedItemIndex: (index: number) => void;
}
