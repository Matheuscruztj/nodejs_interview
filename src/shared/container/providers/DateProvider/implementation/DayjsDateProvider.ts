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
    compareInYears(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "years");
    }
    compareIfAfter(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isAfter(end_date);
    }
}

export { DayjsDateProvider };
