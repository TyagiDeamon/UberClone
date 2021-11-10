import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken =
	"pk.eyJ1Ijoia2FyYW50eWFnaSIsImEiOiJja3ZxYzh2dmVhaHB1MzBzN2hraGYwdmE0In0.f9yixYME3J5FeeXpw-CLJA";

const Map = (props) => {
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: "map",
			style: "mapbox://styles/mapbox/outdoors-v11",
			// style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
			center: [75.8366318, 25.1389012],
			zoom: 5,
		});

		if (props.pickup.length != 0) {
			addCoordinates(map, props.pickup);
		}

		if (props.dropoff.length != 0) {
			addCoordinates(map, props.dropoff);
		}

		if (props.pickup.length != 0 && props.dropoff.length != 0) {
			map.fitBounds([props.pickup, props.dropoff], {
				padding: 60
			});
		}
	}, [props.pickup, props.dropoff]);

	const addCoordinates = (map, coordinates) => {
		const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
	};

	return <Wrapper id="map"></Wrapper>;
};

export default Map;

const Wrapper = tw.div`
  flex-1 h-1/2
`;
