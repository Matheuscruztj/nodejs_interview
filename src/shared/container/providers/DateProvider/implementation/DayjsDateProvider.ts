import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    convertStringToUtc(date: string) {
        return dayjs(date).utc().toDate();
    }
    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }
    dateNow(): Date {
        return dayjs().toDate();
    }
    compareIfAfter(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isAfter(end_date);
    }
}

export { DayjsDateProvider };
