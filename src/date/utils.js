import options from './options';

const stripEscapeRe = /(\\.)/g;
const hourInfoRe = /([gGhHisucUOPZ]|MS)/;
const dateInfoRe = /([djzmnYycU]|MS)/;
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
const ms1d = 864e5; // milliseconds in a day
const ms7d = 7 * ms1d; // milliseconds in a week

export const YEAR = 'y';
export const MONTH = 'm';
export const DAY = 'd';
export const HOUR = 'h';
export const MINUTE = 'i';
export const SECOND = 's';
export const MILLI = 'ms';
export const WEEKDAY = 'wd';
export const WEEK = 'w';
export const QUARTER = 'q';

const toString = Object.prototype.toString;

export function isArray(obj) {
    return toString.call(obj) == '[object Array]';
}

export function isFunction(obj) {
    return toString.call(obj) == '[object Function]';
}

export function isDate(obj) {
    return toString.call(obj) == '[object Date]';
}

export function escapeRegex(str) {
    return str.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
}

export function defaultTo(value, defaultValue) {
    if (isFinite(value)) {
        value = parseFloat(value);
    }

    return !isNaN(value) ? value : defaultValue;
}

export const now = Date.now || function() {
	return +new Date();
}

export function dateToString(date) {
	return date.getFullYear() + "-" +
		pad(date.getMonth() + 1, 2, '0') + "-" +
		pad(date.getDate(), 2, '0') + "T" +
		pad(date.getHours(), 2, '0') + ":" +
		pad(date.getMinutes(), 2, '0') + ":" +
		pad(date.getSeconds(), 2, '0');
}

export function pad(v, len, s){
	let res = "" + v,
		s = s || '0',
		len = len || 2;
	for (; res.length < len; res = s + res) {}
	return res;	
}

export function getShortDayName(day){
	return options.dayNames[day].substring(0, 3);	
}

export function getShortMonthName(month){
	return options.monthNames[month].substring(0, 3);
}

export function getMonthNumber(name){
	return options.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
}

export function clone(date){
	return new Date(+date);
}

export function formatContainsHourInfo(format){
	return hourInfoRe.test(format.replace(stripEscapeRe, ''));
}

export function formatContainsDateInfo(format){
	return dateInfoRe.test(format.replace(stripEscapeRe, ''));
}

/**
 * 判断当前年份是否闰年
 * @param {int|Date} year 年份或者日期对象
 * @return {boolean}
 */
export function isLeapYear(year) {
	year = isDate(year) ? year.getFullYear() : parseInt(year, 10);
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 获取本月有多少天数
 * 还有个方法：日期设置上个月的日期为0，那么就可以得到这个月的最后一天日期
 * examples : date1.setDate(1);date1.setMonth( date1.getMonth()+1 );date1.setDate(0);return date1.getDate(); 	
 * @param {Date} date The date
 * @return {Number} 本月天数
 */
export function getDaysInMonth(date) { // return a closure for efficiency
	const m = date.getMonth();
	return m == 1 && isLeapYear(date) ? 29 : daysInMonth[m];
}

/**
 * 获取本月第一天
 * @param {Date} date The date
 * @return {Date}
 */
export function getFirstDateOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
},

/**
 * 获取本月最后一天
 * @param {Date} date The date
 * @return {Date}
 */
export function getLastDateOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), getDaysInMonth(date));
}

/**
 * @param {Date} date The date
 * @return {Number} The day number (0-6).
 */
export function getFirstDayOfMonth(date) {
	const day = (date.getDay() - (date.getDate() - 1)) % 7;
	return (day < 0) ? (day + 7) : day;
}


/**
 * @param {Date} date The date
 * @return {Number} The day number (0-6).
 */
export function getLastDayOfMonth(date) {
	return getLastDateOfMonth(date).getDay();
}

/**
 * Get the timezone abbreviation of the current date (equivalent to the format specifier 'T').
 *
 * Note: The date string returned by the javascript Date object's toString() method varies
 * between browsers (e.g. FF vs IE) and system region settings (e.g. IE in Asia vs IE in America).
 * For a given date string e.g. "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)",
 * getTimezone() first tries to get the timezone abbreviation from between a pair of parentheses
 * (which may or may not be present), failing which it proceeds to get the timezone abbreviation
 * from the GMT offset portion of the date string.
 * @param {Date} date The date
 * @return {String} The abbreviated timezone name (e.g. 'CST', 'PDT', 'EDT', 'MPST' ...).
 */
