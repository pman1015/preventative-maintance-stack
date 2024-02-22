import SingleOption from "../components/booleanSelect/singleOption";
import ChoiceBox from "../components/choiceBox/choiceBox";
import TextBox from "../components/textBox/textBox";
import TextChoiceBoxField from "../components/textChoiceBox/textChoiceBoxField";
import TextField from "../components/textEdit/textField";
import TextList from "../components/textList/TextList";

/**
 * Function that generates the appropriate InputForm element based on the type and
 * returns it
 * @date 2/2/2024 - 11:29:22 AM
 *
 * @param {string} type - string representing the type of field to generate
 * @param {string} name - string for the name of the field
 * @param {string} styleClass - string for a CSS class for the component if available
 * @param {string[]} options - list of options for dropdown style components
 * @param {boolean} error - if the component is in error state
 * @param {string} message - an error message if available for the component
 * @param {boolean} isEditable - use state to togle components between edit and display mode
 * @param {function(Object)} setCachedChanges - function to set the cache
 * @param {Object} cachedChanges - stores cached changes
 * @returns {JSX.Element}
 */
function GenerateField(
	type,
	name,
	styleClass,
	options,
	error,
	message,
	isEditable,
	setCachedChanges,
	cachedChanges
) {
	const fieldType = (type) => {
		switch (type) {
			case "text":
				return (
					<>
						<h2>{name}</h2>
						<TextField
							isEditable={isEditable}
							name={name}
							cachedChanges={cachedChanges}
							setCachedChanges={setCachedChanges}
							styleClass={styleClass}
							error={error}
							message={message}
						/>
					</>
				);
			case "textarea":
				return (
					<TextBox
						label={name}
						editable={isEditable}
						styleClass={styleClass}
						cachedChanges={cachedChanges}
						setCachedChanges={setCachedChanges}
						error={error}
						message={message}
					/>
				);
			case "dropdown":
			case "options":
				return (
					<>
						<h2>{name}</h2>
						<ChoiceBox
							cachedChanges={cachedChanges}
							setCachedChanges={setCachedChanges}
							editable={isEditable}
							name={name}
							options={options}
							error={error}
							message={message}
							styleClass={styleClass}
						/>
					</>
				);
			case "textChoiceBox":
				return (
					<>
						<h2>{name}</h2>
						<TextChoiceBoxField
							isEditable={isEditable}
							cachedChages={cachedChanges}
							setCachedChanges={setCachedChanges}
							name={name}
							styleClass={styleClass}
							allOptions={options}
							error={error}
							message={message}
						/>
					</>
				);
			case "boolean":
				return (
					<>
						<SingleOption
							isEditable={isEditable}
							cachedChanges={cachedChanges}
							setCachedChanges={setCachedChanges}
							name={name}
							styleClass={styleClass}
							allOptions={options}
							error={error}
							message={message}
						/>
					</>
				);
			case "textList":
				return (
					<TextList
						isEditable={isEditable}
						cachedChanges={cachedChanges}
						setCachedChanges={setCachedChanges}
						name={name}
					/>
				);
		}
	};
	return <div className="form-field">{fieldType(type)}</div>;
}
export default GenerateField;
