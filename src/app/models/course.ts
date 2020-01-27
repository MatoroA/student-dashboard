import { Content } from './content-interface';
export interface Course{
    code: string;
    description: string;
    duration: string;
    fee: string;
    name: string;
    paymentDuration: string;
    requirements: string;
    contents?: Content[];
    id: string;
}