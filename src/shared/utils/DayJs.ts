import dayjs from "dayjs";

function currentDate() {
    return dayjs().format('YYYY-MM-DD');
}

function tomorrowDate() {
    return dayjs().add(1, "day").format('YYYY-MM-DD');
}

export { currentDate, tomorrowDate };
