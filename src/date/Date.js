/**
 * The date parsing and formatting syntax contains a subset of
 * <a href="http://www.php.net/date">PHP's date() function</a>, and the formats that are
 * supported will provide results equivalent to their PHP versions.
 *
 * The following is a list of all currently supported formats:
 * <pre class="">
Format  Description                                                               Example returned values
------  -----------------------------------------------------------------------   -----------------------
  d     Day of the month, 2 digits with leading zeros                             01 to 31
  D     A short textual representation of the day of the week                     Mon to Sun
  j     Day of the month without leading zeros                                    1 to 31
  l     A full textual representation of the day of the week                      Sunday to Saturday
  N     ISO-8601 numeric representation of the day of the week                    1 (for Monday) through 7 (for Sunday)
  S     English ordinal suffix for the day of the month, 2 characters             st, nd, rd or th. Works well with j
  w     Numeric representation of the day of the week                             0 (for Sunday) to 6 (for Saturday)
  z     The day of the year (starting from 0)                                     0 to 364 (365 in leap years)
  W     ISO-8601 week number of year, weeks starting on Monday                    01 to 53
  F     A full textual representation of a month, such as January or March        January to December
  m     Numeric representation of a month, with leading zeros                     01 to 12
  M     A short textual representation of a month                                 Jan to Dec
  n     Numeric representation of a month, without leading zeros                  1 to 12
  t     Number of days in the given month                                         28 to 31
  L     Whether it&#39;s a leap year                                                  1 if it is a leap year, 0 otherwise.
  o     ISO-8601 year number (identical to (Y), but if the ISO week number (W)    Examples: 1998 or 2004
        belongs to the previous or next year, that year is used instead)
  Y     A full numeric representation of a year, 4 digits                         Examples: 1999 or 2003
  y     A two digit representation of a year                                      Examples: 99 or 03
  a     Lowercase Ante meridiem and Post meridiem                                 am or pm
  A     Uppercase Ante meridiem and Post meridiem                                 AM or PM
  g     12-hour format of an hour without leading zeros                           1 to 12
  G     24-hour format of an hour without leading zeros                           0 to 23
  h     12-hour format of an hour with leading zeros                              01 to 12
  H     24-hour format of an hour with leading zeros                              00 to 23
  i     Minutes, with leading zeros                                               00 to 59
  s     Seconds, with leading zeros                                               00 to 59
  u     Decimal fraction of a second                                              Examples:
        (minimum 1 digit, arbitrary number of digits allowed)                     001 (i.e. 0.001s) or
                                                                                  100 (i.e. 0.100s) or
                                                                                  999 (i.e. 0.999s) or
                                                                                  999876543210 (i.e. 0.999876543210s)
  O     Difference to Greenwich time (GMT) in hours and minutes                   Example: +1030
  P     Difference to Greenwich time (GMT) with colon between hours and minutes   Example: -08:00
  T     Timezone abbreviation of the machine running the code                     Examples: EST, MDT, PDT ...
  Z     Timezone offset in seconds (negative if west of UTC, positive if east)    -43200 to 50400
  c     ISO 8601 date
        Notes:                                                                    Examples:
        1) If unspecified, the month / day defaults to the current month / day,   1991 or
           the time defaults to midnight, while the timezone defaults to the      1992-10 or
           browser's timezone. If a time is specified, it must include both hours 1993-09-20 or
           and minutes. The "T" delimiter, seconds, milliseconds and timezone     1994-08-19T16:20+01:00 or
           are optional.                                                          1995-07-18T17:21:28-02:00 or
        2) The decimal fraction of a second, if specified, must contain at        1996-06-17T18:22:29.98765+03:00 or
           least 1 digit (there is no limit to the maximum number                 1997-05-16T19:23:30,12345-0400 or
           of digits allowed), and may be delimited by either a '.' or a ','      1998-04-15T20:24:31.2468Z or
        Refer to the examples on the right for the various levels of              1999-03-14T20:24:32Z or
        date-time granularity which are supported, or see                         2000-02-13T21:25:33
        http://www.w3.org/TR/NOTE-datetime for more info.                         2001-01-12 22:26:34
  U     Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)                1193432466 or -2138434463
</pre>
 */


