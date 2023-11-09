import { ReactComponent as Arrow } from "@assets/svg/mainarrow.svg";
import { Link } from "react-router-dom";

const SecondSection = () => {
	return (
		<>
			<div className="flex flex-col justify-center items-center mx-auto lg:w-[60rem] mt-40 mb-32">
				<div className="font-bold lg:ml-5 mx-auto text-xl sm:text-2xl font-bold">
					멘토를 등록해보세요
				</div>

				<div className="flex justify-center items-center mx-auto  lg:w-[60rem] md:w-[45rem] mt-20">
					<img
						className=" lg:w-[20rem] md:w-[20rem] ml-16 hidden lg:block "
						src="https://www.robertwalters.co.kr/content/dam/robert-walters/country/japan/images/website-update-2019/mentor-system.jpg"
						alt="card image"
					/>
					<div className="flex flex-col justify-center items-center mx-auto">
						<div className="flex justify-center text-center mx-auto text-xs lg:text-3xl font-bold lg:w-[25rem]  mb-16 ">
							지금 멘토가 되어 경험을 나누고 수익을 창출해보세요.
						</div>
						<Link to={"/mentorRegistration"}>
							<div className="text-center font-bold lg:text-3xl text-[#ABDEE6] ">
								<div className="flex justify-center items-center ">
									<div className="mr-2 ">멘토 등록하러 가기</div>
									<Arrow width={20} height={20} />
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default SecondSection;
