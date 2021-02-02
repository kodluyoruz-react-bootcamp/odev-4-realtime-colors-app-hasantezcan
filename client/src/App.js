import ColorPicker from "./components/ColorPicker/index";

import styles from "./App.module.css";

function App() {
	return (
		<div className={styles.App}>
			<h1>Socket Color App</h1>
			<ColorPicker />
			<p>
				Made by <a href="https://github.com/hasantezcan"> Hasan Tezcan</a> click
				for{" "}
				<a href="https://github.com/kodluyoruz-react-bootcamp/odev-4-realtime-colors-app-hasantezcan">
					github repository
				</a>
			</p>
		</div>
	);
}

export default App;
