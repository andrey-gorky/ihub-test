function appFunction() {
	// Functions and variables declaration ===================================

	// Function to center all the text in a specific area
	const basicStyling = (sheetSelector, area) => {
		let operatingRange = sheetSelector.getRange(area)
		operatingRange.setHorizontalAlignment("center");
	}

	// Function to make fontweight bold at a specific are
	const fontWeightBold = area => area.setFontWeight("bold");

	// Method to capitalize a string
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1)
	};

	// Resize columns function
	const resizeColumns = (fromCol, toCol) => {
		sheet.autoResizeColumn(fromCol);
		let width = sheet.getColumnWidth(fromCol) + 10;
		for (i = fromCol; i <= toCol; i++) {
			sheet.setColumnWidth(i, width)
		}
	}

	const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
	const MILLIS_PER_HOUR = 1000 * 60 * 60;

	// Select the first sheet.
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

	// Set the values for Headers.
	const headers = [
		["Datetime US", "Datetime UA", "Day US", "Day UA", "Day", "Month", "Year", "Time US", "Time UA"]
	];

	// Select range for headers
	const headersRange = sheet.getRange("A1:I1");

	// Set todays date
	const today = new Date().getTime();

	// Next Days function
	const nextDays = (days) => new Date(today + MILLIS_PER_DAY * (1 + days));


	// Tomorrow Date
	const td = new Date(today + MILLIS_PER_DAY)

	// Day Values assignment function
	const dayValues = event => {
		return [
			[
				`${Utilities.formatDate(event, 'America/New_York', "''MM/dd/yyyy hh:mm:ss")}`,
				`${Utilities.formatDate(event, 'America/New_York', "''dd/MM/yyyy HH:mm:ss")}`,
				`${event.toLocaleDateString("en-US", { weekday: "long" })}`,
				`${event.toLocaleDateString("ru", { weekday: "long" }).capitalize()}`,
				`${Utilities.formatDate(event, 'America/New_York', "d")}`,
				`${Utilities.formatDate(event, 'America/New_York', "M")}`,
				`${Utilities.formatDate(event, 'America/New_York', "yyyy")}`,
				`${Utilities.formatDate(event, 'America/New_York', "''hh:mm:ss")}`,
				`${Utilities.formatDate(event, 'America/New_York', "''HH:mm:ss")}`
			]
		]
	}

	// Variables declaration
	let nd; // Next Day
	let event; // declare variable for each day and each hour

	// Set row number variable, where dates will start to print
	let rowNum = 1;

	// =========================================================


	// Set values for headers;
	headersRange.setValues(headers);


	// Main Loop to go through days
	for (daysAhead = 0; daysAhead < 7; daysAhead++) {
		// Assign next date (starting from tomorrow) to variable nd
		nd = nextDays(daysAhead);

		// SubLoop to go through hours in each day
		for (hoursAhead = 0; hoursAhead < 13; hoursAhead++) {

			// Assign required date and time to variable event
			event = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate(), (9 + hoursAhead), 0, 0)

			// Increase number of row each time one by one
			rowNum += 1;

			// Assign specific date data for each column 
			let dateValues = dayValues(event);
			let rowRange = sheet.getRange(`A${rowNum}:I${rowNum}`);
			rowRange.setValues(dateValues);

		}
	}

	// Apply basic styling (headers font weight bold, text in all operating area centered,
	// resize columns, and freeze first   column
	fontWeightBold(headersRange);
	basicStyling(sheet, "A1:I93");
	resizeColumns(1, 9);
	sheet.setFrozenRows(1);


}
