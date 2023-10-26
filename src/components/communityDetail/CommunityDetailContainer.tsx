import CommentContainer from "./comment/CommentContainer";
import CommunityContent from "./CommunityContent";
import CommunityLikeAndComment from "./CommunityLikeAndComment";
import CommunitySideBar from "./CommunitySideBar";
import CommunityWriterInfo from "./CommunityWriterInfo";

const CommunityDetailContainer = () => {
	return (
		<div className="flex lg:w-[60rem] md:w-[40rem] sm:w-[30rem] w-[15rem] mx-auto my-20">
			<div className="lg:w-[50rem] md:w-[30rem] sm:w-[20rem] w-[17rem]">
				<div className="md:text-3xl text-xl font-bold">
					코딩 해볼려고 하는데 난이도 어떤가요 ?
				</div>
				<CommunityWriterInfo />
				<CommunityContent />
				<CommunityLikeAndComment />
				<CommentContainer />
			</div>
			<CommunitySideBar />
		</div>
	);
};

export default CommunityDetailContainer;
