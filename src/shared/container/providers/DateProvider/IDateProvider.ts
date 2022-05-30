interface IDateProvider {
    convertStringToUtc(date: string): Date;
    convertToUtc(date: Date): string;
    dateNow(): Date;
    compareIfAfter(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
