import {useEffect, useState} from "react";

function TextField({value, setValue, styleClass}) {
	const {fieldState, setFieldState} = useState(false);
	return (
		<>
			{fieldState ? (
				<div className="text-field">
					<input
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
			) : (
				<>
					<h1 className={styleClass}>{value}</h1>
				</>
			)}
		</>
	);
}
export default TextField;