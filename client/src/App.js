import ColorPicker from "./components/ColorPicker/index";

import styles from "./App.module.css";

function App() {
	return (
		<div className={styles.App}>
			<h1>Socket Color App</h1>
			<ColorPicker />
		</div>
	);
}

export default App;
