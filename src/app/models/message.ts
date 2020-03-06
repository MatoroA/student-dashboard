export class Message{
    public title: string;
    public message: string;
    public format: string;

    constructor(){
    }

    public setTitle(title: string){
        this.title = title;
    }

    getTitle(){
        return this.title;
    }

    public setMessage(message: string){
        this.message = message;
    }

    getMessage(){
        return this.message;
    }

    setFormat(format: string){
        this.format = format;
    }
    getFormat(){
        return this.format;
    }
    getCourses(){
        return this.format;
    }
}