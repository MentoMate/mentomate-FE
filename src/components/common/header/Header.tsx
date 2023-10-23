import HeaderLeftContainer from "./headerLeft/HeaderLeftContainer";
import HeaderRightContainer from "./headerRight/HeaderRightContainer";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import Toggle from "./toggle/Toggle";

const Header = () => {
	const [isUseToggle, setIsUseToggle] = useState<boolean>(false);

	const headerRef = useRef<HTMLDivElement>(null);

	const resizeHeaderHandler = () => {
		if (headerRef.current) {
			headerRef.current.offsetWidth < 768
				? setIsUseToggle(true)
				: setIsUseToggle(false);
		}
	};

	useLayoutEffect(() => {
		resizeHeaderHandler();
	}, []);

	useEffect(() => {
		window.addEventListener("resize", resizeHeaderHandler);

		return () => {
			window.addEventListener("resize", resizeHeaderHandler);
		};
	});

	return (
		<>
			<header className="sticky top-0 border-b border-b-[#e5e5e5]">
				<div
					className="flex justify-between items-center mx-auto lg:w-[60rem] md:w-[45rem] py-4"
					ref={headerRef}
				>
					{isUseToggle ? (
						<Toggle />
					) : (
						<>
							<HeaderLeftContainer />
							<HeaderRightContainer />
						</>
					)}
				</div>
			</header>
		</>
	);
};

export default Header;
