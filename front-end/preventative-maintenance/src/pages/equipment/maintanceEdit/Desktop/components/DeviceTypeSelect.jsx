import {useEffect, useState} from "react";
import InputForm from "../../../../../assets/components/form/form";
import {getDeviceTypes} from "../../../../../util/equipmentQueries";
/**
 * This Function returns a component to select a device type from the availabel device types from the api
 * @date 2/20/2024 - 1:13:41 PM
 *
 * @param {{ deviceSelectCache: Object; setDeviceSelectCache: Object; }} param0
 * @param {Object} param0.deviceSelectCache -- The cache to store the selection
 * @param {function(Object)} param0.setDeviceSelectCache -- function to set the cache
 * @returns {JSX.Element.DeviceTypeSelect}
 */
function DeviceTypeSelect({deviceSelectCache, setDeviceSelectCache}) {
	const [deviceSelectInitial, setDeviceSelectInitial] = useState({
		inputs: [{fieldName: "Device Type", type: "dropdown", options: []}],
	});
	useEffect(() => {
		let deviceTypes = getDeviceTypes();
		if (deviceTypes.status === 200) {
			setDeviceSelectInitial({
				inputs: [
					{
						fieldName: "Device Type",
						type: "dropdown",
						options: deviceTypes.deviceTypes,
						styleClass: {width: "150", height: "20"},
					},
				],
			});
		}
	}, []);
	return (
		<InputForm
			isEditable={true}
			initialStates={deviceSelectInitial}
			cachedChanges={deviceSelectCache}
			setCachedChanges={setDeviceSelectCache}
		/>
	);
}
export default DeviceTypeSelect;
