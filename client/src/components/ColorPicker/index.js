import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";

import {
	initSocket,
	disconnectSocket,
	sendColor,
	subscribeToColor,
} from "../../sockerService";

import styles from "./styles.module.css";

function ColorPicker() {
    const [color, setColor] = useState("#aabbcc");
    const [isCahange, setIsCahange] = useState(false)

	useEffect(() => {
        console.log("PAGE COLOR IS", color);
        setIsCahange(true)
	}, [color]);

	useEffect(() => {
		initSocket();
		subscribeToColor((recievedColor) => setColor(recievedColor));
		return () => disconnectSocket();
	}, []);

	// const handleClick = () => {
	// 	console.log("clicked");
	// 	setDisplayColorPicker(!displayColorPicker);
	// };

	const handleSendColor = () => {
		sendColor(color);
	};

	return (
		<div
			className={styles.colorPicker}
			style={{
				backgroundColor: `${color}`,
			}}
		>
			
			<h2>Select color</h2>
			<HexColorPicker color={color} onChange={setColor} />
			<button
				className={styles.setColoBbutton}
				onClick={() => {
					handleSendColor();
				}}
			>
				Set Color
			</button>
		</div>
	);
}

export default ColorPicker;
