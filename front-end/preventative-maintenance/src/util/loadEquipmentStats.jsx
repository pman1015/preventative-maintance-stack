function updateEquipmentStats(selectedValue) {
	return {
        equipmentType: selectedValue,
		maxValue: 100,
		equipment: [
			{
				name: "Epson 5450",
				count: 40,
			},
			{
				name: "Epson Eb-laser",
				count: 20,
			},
			{
				name: "Epson 1980",
				count: 85,
			},
		],
	};
}
export default  updateEquipmentStats;