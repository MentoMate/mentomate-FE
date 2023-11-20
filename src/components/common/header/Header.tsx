import {
	Suspense,
	lazy,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

const HeaderLeftContainer = lazy(
	() => import("./headerLeft/HeaderLeftContainer"),
);
const HeaderRightContainer = lazy(
	() => import("./headerRight/HeaderRightContainer"),
);
const Toggle = lazy(() => import("./toggle/Toggle"));

console.log("asd");

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
			<header className="sticky top-0 w-full h-16 bg-white border-b border-b-black-200 z-[99]">
				<div
					className="flex justify-between items-center mx-auto py-4 lg:w-[60rem] md:w-[45rem] h-16"
					ref={headerRef}
				>
					<Suspense fallback="">
						{isUseToggle ? (
							<Toggle />
						) : (
							<>
								<HeaderLeftContainer />
								<HeaderRightContainer />
							</>
						)}
					</Suspense>
				</div>
			</header>
		</>
	);
};

export default Header;
