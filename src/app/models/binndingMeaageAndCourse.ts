import { Message } from './message';

export class CourseMessage{
    private courseId: string;
    private messages: Message[];

    constructor(){
        this.messages = [];
    }

    setMessages(messages: Message){
        this.messages.push(messages);
    }
    getMessages(): Message[]{
        return this.messages;
    }

    setCourseId(courseId: string){
        this.courseId = courseId;
    }
    getCourseId(){
        return this.courseId;
    }

}