import { ReactComponent as YesCheckMark } from "@assets/svg/yesCheck.svg";

interface IProps {
	readonly message: string;
}

const SuccessAuthenticationMsg = ({ message }: IProps) => {
	return (
		<>
			<p className="flex items-center text-[0.8rem] text-green-100">
				<YesCheckMark width={10} height={10} className="mr-1" />
				{message}
			</p>
		</>
	);
};

export default SuccessAuthenticationMsg;
