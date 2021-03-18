function appFunction() {
	// Functions and variables declaration ===================================

	// Function to center all the text in a specific area
	const basicStyling = function (sheetSelector, area) {
		var operatingRange = sheetSelector.getRange(area)
		operatingRange.setHorizontalAlignment("center");
	}

	// Function to make fontweight bold at a specific are
	const fontWeightBold = function (area) {
		area.setFontWeight("bold");
	}

	// Method to capitalize a string
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	// Resize columns function
	const resizeColumns = function (fromCol, toCol) {
		sheet.autoResizeColumn(fromCol);
		var width = sheet.getColumnWidth(fromCol) + 10;
		for (i = fromCol; i <= toCol; i++) {
			sheet.setColumnWidth(i, width)
		}
	}

	Number.prototype.makeDigit2 = function () {
		return this.toLocaleString('en-US', {
			minimumIntegerDigits: 2
		})
	}

	const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
	const MILLIS_PER_HOUR = 1000 * 60 * 60;

	// Select the first sheet.
	const ss = SpreadsheetApp.getActiveSpreadsheet();
	const sheet = ss.getSheets()[0];

	// Set the values for Headers.
	const headers = [
		["Datetime US", "Datetime UA", "Day US", "Day UA", "Day", "Month", "Year", "Time US", "Time UA"]
	];

	// Select range for headers
	const headersRange = sheet.getRange("A1:I1");

	// Set todays date
	const today = new Date().getTime();

	// Tomorrow Date
	const td = new Date(today + MILLIS_PER_DAY)

	// Next Days function
	const nextDays = function (days) {
		return new Date(today + MILLIS_PER_DAY * (1 + days))
	}

	// Day Data assignment function
	// ИСПРАВНО!!!!!!!!!!!!!!!!!!!!!!!!
	const dayData = function (event) {
		return {
			datetimeUs: Utilities.formatDate(event, 'America/New_York', "MM/dd/yyyy hh:mm:ss"),
			datetimeUa: Utilities.formatDate(event, 'America/New_York', "dd/MM/yyyy HH:mm:ss"),
			dayUs: event.toLocaleDateString("en-US", { weekday: "long" }),
			dayUa: event.toLocaleDateString("ru", { weekday: "long" }).capitalize(),
			day: Utilities.formatDate(event, 'America/New_York', "d"),
			month: Utilities.formatDate(event, 'America/New_York', "M"),
			year: Utilities.formatDate(event, 'America/New_York', "yyyy"),
			timeUs: Utilities.formatDate(event, 'America/New_York', "hh:mm:ss"),
			timeRu: Utilities.formatDate(event, 'America/New_York', "HH:mm:ss")
		}
	}

	// Day Values assignment function
	const dayValues = function () {
		return [
			[
				`${dd.datetimeUs}`,
				`${dd.datetimeUa}`,
				`${dd.dayUs}`,
				`${dd.dayUa}`,
				`${dd.day}`,
				`${dd.month}`,
				`${dd.year}`,
				`${dd.timeUs}`,
				`${dd.timeRu}`
			]
		]
	}

	// Variables declaration
	var nd; // Next Day

	// Set row number variable, where dates will start to print
	var rowNum = 1;

	// =========================================================

	// Set values for headers;
	headersRange.setValues(headers);


	// Loop
	for (daysAhead = 0; daysAhead < 7; daysAhead++) {
		// Assign next date (starting from tomorrow) to variable nd
		nd = nextDays(daysAhead);

		for (hoursAhead = 0; hoursAhead < 13; hoursAhead++) {
			var event = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate(), (9 + hoursAhead), 0, 0)

			// Assign Day Data for each hour of current variable date
			var dd = dayData(event)

			rowNum += 1;
			var dateValues = dayValues();
			var rowRange = sheet.getRange(`A${rowNum}:I${rowNum}`);
			Logger.log(rowNum)
			rowRange.setValues(dateValues);

		}
	}

	// Apply basic styling (headers font weight bold, text in all operating area centered, resize columns, and freeze first column
	fontWeightBold(headersRange);
	basicStyling(sheet, "A1:I93");
	resizeColumns(1, 9);
	sheet.setFrozenRows(1);


















	// var copy = new Date(event)
	// var dateTestUs = Utilities.formatDate(copy, 'America/New_York',  "MM/dd/yyyy hh:mm:ss");
	// var dateTestRu = Utilities.formatDate(copy, 'America/New_York',  "dd/MM/yyyy hh:mm:ss");
	// Logger.log(dateTestUs)
	// Logger.log(dateTestRu)


	// var dateData = [
	//   [
	//     `${dd.month[1]}/${dd.date[1]}/${dd.year} ${09}:00:00`,
	//     `${dd.date[1]}/${dd.month[1]}/${dd.year} ${09}:00:00`,
	//     `${dd.dayEng}`,
	//     `${dd.dayRu}`,
	//     `${dd.date[0]}`,
	//     `${dd.month[0]}`,
	//     `${dd.year}`,
	//     `${dd.time[1]}:00:00`,
	//     `${dd.time[0]}:00:00`,
	//   ]
	// ];
	// var rowRange = sheet.getRange("A2:I2");
	// Logger.log(hours);
	// Logger.log(dd.timeRu);
	// Logger.log(dd.timeUs);
	// rowRange.setValues(dateData);







	// Get the time zone
	// var timezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
	// var date = Utilities.formatDate(new Date(), timezone, "yyyy, MM, EEEE, dd, HH")
	// Logger.log(date)





	// var event = new Date(td.getFullYear(), td.getMonth(), td.getDate(), 9, 0, 0)
	// var dayOptions = { day: "numeric", month: "numeric", year: "numeric", weekday: "long", hour: "2-digit"}


	// Logger.log(event.toLocaleDateString("ru", dayOptions));
	// Logger.log(event.toLocaleDateString("en-us", dayOptions));









	// Day Data
	// var dd = {
	//   year: event.getFullYear(),
	//   month: [event.getMonth(), event.getMonth().makeDigit2()],
	//   date: [event.getDate(), event.getDate().makeDigit2()],
	//   dayEng: event.toLocaleDateString("en-US", { weekday: "long"}),
	//   dayRu: event.toLocaleDateString("ru", { weekday: "long"}).capitalize(),
	//   // timeUs: event.toLocaleDateString("en-US", { hour: "2-digit"}),
	//   // timeRu: event.toLocaleDateString("ru", { hour: "2-digit"})
	//   time: 09,
	// }








	// var event = new Date(2021, 02, 17, 9, 0, 0)
	// var dayOptions = { day: "numeric", month: "numeric", year: "numeric", weekday: "long", hour: "2-digit"}


	// Logger.log(event.toLocaleDateString("ru", dayOptions));
	// Logger.log(event.toLocaleDateString("en-us", dayOptions));


}
