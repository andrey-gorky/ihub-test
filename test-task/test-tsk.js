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




function createHeaders() {

	// Select the first sheet.
	var ss = SpreadsheetApp.getActiveSpreadsheet();
	var sheet = ss.getSheets()[0];

	// Freeze the First Row.
	sheet.setFrozenRows(1);

	// Set the values for Headers.
	const headers = [
		["Datetime US", "Datetime UA", "Day US", "Day UA", "Day", "Month", "Year", "Time US", "Time UA"]
	];


	// var headersReversed = headers[0].reverse();
	var headersRange = sheet.getRange("A1:I1");
	headersRange.setValues(headers);


	// Make basic styling (headers font weight bold, and text in all operating area centered
	fontWeightBold(headersRange);
	basicStyling(sheet, "A1:I93");



	// Get the time zone
	// var timezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
	// var date = Utilities.formatDate(new Date(), timezone, "yyyy, MM, EEEE, dd, HH")
	// Logger.log(date)


	var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
	var MILLIS_PER_HOUR = 1000 * 60 * 60;
	// var timezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
	var today = new Date().getTime()
	// TomorrowDate
	var td = new Date(today + MILLIS_PER_DAY)
	// var weekdayRu = td.toLocaleDateString("ru", { weekday: "long"}).capitalize();
	// var weekdayEng = td.toLocaleDateString("en-US", { weekday: "long"});


	var event = new Date(td.getFullYear(), td.getMonth(), td.getDate(), 9, 0, 0)
	var plusOneHour = new Date(event.getTime() + MILLIS_PER_HOUR);
	Logger.log(event)
	Logger.log(plusOneHour)
	var weekdayRu = event.toLocaleDateString("ru", { weekday: "long" }).capitalize();
	var weekdayEng = event.toLocaleDateString("en-US", { weekday: "long" });
	// var dayOptions = { day: "numeric", month: "numeric", year: "numeric", weekday: "long", hour: "2-digit"}


	// Day Data
	var dd = {
		year: event.getFullYear(),
		month: event.getMonth(),
		date: event.getDate(),
		dayEng: event.toLocaleDateString("en-US", { weekday: "long" }),
		dayRu: event.toLocaleDateString("ru", { weekday: "long" }).capitalize(),
		timeUs: event.toLocaleDateString("en-US", { hour: "2-digit" }),
		timeUa: event.toLocaleDateString("ru", { hour: "2-digit" })
	}

	var timeUs = function (timeRu) {
		if (timeRu > 12) {
			return (timeRu - 12);
		} else {
			return timeRu
		}
	}

	var dateData = [
		[
			`${dd.month}/${dd.date}/${dd.year} 09:00:00`,
			`${dd.date}/${dd.month}/${dd.year} 09:00:00`,
			`${dd.dayEng}`,
			`${dd.dayRu}`,
			`${dd.date}`,
			`${dd.month}`,
			`${dd.year}`,
			`${timeUs(13)}:00:00`,
			`13:00:00`,
		]
	];
	var rowRange = sheet.getRange("A2:I2");
	rowRange.setValues(dateData);






	// var event = new Date(td.getFullYear(), td.getMonth(), td.getDate(), 9, 0, 0)
	// var dayOptions = { day: "numeric", month: "numeric", year: "numeric", weekday: "long", hour: "2-digit"}


	// Logger.log(event.toLocaleDateString("ru", dayOptions));
	// Logger.log(event.toLocaleDateString("en-us", dayOptions));















	// var event = new Date(2021, 02, 17, 9, 0, 0)
	// var dayOptions = { day: "numeric", month: "numeric", year: "numeric", weekday: "long", hour: "2-digit"}


	// Logger.log(event.toLocaleDateString("ru", dayOptions));
	// Logger.log(event.toLocaleDateString("en-us", dayOptions));


}