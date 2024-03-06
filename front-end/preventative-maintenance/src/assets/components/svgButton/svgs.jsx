
function GetSVGByName(name, height, width, color) {
	switch (name) {
		case "minusCircle":
			return MinusCircle(height, width, color);
		case "plusCircle":
			return PlusCircle(height, width, color);
		case "pencil":
			return Pencil(height, width, color);
		case "save":
			return Save(height, width, color);
		default:
			return <></>;
	}
}
export default GetSVGByName;

//SVG consts
const MinusCircle = (height, width, color) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6 9h6m4.5 0a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
				stroke={typeof color === "undefined" ? "#fff" : color}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

const PlusCircle = (height, width, color) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6 9H12M9 6V12M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
				stroke={typeof color === "undefined" ? "#fff" : color}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

const Pencil = (height, width, color) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="-2 -2 24 24"
			fill="none">
			<g clip-path="url(#clip0_58_220)">
				<path
					d="M4.16663 7.49992L7.49996 4.16658M2.49988 5.83325C2.24907 5.62102 2.04493 5.35849 1.90045 5.06241C1.75597 4.76632 1.67433 4.44317 1.66072 4.11355C1.64712 3.78393 1.70186 3.45507 1.82145 3.14793C1.94104 2.84079 2.12286 2.56212 2.35531 2.32966C2.58777 2.09721 2.86576 1.91607 3.17158 1.7978C3.4774 1.67953 3.80433 1.62673 4.13153 1.64274C4.45873 1.65876 4.77903 1.74325 5.07202 1.89084C5.365 2.03842 5.62424 2.24585 5.83321 2.49992L17.0832 13.7499L18.3332 18.3333L13.7499 17.0833L2.49988 5.83325Z"
					stroke={typeof color === "undefined" ? "#fff" : color}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</g>
		</svg>
	);
};

const Save = (height, width, color) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M17 21V13H7V21M7 3V8H15M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
				stroke={typeof color === "undefined" ? "#fff" : color}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};
