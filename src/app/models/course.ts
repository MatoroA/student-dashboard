import { Content } from './content-interface';
import { Message } from './message';
import { CourseMessage } from './binndingMeaageAndCourse';
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
    news: Message[];
    id: string;
    deposit: number;
    coverUrl: string;
}