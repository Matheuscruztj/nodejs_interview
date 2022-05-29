interface IDateProvider {
    convertStringToUtc(date: string): Date;
    convertToUtc(date: Date): string;
    dateNow(): Date;
    compareInYears(start_date: Date, end_date: Date): number;
    compareIfAfter(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
