function TextButton({
	label,
	state,
	onClickFunction,
	style,
	width,
	height
}) {
    
	return (
		<button
            style={{width:width, height:height}}
            className= {`TextButton ${style} ${state}`}
			onClick={() => {
				try {
					onClickFunction();
				} catch (e) {}
			}}>
			{label}
		</button>
	);
}

export default TextButton;