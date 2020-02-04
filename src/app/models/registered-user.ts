export class RegisteredUser {
    private name: string;
    private y: number;
    private waitingStudents: number;
    // private id: string;

    public constructor() {
        this.y = 0;
        this.waitingStudents = 0;
    }

    public addStudentsCount(){
        ++this.y;
    }

    getRegisteredStudentsCount(){
        return this.y;
    }

    public setCourseName(name: string){
        this.name = name;
    }

    public getCourse(){
        return this.name;
    }

    public incrementWaitingList(){
        ++this.waitingStudents;
    }
    public getWaitingStudents(){
        return this.waitingStudents;
    }
    // public setId(id: string){
    //     this.id = id;
    // }

    // public getId(){
    //     return this.id;
    // }
}