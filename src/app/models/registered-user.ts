export class RegisteredUser {
    private name: string;
    private count: number;
    // private id: string;

    public constructor() {
        this.count = 0;
    }

    public addStudentsCount(){
        ++this.count;
    }

    getRegisteredStudentsCount(){
        return this.count;
    }

    public setCourseName(name: string){
        this.name = name;
    }

    public getCourse(){
        return this.name;
    }
    // public setId(id: string){
    //     this.id = id;
    // }

    // public getId(){
    //     return this.id;
    // }
}