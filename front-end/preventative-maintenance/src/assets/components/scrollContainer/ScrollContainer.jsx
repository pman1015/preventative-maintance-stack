import React from "react";
import {ScrollMenu, VisibilityContext} from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./ScrollContainer.css";
const getItems = () =>
	Array(20)
		.fill(0)
		.map((_, ind) => ({id: `element-${ind}`}));

function ScrollContainer() {
	const [items, setItems] = React.useState(getItems);
	const [selected, setSelected] = React.useState([]);
	const [position, setPosition] = React.useState(0);

	const isItemSelected = (id) => !!selected.find((el) => el === id);

	const handleClick =
		(id) =>
		({getItemById, scrollToItem}) => {
			const itemSelected = isItemSelected(id);

			setSelected((currentSelected) =>
				itemSelected
					? currentSelected.filter((el) => el !== id)
					: currentSelected.concat(id)
			);
		};

	return (
		<ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
			{items.map(({id}) => (
				<Card
					itemId={id} // NOTE: itemId is required for track items
					title={id}
					key={id}
					onClick={handleClick(id)}
					selected={isItemSelected(id)}
				/>
			))}
		</ScrollMenu>
	);
}

function LeftArrow() {
	const {isFirstItemVisible, scrollPrev} = React.useContext(VisibilityContext);

	return (
		<div disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
			<svg width="32" height="50" viewBox="0 0 32 50" fill="none">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M9.90533 24.9584L24.9147 3.54167C25.4387 2.72917 25.4387 1.396 24.9147 0.583496C24.3907 -0.229004 23.54 -0.229004 23.0174 0.583496L7.0427 23.375C6.76404 23.8125 6.644 24.3959 6.664 24.9584C6.644 25.5417 6.76404 26.1251 7.0427 26.5626L23.0174 49.3541C23.54 50.1666 24.3907 50.1666 24.9147 49.3541C25.4387 48.5208 25.4387 47.2085 24.9147 46.396L9.90533 24.9584Z"
					fill="black"
				/>
			</svg>
		</div>
	);
}

function RightArrow() {
	const {isLastItemVisible, scrollNext} = React.useContext(VisibilityContext);

	return (
		<div disabled={isLastItemVisible} onClick={() => scrollNext()}>
			<svg width="32" height="50" viewBox="0 0 32 50" fill="none">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M24.956 23.375L8.94667 0.583496C8.42134 -0.229004 7.57067 -0.229004 7.044 0.583496C6.52 1.396 6.52 2.72917 7.044 3.54167L22.088 24.9584L7.044 46.396C6.52 47.2085 6.52 48.5208 7.044 49.3541C7.57067 50.1666 8.42134 50.1666 8.94667 49.3541L24.956 26.5626C25.236 26.1251 25.356 25.5417 25.3373 24.9584C25.356 24.3959 25.236 23.8125 24.956 23.375Z"
					fill="black"
				/>
			</svg>
		</div>
	);
}

function Card({onClick, selected, title, itemId}) {
	const visibility = React.useContext(VisibilityContext);

	return (
		<div
			onClick={() => onClick(visibility)}
			style={{
				width: "160px",
			}}
			tabIndex={0}>
			<div className="card upcomming-work-card">
				<div>{title}</div>
				<div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
				<div>selected: {JSON.stringify(!!selected)}</div>
			</div>
			<div />
		</div>
	);
}

export default ScrollContainer;
