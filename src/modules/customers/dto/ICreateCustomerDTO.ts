import { GenderTypeEnum } from "../enum/GenderTypeEnum";

interface ICreateCustomerDTO {
    id?: string;
    name: string;
    gender: GenderTypeEnum;
    birth_date: Date;
    city_id: string;
}

export { ICreateCustomerDTO };
