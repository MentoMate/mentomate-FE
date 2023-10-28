interface IProps {
	message: string | undefined;
}

const ErrorMsg = ({ message }: IProps) => {
	return (
		<>
			<p className="text-sm text-red-100">{message}</p>
		</>
	);
};

export default ErrorMsg;