var toString = Object.prototype.toString;

function isArray(obj) {
    return toString.call(obj) == '[object Array]';
}

function isFunction(obj) {
    return toString.call(obj) == '[object Function]';
}

function isDate(obj) {
    return toString.call(obj) == '[object Date]';
}

function escapeRegex(str) {
    return str.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
}

function defalut(value, defaultValue) {
    if (isFinite(value)) {
        value = parseFloat(value);
    }

    return !isNaN(value) ? value : defaultValue;
}

const DateUtil = {
    isDate: isDate,

    pad: function(v, len, s) {
        var res = "" + v,
            s = s || '0',
            len = len || 2;
        for (; res.length < len; res = s + res) {}
        return res;
    },

    now: Date.now || function() {
        return +new Date();
    },

    /**
     * @private
     * Private for now
     */
    toString: function(date) {
        var pad = this.pad;

        return date.getFullYear() + "-" +
            pad(date.getMonth() + 1, 2, '0') + "-" +
            pad(date.getDate(), 2, '0') + "T" +
            pad(date.getHours(), 2, '0') + ":" +
            pad(date.getMinutes(), 2, '0') + ":" +
            pad(date.getSeconds(), 2, '0');
    },

    /**
     * parse时的默认时间，否则取当前时间
     * y,m,d,h,i,s,ms
     */
    defaults: {},

    defaultFormat: 'Y-m-d',

    y2kYear: 50,

    /**
     * Date interval constant
     * @type String
     */
    MILLI: "ms",

    /**
     * Date interval constant
     * @type String
     */
    SECOND: "s",

    /**
     * Date interval constant
     * @type String
     */
    MINUTE: "mi",

    /** Date interval constant
     * @type String
     */
    HOUR: "h",

    /**
     * Date interval constant
     * @type String
     */
    DAY: "d",

    //工作日 一周5个工作日
    WEEKDAY: 'wd',

    /**
     * Date interval constant
     * @type String
     */
    WEEK: 'w',

    /**
     * Date interval constant
     * @type String
     */
    MONTH: "mo",

    /**
     * Date interval constant
     * @type String
     */
    QUARTER: 'q',

    /**
     * Date interval constant
     * @type String
     */
    YEAR: "y",

    /**
     * @property {String[]} dayNames
     */
    dayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],

    /**
     * @property {String[]} monthNames
     */
    monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],

    /**
     * @property {Object} monthNumbers
     */
    monthNumbers: {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11
    },

    /**
     * 检测格式字符是否包含时间信息 //这里暂时还没加上\H \i \s的检测..
     * @param {String} format The format to check
     * @return {Boolean} True if the format contains hour information
     * @method
     */
    formatContainsHourInfo: (function() {
        var stripEscapeRe = /(\\.)/g,
            hourInfoRe = /([gGhHisucUOPZ]|MS)/;
        return function(format) {
            return hourInfoRe.test(format.replace(stripEscapeRe, ''));
        };
    })(),

    /**
     * 检测格式字符是否包含日期信息
     * anything other than the time.
     * @param {String} format The format to check
     * @return {Boolean} True if the format contains information about
     * date/day information.
     * @method
     */
    formatContainsDateInfo: (function() {
        var stripEscapeRe = /(\\.)/g,
            dateInfoRe = /([djzmnYycU]|MS)/;

        return function(format) {
            return dateInfoRe.test(format.replace(stripEscapeRe, ''));
        };
    })(),


    /**
     * @param {Number} month A zero-based javascript month number.
     * @return {String} The short month name.
     */
    getShortMonthName: function(month) {
        return this.monthNames[month].substring(0, 3);
    },

    /**
     * @param {Number} day A zero-based javascript day number.
     * @return {String} The short day name.
     */
    getShortDayName: function(day) {
        return this.dayNames[day].substring(0, 3);
    },

    /**
     * @param {String} name The short/full month name.
     * @return {Number} The zero-based javascript month number.
     */
    getMonthNumber: function(name) {
        // handle camel casing for english month names (since the keys for the this.monthNumbers hash are case sensitive)
        return this.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
    },
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
    isValid: function(y, m, d, h, i, s, ms) {
        // setup defaults
        h = h || 0;
        i = i || 0;
        s = s || 0;
        ms = ms || 0;

        // Special handling for year < 100
        var dt = this.add(new Date(y < 100 ? 100 : y, m - 1, d, h, i, s, ms), this.YEAR, y < 100 ? y - 100 : 0);

        return y == dt.getFullYear() &&
            m == dt.getMonth() + 1 &&
            d == dt.getDate() &&
            h == dt.getHours() &&
            i == dt.getMinutes() &&
            s == dt.getSeconds() &&
            ms == dt.getMilliseconds();
    },
    /**
     * 判断当前年份是否闰年
     * @param {int|Date} year 年份或者日期对象
     * @return {boolean}
     */
    isLeapYear: function(year) {
        year = isDate(year) ? year.getFullYear() : parseInt(year, 10);
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },
    /**
     * @param {Date} date The date
     * @return {Number} The day number (0-6).
     */
    getFirstDayOfMonth: function(date) {
        var day = (date.getDay() - (date.getDate() - 1)) % 7;
        return (day < 0) ? (day + 7) : day;
    },

    /**
     * @param {Date} date The date
     * @return {Number} The day number (0-6).
     */
    getLastDayOfMonth: function(date) {
        return this.getLastDateOfMonth(date).getDay();
    },


    /**
     * 获取本月第一天
     * @param {Date} date The date
     * @return {Date}
     */
    getFirstDateOfMonth: function(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },

    /**
     * 获取本月最后一天
     * @param {Date} date The date
     * @return {Date}
     */
    getLastDateOfMonth: function(date) {
        return new Date(date.getFullYear(), date.getMonth(), this.getDaysInMonth(date));
    },

    /**
     * 获取本月有多少天数
     * 还有个方法：日期设置上个月的日期为0，那么就可以得到这个月的最后一天日期
     * examples : date1.setDate(1);date1.setMonth( date1.getMonth()+1 );date1.setDate(0);return date1.getDate(); 	
     * @param {Date} date The date
     * @return {Number} 本月天数
     */
    getDaysInMonth: (function() {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        return function(date) { // return a closure for efficiency
            var m = date.getMonth();
            return m == 1 && this.isLeapYear(date) ? 29 : daysInMonth[m];
        };
    })(),

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
    getTimezone: function(date) {
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
    },

    /**
     * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
     * @param {Date} date The date
     * @param {Boolean} colon (optional) true to separate the hours and minutes with a colon (defaults to false).
     * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600').
     */
    getGMTOffset: function(date, colon) {
        var offset = date.getTimezoneOffset();
        return (offset > 0 ? "-" : "+") +
            this.pad(Math.floor(Math.abs(offset) / 60), 2, "0") +
            (colon ? ":" : "") +
            this.pad(Math.abs(offset % 60), 2, "0");
    },

    /**
     * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
     * @param {Date} date The date
     * @return {String} 'st, 'nd', 'rd' or 'th'.
     */
    getSuffix: function(date) {
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
    },

    /**
     * 获取当前日期在本年的天数 从0开始
     * @param {Date} date The date
     * @return {Number} 0 to 364 (365 in leap years).
     */
    getDayOfYear: function(date) {
        var num = 0,
            d = this.clone(date),
            m = date.getMonth(),
            i;

        for (i = 0, d.setDate(1), d.setMonth(0); i < m; d.setMonth(++i)) {
            num += this.getDaysInMonth(d);
        }
        return num + date.getDate() - 1;
    },

    getQuarterOfYear: function(date) {
        return Math.ceil((date.getMonth() + 1) / 3);
    },

    /**
     * 获取 ISO-8601 周数
     * (equivalent to the format specifier 'W', but without a leading zero).
     * @param {Date} date The date
     * @return {Number} 1 to 53
     * @method
     */
    getWeekOfYear: (function() {
        // adapted from http://www.merlyn.demon.co.uk/weekcalc.htm
        var ms1d = 864e5, // milliseconds in a day
            ms7d = 7 * ms1d; // milliseconds in a week

        return function(date) { // return a closure so constants get calculated only once
            var DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d, // an Absolute Day Number
                AWN = Math.floor(DC3 / 7), // an Absolute Week Number
                Wyr = new Date(AWN * ms7d).getUTCFullYear();

            return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
        };
    })(),

    /**
     * 判断两个日期是否相等
     * @param {Date} date1
     * @param {Date} date2
     * @return {Boolean} 
     */
    isEqual: function(date1, date2) {
        // check we have 2 date objects
        if (date1 && date2) {
            return (date1.getTime() === date2.getTime());
        }
        // one or both isn't a date, only equal if both are falsey
        return !(date1 || date2);
    },
    /**
     * 复制当前日期对象
     * @param {Date}
     * @return {Date}
     */
    clone: function(date) {
        return new Date(+date);
    },

    /**
     * 返回2日期之间的毫秒数
     * @param {Date} dateA The first date
     * @param {Date} dateB (optional) The second date, defaults to now
     * @return {Number} The difference in milliseconds
     */
    getElapsed: function(dateA, dateB) {
        return Math.abs(dateA - (dateB || new Date()));
    },

    addFormatCode: function(code, formatter) {
        this.formatCodes[code] = formatter;
        return this;
    },

    formatCodes: {
        d: function(date) {
            return this.pad(date.getDate(), 2, '0');
        },
        D: function(date) {
            return this.getShortDayName(date.getDay());
        }, // get localised short day name
        j: function(date) {
            return date.getDate();
        },
        l: function(date) {
            return this.dayNames[date.getDay()];
        },
        N: function(date) {
            return date.getDay() ? date.getDay() : 7;
        },
        S: function(date) {
            return this.getSuffix(date);
        },
        w: function(date) {
            return date.getDay();
        },
        z: function(date) {
            return this.getDayOfYear(date);
        },
        W: function(date) {
            return this.pad(this.getWeekOfYear(date), 2, '0');
        },
        F: function(date) {
            return this.monthNames[date.getMonth()];
        },
        m: function(date) {
            return this.pad(date.getMonth() + 1, 2, '0');
        },
        M: function(date) {
            return this.getShortMonthName(date.getMonth());
        }, // get localised short month name
        n: function(date) {
            return date.getMonth() + 1;
        },
        t: function(date) {
            return this.getDaysInMonth(date);
        },
        L: function(date) {
            return this.isLeapYear(date) ? 1 : 0;
        },
        o: function(date) {
            return date.getFullYear() + (this.getWeekOfYear(date) == 1 && date.getMonth() > 0 ? +1 : (this.getWeekOfYear(date) >= 52 && date.getMonth() < 11 ? -1 : 0));
        },
        Y: function(date) {
            return this.pad(date.getFullYear(), 4, '0');
        },
        y: function(date) {
            return ('' + date.getFullYear()).substring(2, 4);
        },
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
            return this.pad((date.getHours() % 12) ? date.getHours() % 12 : 12, 2, '0');
        },
        H: function(date) {
            return this.pad(date.getHours(), 2, '0')
        },
        i: function(date) {
            return this.pad(date.getMinutes(), 2, '0');
        },
        s: function(date) {
            return this.pad(date.getSeconds(), 2, '0');
        },
        u: function(date) {
            return this.pad(date.getMilliseconds(), 3, '0')
        },
        O: function(date) {
            return this.getGMTOffset(date);
        },
        P: function(date) {
            return this.getGMTOffset(date, true);
        },
        T: function(date) {
            return this.getTimezone(date);
        },
        Z: function(date) {
            return date.getTimezoneOffset() * -60;
        },
        c: function(date) { //ISO-8601 -- GMT format
            return [
                this.getFormatCode('Y')(date),
                '-',
                this.getFormatCode('m')(date),
                '-',
                this.getFormatCode('d')(date),
                'T',
                this.getFormatCode('H')(date),
                ':',
                this.getFormatCode('i')(date),
                ':',
                this.getFormatCode('s')(date),
                this.getFormatCode('P')(date)
            ].join('');
        },
        U: function(date) {
            return Math.round(date.getTime() / 1000);
        },
        Q: function(date) {
            return this.pad(Math.ceil((date.getMonth() + 1) / 3), 2, '0');
        },
        q: function() {
            return Math.ceil((date.getMonth() + 1) / 3);
        }
    },

    getFormatCode: function(code) {
        var self = this,
            formatCodes = this.formatCodes;
        return function(date) {
            return formatCodes[code].call(self, date);
        };
    },
    /** 
     * 日期格式化
     * @param {Date}
     * @param {String}
     * @return {String}
     */
    format: function(date, format) {
        var self = this,
            reg = ['\\\\?['],
            _reg = [],
            format = format || this.defaultFormat,
            parseCodes = this.parseCodes;

        for (var k in parseCodes) {
            _reg.push(k);
        }

        reg.push(_reg.join('|'));

        reg.push(']');

        var formatRegex = new RegExp(reg.join(''), 'g');

        var result = format.replace(formatRegex, function(ch, idx) {
            if (ch.charAt(0) == "\\") return ch.slice(1);

            return self.getFormatCode(ch)(date);
        });

        return '' + result;
    },

    formatDate: function() {
        return this.format.apply(this, arguments);
    },

    addParseCode: function(code, regex, parser) {
        this.parseCodes[code] = {
            f: parser,
            r: regex
        };
        return this;
    },

    // private
    parseCodes: {
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
            for (var a = [], i = 0; i < 7; a.push(this.getShortDayName(i)), ++i); // get localised short day names
            return {
                f: null,
                r: "(?:" + a.join("|") + ")"
            };
        },
        l: function() {
            return {
                f: null,
                r: "(?:" + this.dayNames.join("|") + ")"
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
                    date.m = parseInt(this.getMonthNumber(v), 10);
                }, // get localised month number
                r: "(" + this.monthNames.join("|") + ")"
            };
        },
        M: function() {
            for (var a = [], i = 0; i < 12; a.push(this.getShortMonthName(i)), ++i); // get localised short month names
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
            return this.parseCodes.Y;
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
                date.y = _y > this.y2kYear ? 1900 + _y : 2000 + _y;
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
            return this.parseCodes.a;
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

                date.o = ((-12 <= (hr * 60 + mn) / 60) && ((hr * 60 + mn) / 60 <= 14)) ? (sn + this.pad(hr, 2, '0') + this.pad(mn, 2, '0')) : null;
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

                date.o = ((-12 <= (hr * 60 + mn) / 60) && ((hr * 60 + mn) / 60 <= 14)) ? (sn + this.pad(hr, 2, '0') + this.pad(mn, 2, '0')) : null;
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
                    this.getParseCode("Y"), // year
                    this.getParseCode("m"), // month
                    this.getParseCode("d"), // day
                    this.getParseCode("h"), // hour
                    this.getParseCode("i"), // minute
                    this.getParseCode("s") // second
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
    },

    getParseCode: function(code) {
        var pCode = this.parseCodes[code];

        if (isFunction(pCode)) pCode = pCode.call(this);

        return pCode;
    },
    //缓存
    parseFunctions: {},

    createParser: function(format) {
        if (this.parseFunctions[format]) {
            return this.parseFunctions[format];
        }
        //eg: step1: foramt = Y-m-d\s
        var obj, parser,
            self = this,
            calc = [],
            reg = ['\\\\?['],
            _reg = [],
            reg2 = [],
            parseCodes = this.parseCodes,
            _format = format,
            format = escapeRegex(format || this.defaultFormat);

        //eg: after escapeRegex => step2: foramt = Y\-m\-d\\s //此处的\s不应该转成\\s 所以后续需要转回\s	

        for (var k in parseCodes) {
            _reg.push(k);
            reg2.push('\\\\' + k);
        }

        reg.push(_reg.join('|'));

        reg.push(']');

        reg = reg.join('');

        format = format.replace(new RegExp(reg2.join('|', 'g')), function(ch) {
            return ch.replace('\\', '');
        });
        //eg: step3: foramt = Y\-m\-d\s

        var parseRegex = new RegExp(reg, 'g');

        var regExp = format.replace(parseRegex, function(ch, idx) {
            if (ch.charAt(0) == "\\") return ch.slice(1);

            obj = self.getParseCode(ch);

            if (obj.f) {
                calc.push(obj);
            }

            return obj.r;
        });

        parser = function(input, strict) {
            var ret = input.match(regExp);
            if (!ret) return;

            var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,
                sn, hr, mn,
                date = {},
                fnCall = [],
                fnCallEnd = [],
                def = self.defaults;

            for (var i = 0; i < calc.length; i++) {
                var obj = calc[i];
                var match = ret[i + 1];
                if (obj.calcAtEnd) {
                    fnCallEnd.push({ fn: obj.f, params: [match, date, strict, i + 1, ret] });
                } else {
                    fnCall.push({ fn: obj.f, params: [match, date, strict, i + 1, ret] });
                }
            }

            for (var i = 0, calls = fnCall.concat(fnCallEnd); i < calls.length; i++) {
                var obj = calls[i];
                if (obj.fn && isFunction(obj.fn)) {
                    obj.fn.apply(self, obj.params);
                }
            }

            if (date.u != null) {
                v = new Date(date.u * 1000);
            } else {
                dt = self.clearTime(new Date);

                y = defalut(date.y, defalut(def.y, dt.getFullYear()));
                m = defalut(date.m, defalut(def.m, dt.getMonth()));
                d = defalut(date.d, defalut(def.d, dt.getDate()));

                h = defalut(date.h, defalut(def.h, dt.getHours()));
                i = defalut(date.i, defalut(def.i, dt.getMinutes()));
                s = defalut(date.s, defalut(def.s, dt.getSeconds()));
                ms = defalut(date.ms, defalut(def.ms, dt.getMilliseconds()));

                z = date.z;

                if (z >= 0 && y >= 0) {
                    // both the year and zero-based day of year are defined and >= 0.
                    // these 2 values alone provide sufficient info to create a full date object

                    // create Date object representing January 1st for the given year
                    // handle years < 100 appropriately
                    v = self.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), self.YEAR, y < 100 ? y - 100 : 0);

                    // then add day of year, checking for Date "rollover" if necessary
                    v = !strict ? v : (strict === true && (z <= 364 || (self.isLeapYear(v) && z <= 365)) ? self.add(v, self.DAY, z) : null);
                } else if (strict === true && !self.isValid(y, m + 1, d, h, i, s, ms)) { // check for Date "rollover"
                    v = null; // invalid date, so return null
                } else {
                    // plain old Date object
                    // handle years < 100 properly
                    v = self.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), self.YEAR, y < 100 ? y - 100 : 0);
                }

            }

            if (v) {
                zz = date.zz;
                o = date.o;
                // favour UTC offset over GMT offset
                if (zz != null) {
                    // reset to UTC, then add offset
                    v = self.add(v, self.SECOND, -v.getTimezoneOffset() * 60 - zz);
                } else if (o) {
                    sn = date.sn;
                    hr = date.hr;
                    mn = date.mn;
                    // reset to GMT, then add offset
                    v = self.add(v, self.MINUTE, -v.getTimezoneOffset() + (sn == '+' ? -1 : 1) * (hr * 60 + mn));
                }
            }

            return v;
        };

        this.parseFunctions[_format] = parser;

        return parser;
    },

    parse: function(input, format, strict) {

        if (Date.parse && arguments.length == 1) {
            let r = Date.parse(input);
            if (r) return new Date(r);
        }

        return this.createParser(format)(input, strict);
    },

    parseDate: function(input, format, strict) {
        return this.parse(input, format, strict);
    },

    /**
     * Checks if the current date is affected by Daylight Saving Time (DST).
     * @param {Date} date The date
     * @return {Boolean} True if the current date is affected by DST.
     */
    isDST: function(date) {
        // adapted from http://sencha.com/forum/showthread.php?p=247172#post247172
        // courtesy of @geoffrey.mcgill
        return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() != date.getTimezoneOffset();
    },

    /**
     * Attempts to clear all time information from this Date by setting the time to midnight of the same day,
     * automatically adjusting for Daylight Saving Time (DST) where applicable.
     * (note: DST timezone information for the browser's host operating system is assumed to be up-to-date)
     * @param {Date} date The date
     * @param {Boolean} clone true to create a clone of this date, clear the time and return it (defaults to false).
     * @return {Date} this or the clone.
     */
    clearTime: function(date, clone) {
        if (clone) {
            return this.clearTime(this.clone(date));
        }

        // get current date before clearing time
        var d = date.getDate();

        // clear time
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        if (date.getDate() != d) { // account for DST (i.e. day of month changed when setting hour = 0)
            // note: DST adjustments are assumed to occur in multiples of 1 hour (this is almost always the case)
            // refer to http://www.timeanddate.com/time/aboutdst.html for the (rare) exceptions to this rule

            // increment hour until cloned date == current date
            for (var hr = 1, c = this.add(date, this.HOUR, hr); c.getDate() != d; hr++, c = this.add(date, this.HOUR, hr));

            date.setDate(d);
            date.setHours(c.getHours());
        }

        return date;
    },
    /**
     * 日期推移
     * @param {Date}
     * @param {String} interval 添加间隔类型 年y 月mo 日d 小时h 分mi 秒s 毫秒ms
     * @param {Int}	number 添加时间间隔值,可以是正负值
     */
    add: function(date, interval, value) {
        var d = this.clone(date);
        if (!interval || value === 0) return d;

        switch (interval.toLowerCase()) {
            case this.MILLI:
                d.setMilliseconds(d.getMilliseconds() + value);
                break;
            case this.SECOND:
                d.setSeconds(d.getSeconds() + value);
                break;
            case this.MINUTE:
                d.setMinutes(d.getMinutes() + value);
                break;
            case this.HOUR:
                d.setHours(d.getHours() + value);
                break;
            case this.DAY:
                d.setDate(d.getDate() + value);
                break;
            case this.WEEKDAY:
                //i18n FIXME: assumes Saturday/Sunday weekend, but this is not always true.  see dojo/cldr/supplemental

                // Divide the increment time span into weekspans plus leftover days
                // e.g., 8 days is one 5-day weekspan / and two leftover days
                // Can't have zero leftover days, so numbers divisible by 5 get
                // a days value of 5, and the remaining days make up the number of weeks
                var days, weeks, amount = parseInt(value, 10);
                var mod = amount % 5;
                if (!mod) {
                    days = (amount > 0) ? 5 : -5;
                    weeks = (amount > 0) ? ((amount - 5) / 5) : ((amount + 5) / 5);
                } else {
                    days = mod;
                    weeks = parseInt(amount / 5);
                }
                // Get weekday value for orig date param
                var strt = date.getDay();
                // Orig date is Sat / positive incrementer
                // Jump over Sun
                var adj = 0;
                if (strt == 6 && amount > 0) {
                    adj = 1;
                } else if (strt == 0 && amount < 0) {
                    // Orig date is Sun / negative incrementer
                    // Jump back over Sat
                    adj = -1;
                }
                // Get weekday val for the new date
                var trgt = strt + days;
                // New date is on Sat or Sun
                if (trgt == 0 || trgt == 6) {
                    adj = (amount > 0) ? 2 : -2;
                }
                // Increment by number of weeks plus leftover days plus
                // weekend adjustments
                amount = (7 * weeks) + days + adj;

                d = this.add(d, this.DAY, amount);
                break;
            case this.WEEK:
                d = this.add(d, this.DAY, value * 7);
                break;
            case this.MONTH:
                var day = date.getDate();
                if (day > 28) {
                    day = Math.min(day, this.getLastDateOfMonth(this.add(this.getFirstDateOfMonth(date), 'mo', value)).getDate());
                }
                d.setDate(day);
                d.setMonth(date.getMonth() + value);
                break;
            case this.QUARTER:
                d = this.add(d, this.MONTH, value * 3);
                break;
            case this.YEAR:
                d.setFullYear(date.getFullYear() + value);
                break;
        }
        return d;
    },
    /**
     * Checks if a date falls on or between the given start and end dates.
     * @param {Date} date The date to check
     * @param {Date} start Start date
     * @param {Date} end End date
     * @return {Boolean} true if this date falls on or between the given start and end dates.
     */
    between: function(date, start, end) {
        var t = date.getTime();
        return start.getTime() <= t && t <= end.getTime();
    },
    /** 
     * Get the difference in a specific unit of time (e.g., number of
     *	months, weeks, days, etc.) between two dates, rounded to the
     *	nearest integer.
     * @param {Date}
     * @param {Date?} Defaults now()
     * @param {String?} Defaults d
     * @return {Number}
     */
    difference: function(date1, date2, interval) {
        var date = this;
        date2 = date2 || new Date();
        interval = interval || date.DAY;
        var yearDiff = date2.getFullYear() - date1.getFullYear();
        var delta = 1; // Integer return value
        //see dojo date
        switch (interval) {
            case date.QUARTER:
                var m1 = date1.getMonth();
                var m2 = date2.getMonth();
                // Figure out which quarter the months are in
                var q1 = Math.floor(m1 / 3) + 1;
                var q2 = Math.floor(m2 / 3) + 1;
                // Add quarters for any year difference between the dates
                q2 += (yearDiff * 4);
                delta = q2 - q1;
                break;
            case date.WEEKDAY:
                var days = Math.round(date.difference(date1, date2, date.DAY));
                var weeks = parseInt(date.difference(date1, date2, date.WEEK));
                var mod = days % 7;

                // Even number of weeks
                if (mod == 0) {
                    days = weeks * 5;
                } else {
                    // Weeks plus spare change (< 7 days)
                    var adj = 0;
                    var aDay = date1.getDay();
                    var bDay = date2.getDay();

                    weeks = parseInt(days / 7);
                    mod = days % 7;
                    // Mark the date advanced by the number of
                    // round weeks (may be zero)
                    var dtMark = new Date(date1);
                    dtMark.setDate(dtMark.getDate() + (weeks * 7));
                    var dayMark = dtMark.getDay();

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
            case date.YEAR:
                delta = yearDiff;
                break;
            case date.MONTH:
                delta = (date2.getMonth() - date1.getMonth()) + (yearDiff * 12);
                break;
            case date.WEEK:
                // Truncate instead of rounding
                // Don't use Math.floor -- value may be negative
                delta = parseInt(date.difference(date1, date2, date.DAY) / 7);
                break;
            case date.DAY:
                delta /= 24;
                // fallthrough
            case date.HOUR:
                delta /= 60;
                // fallthrough
            case date.MINUTE:
                delta /= 60;
                // fallthrough
            case date.SECOND:
                delta /= 1000;
                // fallthrough
            case date.MILLI:
                delta *= date2.getTime() - date1.getTime();
        }

        // Round for fractional values and DST leaps
        return Math.round(delta); // Number (integer)	
    },
    diff: function() {
        return this.difference.apply(this, arguments);
    },
    part: function(date, interval) {
        interval = interval || 'd';
        return this.format(date, interval);
    }
};

export default DateUtil;