export function getTimezone(date) {
	// the following list shows the differences between date strings from different browsers on a WinXP SP2 machine from an Asian locale:
	//
	// Opera  : "Thu, 25 Oct 2007 22:53:45 GMT+0800" -- shortest (weirdest) date string of the lot
	// Safari : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone (same as FF)
	// FF     : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone
	// IE     : "Thu Oct 25 22:54:35 UTC+0800 2007" -- (Asian system setting) look for 3-4 letter timezone abbrev
	// IE     : "Thu Oct 25 17:06:37 PDT 2007" -- (American system setting) look for 3-4 letter timezone abbrev
	//
	// this crazy regex attempts to guess the correct timezone abbreviation despite these differences.
	// step 1: (?:\((.*)\) -- find timezone in parentheses
	// step 2: ([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?) -- if nothing was found in step 1, find timezone from timezone offset portion of date string
	// step 3: remove all non uppercase characters found in step 1 and 2
	return date.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
}

/**
 * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
 * @param {Date} date The date
 * @param {Boolean} colon (optional) true to separate the hours and minutes with a colon (defaults to false).
 * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600').
 */
export function getGMTOffset(date, colon) {
	const offset = date.getTimezoneOffset();
	return (offset > 0 ? "-" : "+") +
		pad(Math.floor(Math.abs(offset) / 60), 2, "0") +
		(colon ? ":" : "") +
		pad(Math.abs(offset % 60), 2, "0");
}

/**
 * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
 * @param {Date} date The date
 * @return {String} 'st, 'nd', 'rd' or 'th'.
 */
export function getSuffix(date) {
	switch (date.getDate()) {
		case 1:
		case 21:
		case 31:
			return "st";
		case 2:
		case 22:
			return "nd";
		case 3:
		case 23:
			return "rd";
		default:
			return "th";
	}
}

/**
 * 获取当前日期在本年的天数 从0开始
 * @param {Date} date The date
 * @return {Number} 0 to 364 (365 in leap years).
 */
export function getDayOfYear(date) {
	let num = 0,
		d = clone(date),
		m = date.getMonth(),
		i;

	for (i = 0, d.setDate(1), d.setMonth(0); i < m; d.setMonth(++i)) {
		num += getDaysInMonth(d);
	}
	
	return num + date.getDate() - 1;
}

export function getQuarterOfYear(date) {
	return Math.ceil((date.getMonth() + 1) / 3);
}

export function getWeekOfYear(){
	const DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d, // an Absolute Day Number
		AWN = Math.floor(DC3 / 7), // an Absolute Week Number
		Wyr = new Date(AWN * ms7d).getUTCFullYear();

	return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;	
}

/**
 * 判断两个日期是否相等
 * @param {Date} date1
 * @param {Date} date2
 * @return {Boolean} 
 */
export function isEqual(date1, date2) {
	// check we have 2 date objects
	if (date1 && date2) {
		return (date1.getTime() === date2.getTime());
	}
	// one or both isn't a date, only equal if both are falsey
	return !(date1 || date2);
}

/**
 * 返回2日期之间的毫秒数
 * @param {Date} dateA The first date
 * @param {Date} dateB (optional) The second date, defaults to now
 * @return {Number} The difference in milliseconds
 */
export function getElapsed(dateA, dateB) {
	return Math.abs(dateA - (dateB || new Date()));
}

/**
 * 日期推移
 * @param {Date}
 * @param {String} interval 添加间隔类型 年y 月m 日d 小时h 分i 秒s 毫秒ms
 * @param {Int}	number 添加时间间隔值,可以是正负值
 */
