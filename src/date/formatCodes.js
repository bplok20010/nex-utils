import options from './options';
import {
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
//see http://php.net/manual/zh/function.date.php
const formatCodes = {
	//日
	d: function(date) {
		return pad(date.getDate(), 2, '0');
	},
	D: function(date) {
		return getShortDayName(date.getDay());
	}, // get localised short day name
	j: function(date) {
		return date.getDate();
	},
	l: function(date) {
		return options.dayNames[date.getDay()];
	},
	N: function(date) {
		return date.getDay() ? date.getDay() : 7;
	},
	S: function(date) {
		return getSuffix(date);
	},
	w: function(date) {
		return date.getDay();
	},
	z: function(date) {
		return getDayOfYear(date);
	},
	//星期
	W: function(date) {
		return pad(getWeekOfYear(date), 2, '0');
	},
	//月
	F: function(date) {
		return options.monthNames[date.getMonth()];
	},
	m: function(date) {
		return pad(date.getMonth() + 1, 2, '0');
	},
	M: function(date) {
		return getShortMonthName(date.getMonth());
	}, // get localised short month name
	n: function(date) {
		return date.getMonth() + 1;
	},
	t: function(date) {
		return getDaysInMonth(date);
	},
	//年
	L: function(date) {
		return isLeapYear(date) ? 1 : 0;
	},
	o: function(date) {
		return date.getFullYear() + (getWeekOfYear(date) == 1 && date.getMonth() > 0 ? +1 : (getWeekOfYear(date) >= 52 && date.getMonth() < 11 ? -1 : 0));
	},
	Y: function(date) {
		return pad(date.getFullYear(), 4, '0');
	},
	y: function(date) {
		return ('' + date.getFullYear()).substring(2, 4);
	},
	//时间
	a: function(date) {
		return date.getHours() < 12 ? 'am' : 'pm';
	},
	A: function(date) {
		return date.getHours() < 12 ? 'AM' : 'PM';
	},
	g: function(date) {
		return (date.getHours() % 12) ? date.getHours() % 12 : 12;
	},
	G: function(date) {
		return date.getHours();
	},
	h: function(date) {
		return pad((date.getHours() % 12) ? date.getHours() % 12 : 12, 2, '0');
	},
	H: function(date) {
		return pad(date.getHours(), 2, '0')
	},
	i: function(date) {
		return pad(date.getMinutes(), 2, '0');
	},
	s: function(date) {
		return pad(date.getSeconds(), 2, '0');
	},
	u: function(date) {
		return pad(date.getMilliseconds(), 3, '0')
	},
	//时区
	I: function(date){
		return isDST(date) ? 1 : 0;
	},
	O: function(date) {
		return getGMTOffset(date);
	},
	P: function(date) {
		return getGMTOffset(date, true);
	},
	T: function(date) {
		return getTimezone(date);
	},
	Z: function(date) {
		return date.getTimezoneOffset() * -60;
	},
	c: function(date) { //ISO-8601 -- GMT format
		return [
			getFormatCode('Y')(date),
			'-',
			getFormatCode('m')(date),
			'-',
			getFormatCode('d')(date),
			'T',
			getFormatCode('H')(date),
			':',
			getFormatCode('i')(date),
			':',
			getFormatCode('s')(date),
			getFormatCode('P')(date)
		].join('');
	},
	U: function(date) {
		return Math.round(date.getTime() / 1000);
	},
	//季度
	Q: function(date) {
		return pad(Math.ceil((date.getMonth() + 1) / 3), 2, '0');
	},
	q: function() {
		return Math.ceil((date.getMonth() + 1) / 3);
	}
};

export default formatCodes;  