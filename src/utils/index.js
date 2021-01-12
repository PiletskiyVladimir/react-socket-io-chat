/* eslint-disable */
import moment from 'moment';

const switchMonth = (month) => {
    switch (month) {
        case 0: {
            return 'January'
        }
        case 1: {
            return 'February'
        }
        case 2: {
            return 'March'
        }
        case 3: {
            return 'April'
        }
        case 4: {
            return 'May'
        }
        case 5: {
            return 'June'
        }
        case 6: {
            return 'July'
        }
        case 7: {
            return 'August'
        }
        case 8: {
            return 'September'
        }
        case 9: {
            return 'October'
        }
        case 10: {
            return 'November'
        }
        case 11: {
            return 'December'
        }
    }
}

const beautifyTime = (number) => {
    if (number < 10) {
        return '0' + number
    } else {
        return number
    }
}

const returnTimeObj = (time) => {
    let parseTime;

    if (time) {
        parseTime = moment(time);
    } else {
        parseTime = moment();
    }

    return { day: beautifyTime(parseTime.date()), month: parseTime.month(), year: parseTime.year(), hours: beautifyTime(parseTime.hour()), minutes: beautifyTime(parseTime.minutes()) }
}

const normalizeTime = (time) => {
    let currentTime = returnTimeObj();

    let messageTime = returnTimeObj(time);

    let resultedStr = '';

    if (currentTime.year > messageTime.year) {
        resultedStr = `${messageTime.day} ${switchMonth(messageTime.month)} ${messageTime.year}`;
    } else {
        if (currentTime.month > messageTime.month) {
            resultedStr = `${messageTime.day} ${switchMonth(messageTime.month)}`;
        } else {
            if (currentTime.day > messageTime.day) {
                resultedStr = `${messageTime.day} ${switchMonth(messageTime.month)} ${messageTime.hours}:${messageTime.minutes}`
            } else {
                resultedStr = `${messageTime.hours}:${messageTime.minutes}`;
            }
        }
    }

    return resultedStr;
}

const cutMessage = (str, length) => {
    if (str.length >= length) {
        return str.slice(0, length - 1) + "..."
    } else {
        return str;
    }
}

export {
    normalizeTime,
    returnTimeObj,
    cutMessage
}