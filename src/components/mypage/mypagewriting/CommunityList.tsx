import CommunityItem from "./CommunityItem";

const CommunityList = () => {
	return (
		<div className="mt-10 mb-20">
			{/* <div>커뮤니티</div> */}
			<div className="grid lg:grid-cols-2 md:grid-cols-1  mx-auto lg:w-[60rem] md:w-[40rem] w-[20rem]">
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
				<CommunityItem />
			</div>
		</div>
	);
};

export default CommunityList;
