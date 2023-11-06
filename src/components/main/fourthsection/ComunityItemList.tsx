import ComunituItem from "./ComunityItem";

const ComunityItemList = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3  place-items-center mx-auto mb-32 ">
			<ComunituItem />
			<ComunituItem />
			<ComunituItem />
		</div>
	);
};

export default ComunityItemList;
