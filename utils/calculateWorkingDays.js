/* TODO this needs significant refactoring! */

const holidays = [
	new Date('01-01-2021'),
	new Date('26-01-2021'),
	new Date('04-02-2021'),
	new Date('04-05-2021'),
	new Date('06-14-2021'),
	new Date('10-04-2021'),
	new Date('12-27-2021'),
	new Date('12-28-2021'),
];

const convertTwoDatesIntoArray = (startDate, endDate) => {
	for (
		var arr = [], dt = new Date(startDate);
		dt <= endDate;
		dt.setDate(dt.getDate() + 1)
	) {
		arr.push(new Date(dt));
	}

	return arr;
};

export const calculateWorkingDaysFromToday = (startDate, endDate) => {
	let totalWorkingDays = 0;
	let holidayDays = 0;

	var daylist = convertTwoDatesIntoArray(startDate, endDate);
	daylist.map((v) => v.toISOString().slice(0, 10)).join('');

	daylist.forEach((date) => {
		const day = date.toDateString();
		const dayOfWeek = date.getDay();

		holidays.forEach((holiday) => {
			const holidayDateString = holiday.toDateString();

			if (holidayDateString === day) {
				holidayDays++;
			}
		});

		if (dayOfWeek !== 5 && dayOfWeek !== 6) {
			totalWorkingDays++;
		}
	});

	return totalWorkingDays - holidayDays;
};
