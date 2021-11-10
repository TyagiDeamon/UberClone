import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";

const RideSelector = ({ pickup, dropoff }) => {
	const [rideDuration, setrideDuration] = useState(0);

	useEffect(() => {
		fetch(
			`https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${dropoff[0]},${dropoff[1]}?access_token=pk.eyJ1Ijoia2FyYW50eWFnaSIsImEiOiJja3ZxYzh2dmVhaHB1MzBzN2hraGYwdmE0In0.f9yixYME3J5FeeXpw-CLJA`
		)
			.then((res) => res.json())
			.then((data) => setrideDuration(data.routes[0].duration / 100));
	}, [pickup, dropoff]);

	return (
		<Wrapper>
			<Title>Choose a ride, or swipe up for more</Title>
			<CarList>
				{carList.map((item, key) => {
					return (
						<Car key={key}>
							<CarImg src={item.imgUrl} />
							<CarDetails>
								<CarName>{item.service}</CarName>
								<Time>4 min away</Time>
							</CarDetails>
							<CarPrice>&#x20B9; {(rideDuration * item.multiplier).toFixed(2)}</CarPrice>
						</Car>
					);
				})}
			</CarList>
		</Wrapper>
	);
};

export default RideSelector;

const Wrapper = tw.div`
  flex-1 overflow-y-scroll flex flex-col
`;
const Title = tw.div`
  text-xs text-center text-gray-600 py-2 border-b
`;
const CarList = tw.div`
	overflow-y-scroll
`;
const Car = tw.div`
  flex p-4 items-center
`;
const CarImg = tw.img`
  h-14 mr-3
`;
const CarDetails = tw.div`
  flex-1
`;
const CarName = tw.div`
  font-medium
`;
const Time = tw.div`
  text-xs text-blue-600
`;
const CarPrice = tw.div`
  font-medium text-sm
`;
