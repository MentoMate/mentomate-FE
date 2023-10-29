interface IErrorMsgProps {
	readonly message: string | undefined;
}

const ErrorMsg = ({ message }: IErrorMsgProps) => {
	return (
		<>
			<p className="text-[0.8rem] text-red-100">{message}</p>
		</>
	);
};

export default ErrorMsg;
