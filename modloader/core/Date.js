/**
 * Return a formatted date string mimicking PHP's date() functionality
 * 
 * Inspired by https://gist.github.com/micah1701/4120120?permalink_comment_id=5108082#gistcomment-5108082
 * 
 * Missing format characters: N, S, z, W, t, L, o, X, x, B, u, v, e, I, O, P, p, t, Z, r, u
 *
 * @param {string} format - PHP-style date format https://www.php.net/manual/en/datetime.format.php
 * @param {(Date|string|number)} [date] - date Object, date string, or milliseconds
 * 
 * @returns {string} formatted date
 */
export const formatDate = (format, date) => {
    let dateToFormat = date;
    if (!dateToFormat) {
        dateToFormat = new Date();
    } else if (!(dateToFormat instanceof Date)) {
        try {
            if (typeof dateToFormat === 'number') {
                dateToFormat = new Date(dateToFormat);
            } else {
                dateToFormat = new Date(dateToFormat.replace(/-/g, '/'));
            }
        } catch (e) {
            dateToFormat = new Date();
        }
    }

    let formattedDate = '';
    const month = dateToFormat.getMonth();
    const monthFrom1 = month + 1;
    const dayOfWeek = dateToFormat.getDay();
    const day = dateToFormat.getDate();
    const year = dateToFormat.getFullYear();
    const hours = dateToFormat.getHours();
    const minutes = dateToFormat.getMinutes();
    const seconds = dateToFormat.getSeconds();

    for (let i = 0; i < format.length; i++) {
        switch (format[i]) {
            case '\\': { // Handle escaped characters
                i++;
                formattedDate += format[i];
                break;
            }
            case 'D': { // A textual representation of a day, three letters
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
                formattedDate += days[dayOfWeek];
                break;
            }
            case 'd': { // Day of the month, 2 digits with leading zeros (01 to 31)
                formattedDate += String(day).padStart(2, '0');
                break;
            }
            case 'j': { // Day of the month without leading zeros  (1 to 31)
                formattedDate += day;
                break;
            }
            case 'l': { // (lowercase 'L') A full textual representation of the day of the week
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                formattedDate += days[dayOfWeek];
                break;
            }
            case 'w': { // Numeric representation of the day of the week (0=Sunday,1=Monday,...6=Saturday)
                formattedDate += dayOfWeek;
                break;
            }
            case 'F': { // A full textual representation of a month, such as January or March
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                formattedDate += months[month];
                break;
            }
            case 'm': { // Numeric representation of a month, with leading zeros (01 to 12)
                formattedDate += String(monthFrom1).padStart(2, '0');
                break;
            }
            case 'M': { // A short textual representation of a month, three letters (Jan - Dec)
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                formattedDate += months[month];
                break;
            }
            case 'n': { // Numeric representation of a month, without leading zeros (1 to 12)
                formattedDate += monthFrom1;
                break;
            }
            case 'Y': { // A full numeric representation of a year, 4 digits (1999 OR 2003)
                formattedDate += year;
                break;
            }
            case 'y': { // A two digit representation of a year (99 OR 03)
                formattedDate += String(year).slice(-2);
                break;
            }
            case 'a': { // Lowercase Ante meridiem and Post meridiem (am or pm)
                formattedDate += (hours < 12) ? 'am' : 'pm';
                break;
            }
            case 'A': { // Uppercase Ante meridiem and Post meridiem (AM or PM)
                formattedDate += (hours < 12) ? 'AM' : 'PM';
                break;
            }
            case 'g': { // 12-hour format of an hour without leading zeros (1 to 12)
                const hour = (hours === 0) ? 12 : hours;
                formattedDate += (hour > 12) ? hour - 12 : hour;
                break;
            }
            case 'G': { // 24-hour format of an hour without leading zeros (0 to 23)
                formattedDate += hours;
                break;
            }
            case 'h': { // 12-hour format of an hour with leading zeros (01 to 12)
                const hour = (hours === 0) ? 12 : ((hours > 12) ? hours - 12 : hours);
                formattedDate += String(hour).padStart(2, '0');
                break;
            }
            case 'H': { // 24-hour format of an hour with leading zeros (00 to 23)
                formattedDate += String(hours).padStart(2, '0');
                break;
            }
            case 'i': { // Minutes with leading zeros (00 to 59)
                formattedDate += String(minutes).padStart(2, '0');
                break;
            }
            case 's': { // Seconds, with leading zeros (00 to 59)
                formattedDate += String(seconds).padStart(2, '0');
                break;
            }
            case 'c': { // ISO 8601 date (eg: 2012-11-20T18:05:54.944Z)
                formattedDate += dateToFormat.toISOString();
                break;
            }
            default: {
                formattedDate += format[i];
                break;
            }
        }
    }

    return formattedDate;
};
