import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "../components/Map";
import RideSelector from "../components/RideSelector";
import { useRouter } from "next/router";
import Link from "next/link";

const Confirm = () => {
	const router = useRouter();
	const { pickupString, dropoffString } = router.query;

	const [pickup, setPickup] = useState([0, 0]);
	const [dropoff, setDropoff] = useState([0, 0]);

	const getPickup = (pickupString) => {
		fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickupString}.json?` +
				new URLSearchParams({
					access_token:
						"pk.eyJ1Ijoia2FyYW50eWFnaSIsImEiOiJja3ZxYzh2dmVhaHB1MzBzN2hraGYwdmE0In0.f9yixYME3J5FeeXpw-CLJA",
					limit: 1,
				})
		)
			.then((response) => response.json())
			.then((data) => {
				setPickup(data.features[0].center);
			});
	};

	const getDropoff = (dropoffString) => {
		fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoffString}.json?` +
				new URLSearchParams({
					access_token:
						"pk.eyJ1Ijoia2FyYW50eWFnaSIsImEiOiJja3ZxYzh2dmVhaHB1MzBzN2hraGYwdmE0In0.f9yixYME3J5FeeXpw-CLJA",
					limit: 1,
				})
		)
			.then((response) => response.json())
			.then((data) => {
				setDropoff(data.features[0].center);
			});
	};

	useEffect(() => {
		getPickup(pickupString);
		getDropoff(dropoffString);
	}, [pickupString, dropoffString]);

	return (
		<Wrapper>
			<BackButtonContainer>
				<Link href="/search">
					<BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
				</Link>
			</BackButtonContainer>
			<Map pickup={pickup} dropoff={dropoff} />
			<RideContainer>
				<RideSelector pickup={pickup} dropoff={dropoff} />
				<ButtonContainer>
					<ConfirmButton>Confirm Ride</ConfirmButton>
				</ButtonContainer>
			</RideContainer>
		</Wrapper>
	);
};

export default Confirm;

const Wrapper = tw.div`
  flex flex-col h-screen z-0
`;
const BackButtonContainer = tw.div`
	bg-white h-10 w-10 rounded-full absolute flex justify-center items-center z-10 ml-2 mt-2 shadow-md
`;
const BackButton = tw.img`
	cursor-pointer
`;
const RideContainer = tw.div`
  flex flex-1 flex-col h-1/2
`;
const ButtonContainer = tw.div`
  border-t-2
`;
const ConfirmButton = tw.div`
	bg-black text-white my-4 mx-4 py-4 text-center text-lg rounded-lg cursor-pointer hover:bg-gray-900 transition
`;
