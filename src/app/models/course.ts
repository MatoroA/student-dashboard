import { Content } from './content-interface';
export interface Course{
    code: string;
    description: string;
    duration: string;
    fee: string;
    name: string;
    paymentDuration: string;
    requirement: string[];
    contents?: Content[];
    feesInclude?: string[];
    id: string;
    deposit: number;
    coverUrl: string;
}