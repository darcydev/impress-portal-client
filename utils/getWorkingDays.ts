let holidays: number[] = [
	new Date('01-01-2021').setUTCHours(0, 0, 0, 0),
	new Date('01-26-2021').setUTCHours(0, 0, 0, 0),
	new Date('04-02-2021').setUTCHours(0, 0, 0, 0),
	new Date('04-05-2021').setUTCHours(0, 0, 0, 0),
	new Date('06-14-2021').setUTCHours(0, 0, 0, 0),
	new Date('10-04-2021').setUTCHours(0, 0, 0, 0),
	new Date('12-27-2021').setUTCHours(0, 0, 0, 0),
	new Date('12-28-2021').setUTCHours(0, 0, 0, 0),
];

const getDatesBetweenDates = (startDate: Date, endDate: Date): any[] => {
	let dates: any[] = [];

	const start: Date = startDate;
	const end: Date = endDate;

	while (start < end) {
		dates = [...dates, new Date(start)];
		start.setDate(start.getDate() + 1);
	}

	return dates;
};

export const getWorkingDays = (startDate: Date, endDate: Date): number => {
	let totalWorkingDays: number = 0;

	let datesArr = getDatesBetweenDates(startDate, endDate);

	for (let i = 0; i < datesArr.length; i++) {
		const date = datesArr[i];

		const holiday: boolean = holidays.includes(date.setUTCHours(0, 0, 0, 0));
		const dayOfWeek: number = date.getDay();

		if (holiday || dayOfWeek === 5 || dayOfWeek === 6) {
			continue;
		}

		totalWorkingDays++;
	}

	return totalWorkingDays;
};
