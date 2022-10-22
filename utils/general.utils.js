import dayjs from 'dayjs';
import { roles } from './auth.utils';

export const formatDate = (date) => {
    return dayjs(date).format('DD-MM-YYYY');
};

export const onInputLengthValidation = (e, length) => {
    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, length);
};

export const stringContainsAny = (string, arrayOfPossibleWords) => {
    let res = false;

    res = arrayOfPossibleWords.some((possibleWord) => string.includes(possibleWord));

    return res;
};

export const isValidEmail = (emailEntered) => {
    return /^[a-zA-Z0-9_.-]*\@(gmail|hotmail|yahoo|live)\.(com|ar|es|br|cl|mx)(\.[a-zA-Z].*)*$/.test(emailEntered);
};

export const getCommissionPercentage = (userType, isSubSeller, isSuperSeller, userId, sellerId) => {
    if (isSubSeller && userId == sellerId) {
        return 0.8;
    }

    if (isSuperSeller && userId != sellerId) {
        return 0.2;
    }

    if (isSuperSeller && userId == sellerId) {
        return 1;
    }

    if (userId == sellerId) {
        return 1;
    }

    if (userType == roles.SUPER_ADMIN || userType == roles.ADMIN) {
        return 1;
    }

    return 0;
};
