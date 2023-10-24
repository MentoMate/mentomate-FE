import { ReactComponent as Github } from "@assets/svg/github-mark.svg";
import { ReactComponent as Logo } from "@assets/svg/Logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<>
			<footer className="flex flex-col items-center w-full py-12 bg-main-color text-white font-medium">
				<div className="flex justify-center items-center">
					<a
						href="https://github.com/MentoMate"
						target="_blank"
						rel="noreferrer noopener"
						className="mx-2"
					>
						<Github />
					</a>
					<Link to={"/"} className="mx-2">
						<Logo width={150} height={50} />
					</Link>
				</div>
				<p className="mt-4 text-lg font-bold">
					Copyright 2023 Ⓒ MentoMate Team All Rights Reserved.
				</p>
			</footer>
		</>
	);
};

export default Footer;
