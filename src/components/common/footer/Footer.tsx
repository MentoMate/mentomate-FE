import { ReactComponent as Github } from "../../../assets/svg/github-mark.svg";
import { ReactComponent as Logo } from "../../../assets/svg/Logo.svg";

const Footer = () => {
	return (
		<>
			<footer className="flex flex-col items-center w-full py-12 bg-[#ABDEE6] text-white font-medium">
				<div className="flex justify-center items-center">
					<div className="mx-2">
						<Github />
					</div>
					<div className="mx-2">
						<Logo width={150} height={50} />
					</div>
				</div>
				<p className="mt-4 text-lg font-bold">
					Copyright 2023 Ⓒ MentoMate Team All Rights Reserved.
				</p>
			</footer>
		</>
	);
};

export default Footer;
