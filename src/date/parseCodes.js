import options from './options';
import {
	isFunction,
	pad,
	getShortDayName,
	getSuffix,
	getDayOfYear,
	getWeekOfYear,
	getDaysInMonth,
	isLeapYear,
	getGMTOffset,
	getTimezone,
	isDST,
} from './utils';

const parseCodes = {
	d: {
		f: function(v, date) {
			date.d = parseInt(v, 10);
		},
		r: "(3[0-1]|[1-2][0-9]|0[1-9])" // day of month with leading zeroes (01 - 31)
	},
	j: {
		f: function(v, date) {
			date.d = parseInt(v, 10);
		},
		r: "(3[0-1]|[1-2][0-9]|[1-9])" // day of month without leading zeroes (1 - 31)
	},
	D: function() {
		let a = [];
		for (let i = 0; i < 7; a.push(getShortDayName(i)), ++i); // get localised short day names
		return {
			f: null,
			r: "(?:" + a.join("|") + ")"
		};
	},
	l: function() {
		return {
			f: null,
			r: "(?:" + options.dayNames.join("|") + ")"
		};
	},
	N: {
		f: null,
		r: "[1-7]" // ISO-8601 day number (1 (monday) - 7 (sunday))
	},
	S: {
		f: null,
		r: "(?:st|nd|rd|th)"
	},
	w: {
		f: null,
		r: "[0-6]" // javascript day number (0 (sunday) - 6 (saturday))
	},
	z: {
		f: function(v, date) {
			date.z = parseInt(v, 10);
		},
		r: "(\\d{1,3})" // day of the year (0 - 364 (365 in leap years))
	},
	W: {
		f: null,
		r: "(?:\\d{2})" // ISO-8601 week number (with leading zero)
	},
	F: function() {
		return {
			f: function(v, date) {
				date.m = parseInt(getMonthNumber(v), 10);
			}, // get localised month number
			r: "(" + options.monthNames.join("|") + ")"
		};
	},
	M: function() {
		let a = [];
		for (let i = 0; i < 12; a.push(getShortMonthName(i)), ++i); // get localised short month names
		return {
			f: function(v, date) {
				date.m = parseInt(this.getMonthNumber(v), 10);
			},
			r: "(" + a.join("|") + ")"
		};
	},
	m: {
		f: function(v, date) {
			date.m = parseInt(v, 10) - 1;
		},
		r: "(1[0-2]|0[1-9])"
	},
	n: {
		f: function(v, date) {
			date.m = parseInt(v, 10) - 1;
		},
		r: "(1[0-2]|[1-9])" // month number without leading zeros (1 - 12)
	},
	t: {
		f: null,
		r: "(?:\\d{2})" // no. of days in the month (28 - 31)
	},
	L: {
		f: null,
		r: "(?:1|0)"
	},
	o: function() {
		return parseCodes.Y;
	},
	Y: {
		f: function(v, date) {
			date.y = parseInt(v, 10);
		},
		r: "(\\d{4})" // 4-digit year
	},
	y: {
		f: function(v, date) {
			var _y = parseInt(v, 10);
			date.y = _y > options.y2kYear ? 1900 + _y : 2000 + _y;
		}, // 2-digit year
		r: "(\\d{1,2})"
	},
	a: {
		f: function(v, date) {
			var h = date.h;
			if (/(am)/i.test(v)) {
				if (!h || h == 12) {
					h = 0;
				}
			} else {
				if (!h || h < 12) {
					h = (h || 0) + 12;
				}
			}

			date.h = h;
		},
		r: "(am|pm|AM|PM)",
		calcAtEnd: true
	},
	A: function() {
		return parseCodes.a;
	},
	g: {
		f: function(v, date) {
			date.h = parseInt(v, 10);
		},
		r: "(1[0-2]|[0-9])" //  12-hr format of an hour without leading zeroes (1 - 12)	
	},
	G: {
		f: function(v, date) {
			date.h = parseInt(v, 10);
		},
		r: "(2[0-3]|1[0-9]|[0-9])" // 24-hr format of an hour without leading zeroes (0 - 23)
	},
	h: {
		f: function(v, date) {
			date.h = parseInt(v, 10);
		},
		r: "(1[0-2]|0[1-9])" //  12-hr format of an hour with leading zeroes (01 - 12)	
	},
	H: {
		f: function(v, date) {
			date.h = parseInt(v, 10);
		},
		r: "(2[0-3]|[0-1][0-9])" //  24-hr format of an hour with leading zeroes (00 - 23)
	},
	i: {
		f: function(v, date) {
			date.i = parseInt(v, 10);
		},
		r: "([0-5][0-9])" // minutes with leading zeros (00 - 59)
	},
	s: {
		f: function(v, date) {
			date.s = parseInt(v, 10);
		},
		r: "([0-5][0-9])" // seconds with leading zeros (00 - 59)
	},
	u: {
		f: function(ms, date) {
			date.ms = parseInt(ms, 10) / Math.pow(10, ms.length - 3);
		},
		r: '(\\d+)'
	},
	O: {
		f: function(v, date) {
			var o = v,
				sn = o.substring(0, 1),
				hr = o.substring(1, 3) * 1 + Math.floor(o.substring(3, 5) / 60),
				mn = o.substring(3, 5) % 60;

			date.sn = sn;
			date.hr = hr;
			date.mn = mn;

			date.o = ((-12 <= (hr * 60 + mn) / 60) && ((hr * 60 + mn) / 60 <= 14)) ? (sn + pad(hr, 2, '0') + pad(mn, 2, '0')) : null;
		},
		r: "([+\-]\\d{4})" // GMT offset in hrs and mins	
	},
	P: {
		f: function(v, date) {
			var o = v,
				sn = o.substring(0, 1),
				hr = o.substring(1, 3) * 1 + Math.floor(o.substring(4, 6) / 60),
				mn = o.substring(4, 6) % 60;

			date.sn = sn;
			date.hr = hr;
			date.mn = mn;

			date.o = ((-12 <= (hr * 60 + mn) / 60) && ((hr * 60 + mn) / 60 <= 14)) ? (sn + pad(hr, 2, '0') + pad(mn, 2, '0')) : null;
		},
		r: "([+\-]\\d{2}:\\d{2})" // GMT offset in hrs and mins (with colon separator)	
	},
	T: {
		f: null,
		r: "[A-Z]{1,4}" // timezone abbrev. may be between 1 - 4 chars	
	},
	Z: {
		f: function(v, date) {
			var zz = v * 1;
			date.zz = (-43200 <= zz && zz <= 50400) ? zz : null;
		},
		r: "([+\-]?\\d{1,5})" // leading '+' sign is optional for UTC offset	
	},
	c: function() {
		var calc = [],
			arr = [
				getParseCode("Y"), // year
				getParseCode("m"), // month
				getParseCode("d"), // day
				getParseCode("h"), // hour
				getParseCode("i"), // minute
				getParseCode("s") // second
			];

		return {
			f: null,
			r: [
				arr[0].r, // year (required)
				"(?:", "-", arr[1].r, // month (optional)
				"(?:", "-", arr[2].r, // day (optional)
				"(?:",
				"(?:T| )?", // time delimiter -- either a "T" or a single blank space
				arr[3].r, ":", arr[4].r, // hour AND minute, delimited by a single colon (optional). MUST be preceded by either a "T" or a single blank space
				"(?::", arr[5].r, ")?", // seconds (optional)
				"(?:(?:\\.|,)(\\d+))?", // decimal fraction of a second (e.g. ",12345" or ".98765") (optional)
				"(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", // "Z" (UTC) or "-0530" (UTC offset without colon delimiter) or "+08:00" (UTC offset with colon delimiter) (optional)
				")?",
				")?",
				")?"
			].join("")
		};
	},
	U: {
		f: function(v, date) {
			date.u = parseInt(v, 10);
		},
		r: "(-?\\d+)" // leading minus sign indicates seconds before UNIX epoch	
	},
	Q: {
		f: null,
		r: "0[1-4]"
	},
	q: {
		f: null,
		r: "[1-4]"
	}
};

function getParseCode(code) {
	const pCode = parseCodes[code];

	if (isFunction(pCode)) pCode = pCode();

	return pCode;
}

export default parseCodes;  