export function add(date, interval, value) {
	const d = clone(date);
	if (!interval || value === 0) return d;

	switch (interval.toLowerCase()) {
		case MILLI:
			d.setMilliseconds(d.getMilliseconds() + value);
			break;
		case SECOND:
			d.setSeconds(d.getSeconds() + value);
			break;
		case MINUTE:
			d.setMinutes(d.getMinutes() + value);
			break;
		case HOUR:
			d.setHours(d.getHours() + value);
			break;
		case DAY:
			d.setDate(d.getDate() + value);
			break;
		case WEEKDAY:
			//i18n FIXME: assumes Saturday/Sunday weekend, but this is not always true.  see dojo/cldr/supplemental

			// Divide the increment time span into weekspans plus leftover days
			// e.g., 8 days is one 5-day weekspan / and two leftover days
			// Can't have zero leftover days, so numbers divisible by 5 get
			// a days value of 5, and the remaining days make up the number of weeks
			let days, weeks, amount = parseInt(value, 10);
			let mod = amount % 5;
			if (!mod) {
				days = (amount > 0) ? 5 : -5;
				weeks = (amount > 0) ? ((amount - 5) / 5) : ((amount + 5) / 5);
			} else {
				days = mod;
				weeks = parseInt(amount / 5);
			}
			// Get weekday value for orig date param
			let strt = date.getDay();
			// Orig date is Sat / positive incrementer
			// Jump over Sun
			let adj = 0;
			if (strt == 6 && amount > 0) {
				adj = 1;
			} else if (strt == 0 && amount < 0) {
				// Orig date is Sun / negative incrementer
				// Jump back over Sat
				adj = -1;
			}
			// Get weekday val for the new date
			let trgt = strt + days;
			// New date is on Sat or Sun
			if (trgt == 0 || trgt == 6) {
				adj = (amount > 0) ? 2 : -2;
			}
			// Increment by number of weeks plus leftover days plus
			// weekend adjustments
			amount = (7 * weeks) + days + adj;

			d = add(d, DAY, amount);
			break;
		case WEEK:
			d = add(d, DAY, value * 7);
			break;
		case MONTH:
			let day = date.getDate();
			if (day > 28) {
				day = Math.min(day, getLastDateOfMonth(add(getFirstDateOfMonth(date), MONTH, value)).getDate());
			}
			d.setDate(day);
			d.setMonth(date.getMonth() + value);
			break;
		case QUARTER:
			d = add(d, MONTH, value * 3);
			break;
		case YEAR:
			d.setFullYear(date.getFullYear() + value);
			break;
	}
	return d;
}

export function subtract(date, interval, value){
	return add(date, interval, -value);
}

/**
 * Checks if the passed Date parameters will cause a javascript Date "rollover".
 * @param {Number} year 4-digit year
 * @param {Number} month 1-based month-of-year
 * @param {Number} day Day of month
 * @param {Number} hour (optional) Hour
 * @param {Number} minute (optional) Minute
 * @param {Number} second (optional) Second
 * @param {Number} millisecond (optional) Millisecond
 * @return {Boolean} true if the passed parameters do not cause a Date "rollover", false otherwise.
 */
export function isValid(y, m, d, h, i, s, ms) {
	// setup defaults
	h = h || 0;
	i = i || 0;
	s = s || 0;
	ms = ms || 0;

	// Special handling for year < 100
	const dt = add(new Date(y < 100 ? 100 : y, m - 1, d, h, i, s, ms), YEAR, y < 100 ? y - 100 : 0);

	return y == dt.getFullYear() &&
		m == dt.getMonth() + 1 &&
		d == dt.getDate() &&
		h == dt.getHours() &&
		i == dt.getMinutes() &&
		s == dt.getSeconds() &&
		ms == dt.getMilliseconds();
}

export function isDST(date) {
	// adapted from http://sencha.com/forum/showthread.php?p=247172#post247172
	// courtesy of @geoffrey.mcgill
	return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() != date.getTimezoneOffset();
}

/**
 * Attempts to clear all time information from this Date by setting the time to midnight of the same day,
 * automatically adjusting for Daylight Saving Time (DST) where applicable.
 * (note: DST timezone information for the browser's host operating system is assumed to be up-to-date)
 * @param {Date} date The date
 * @param {Boolean} clone true to create a clone of this date, clear the time and return it (defaults to false).
 * @return {Date} this or the clone.
 */
