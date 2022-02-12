import {AppProps} from "next/app";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "../public/fonts/index.css";
import "../styles/scss/global.scss";
import "../styles/scss/home.scss";
import "../styles/scss/auth.scss";
import "../styles/scss/exploring.scss";

function App(props: AppProps): JSX.Element {
	const {Component, pageProps} = props;
	return <Component {...pageProps} />;
}

export default App;
