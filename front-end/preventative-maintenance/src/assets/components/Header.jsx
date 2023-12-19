import "./Header.css";

function Header(props) {
	return (
		<div className={props.size === "short" ? "header short" : "header"}>
			{props.size === "short" ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 100 624 408"
					fill="none"
					opacity=".7">
					<path d="M0 0H624V270L0 408V0Z" fill="#0C7C59" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 624 408"
					fill="none"
					opacity=".7">
					<path d="M0 0H624V270L0 408V0Z" fill="#0C7C59" />
				</svg>
			)}

			<div
				className={props.size === "short" ? "headerText left" : "headerText"}>
				<h1 className="whiteText">{props.text}</h1>
			</div>
		</div>
	);
}
export default Header;