export function clearTime(date, clone) {
	if (clone) {
		return clearTime(clone(date));
	}

	// get current date before clearing time
	const d = date.getDate();

	// clear time
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);

	if (date.getDate() != d) { // account for DST (i.e. day of month changed when setting hour = 0)
		// note: DST adjustments are assumed to occur in multiples of 1 hour (this is almost always the case)
		// refer to http://www.timeanddate.com/time/aboutdst.html for the (rare) exceptions to this rule

		// increment hour until cloned date == current date
		for (let hr = 1, c = add(date, HOUR, hr); c.getDate() != d; hr++, c = add(date, HOUR, hr));

		date.setDate(d);
		date.setHours(c.getHours());
	}

	return date;
}

/**
 * Checks if a date falls on or between the given start and end dates.
 * @param {Date} date The date to check
 * @param {Date} start Start date
 * @param {Date} end End date
 * @return {Boolean} true if this date falls on or between the given start and end dates.
 */
export function between(date, start, end) {
	const t = date.getTime();
	return start.getTime() <= t && t <= end.getTime();
}

/** 
 * Get the difference in a specific unit of time (e.g., number of
 *	months, weeks, days, etc.) between two dates, rounded to the
 *	nearest integer.
 * @param {Date}
 * @param {Date?} Defaults now()
 * @param {String?} Defaults d
 * @return {Number}
 */
export function difference(date1, date2, interval) {
	date2 = date2 || new Date();
	interval = interval || DAY;
	const yearDiff = date2.getFullYear() - date1.getFullYear();
	let delta = 1; // Integer return value
	//see dojo date
	switch (interval) {
		case QUARTER:
			const m1 = date1.getMonth();
			const m2 = date2.getMonth();
			// Figure out which quarter the months are in
			const q1 = Math.floor(m1 / 3) + 1;
			const q2 = Math.floor(m2 / 3) + 1;
			// Add quarters for any year difference between the dates
			q2 += (yearDiff * 4);
			delta = q2 - q1;
			break;
		case WEEKDAY:
			let days = Math.round(difference(date1, date2, DAY));
			let weeks = parseInt(difference(date1, date2, WEEK));
			let mod = days % 7;

			// Even number of weeks
			if (mod == 0) {
				days = weeks * 5;
			} else {
				// Weeks plus spare change (< 7 days)
				let adj = 0;
				let aDay = date1.getDay();
				let bDay = date2.getDay();

				weeks = parseInt(days / 7);
				mod = days % 7;
				// Mark the date advanced by the number of
				// round weeks (may be zero)
				let dtMark = new Date(date1);
				dtMark.setDate(dtMark.getDate() + (weeks * 7));
				let dayMark = dtMark.getDay();

				// Spare change days -- 6 or less
				if (days > 0) {
					switch (true) {
						// Range starts on Sat
						case aDay == 6:
							adj = -1;
							break;
							// Range starts on Sun
						case aDay == 0:
							adj = 0;
							break;
							// Range ends on Sat
						case bDay == 6:
							adj = -1;
							break;
							// Range ends on Sun
						case bDay == 0:
							adj = -2;
							break;
							// Range contains weekend
						case (dayMark + mod) > 5:
							adj = -2;
					}
				} else if (days < 0) {
					switch (true) {
						// Range starts on Sat
						case aDay == 6:
							adj = 0;
							break;
							// Range starts on Sun
						case aDay == 0:
							adj = 1;
							break;
							// Range ends on Sat
						case bDay == 6:
							adj = 2;
							break;
							// Range ends on Sun
						case bDay == 0:
							adj = 1;
							break;
							// Range contains weekend
						case (dayMark + mod) < 0:
							adj = 2;
					}
				}
				days += adj;
				days -= (weeks * 2);
			}
			delta = days;
			break;
		case YEAR:
			delta = yearDiff;
			break;
		case MONTH:
			delta = (date2.getMonth() - date1.getMonth()) + (yearDiff * 12);
			break;
		case WEEK:
			// Truncate instead of rounding
			// Don't use Math.floor -- value may be negative
			delta = parseInt(difference(date1, date2, DAY) / 7);
			break;
		case DAY:
			delta /= 24;
			// fallthrough
		case HOUR:
			delta /= 60;
			// fallthrough
		case MINUTE:
			delta /= 60;
			// fallthrough
		case SECOND:
			delta /= 1000;
			// fallthrough
		case MILLI:
			delta *= date2.getTime() - date1.getTime();
	}

	// Round for fractional values and DST leaps
	return Math.round(delta); // Number (integer)	
}

export const diff = difference;
