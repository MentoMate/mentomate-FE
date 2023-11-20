import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryList from "./CategoryList";
import SelectCategoryType from "./SelectCategoryType";
import TitleBarWithClose from "./TitleBarWithClose";
import { useRef, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { cancelLockScroll } from "@/utils/controlBodyScroll";
console.log("asd");
const CategoryModal = () => {
	const categoryModalRef = useRef<HTMLDivElement>(null);
	const setOpenCategoryModalState = useSetRecoilState(openCategoryModalState);

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (
				categoryModalRef.current &&
				!categoryModalRef.current.contains(e.target as Node)
			) {
				cancelLockScroll();
				setOpenCategoryModalState(false);
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [categoryModalRef]);

	return (
		<div className="flex justify-center fixed bottom-0 w-full h-full bg-[rgba(229,229,229,0.5)] overflow-auto z-[100]">
			<div
				ref={categoryModalRef}
				className="fixed top-32 w-full sm:w-[30rem] h-[40rem] bg-white"
			>
				<div className="mx-10">
					<TitleBarWithClose />
					<SelectCategoryType />
					<CategoryList />
				</div>
			</div>
		</div>
	);
};

export default CategoryModal;
