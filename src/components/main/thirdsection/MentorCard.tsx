import { ReactComponent as Star } from "@/assets/svg/star.svg";


const MentorCard = (props: any) => {
	return (
		<div className="flex justify-between items-center  p-4 lg:w-[20rem] md:w-[20rem] ">
			<div className=" shadow-md h-full rounded-2xl border border-[#E5E5E5]">
				<img
					className="rounded-t-lg h-[15rem] w-[15rem] lg:w-[15rem]"
					src={props.src}
					alt="card image"
				/>
				<div className=" p-4 w-[15rem] ">
					<h2 className="text-base font-medium ">
						<div className="flex justify-center items-center  ">
							<div className="flex justify-center items-center mb-2">
                <Star width={25} height={25}/>
								<span>4.9</span>
							</div>

							<span className="text-ex ml-4 mr-2 mb-2">{props.name}</span>
						</div>
					</h2>
					<div className="font-bold mb-2">{props.detail}</div>
		
			
				</div>
			</div>
		</div>
	);
};

export default MentorCard;
