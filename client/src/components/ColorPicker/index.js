import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
import { Animated } from "react-animated-css";
import { GetColorName } from "hex-color-to-color-name";

import {
	initSocket,
	disconnectSocket,
	sendColor,
	subscribeToColor,
} from "../../sockerService";

import styles from "./styles.module.css";

function ColorPicker() {
	const [color, setColor] = useState("#aabbcc");
	const [sendedColor, setSendedColor] = useState("");
	const [alertIsVisable, setAlertIsVisable] = useState(false);
	const [triger, setTriger] = useState("");

	useEffect(() => {
		setTimeout(function () {
			setAlertIsVisable(false);
		}, 5000);
	}, [sendedColor]);

	useEffect(() => {
		initSocket();
		subscribeToColor((recievedColor) => {
			setColor(recievedColor);
			setTriger(recievedColor);
		});
		return () => disconnectSocket();
	}, []);

	useEffect(() => {
		setSendedColor(triger);
		setAlertIsVisable(true);

		return () => setAlertIsVisable(false);
	}, [triger]);

	const handleSendColor = () => {
		setSendedColor(color);
		sendColor(color);
		setAlertIsVisable(true);
	};

	return (
		<div
			className={styles.colorPicker}
			style={{
				backgroundColor: `${color}`,
			}}
		>
			{
				// eslint-disable-next-line
				alertIsVisable && !sendedColor.length == 0 && (
					<>
						<Animated animationIn="flash">
							<h2>
								Sayfa rengi "{GetColorName(sendedColor)}" olarak güncellendi
							</h2>
						</Animated>
					</>
				)
			}
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
