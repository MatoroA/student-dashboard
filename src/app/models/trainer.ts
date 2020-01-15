export class Trainer{
    private id: string;
    private courseId: string;
    private name: string;
    private surname: string;
    private email: string;
    private cellphone: string;
    private password: string;
    private courseList: string[];

    constructor(){
        this.courseList = [];   

    }
    public setId(id: string){
        this.id = id;
    }
    public getId(){
        return this.id;
    }
    public setCellphone(cellphone: string){
        this.cellphone = cellphone;
    }
    public getCellphone(){
        return this.cellphone;
    }
    public setPassword(password: string){
        this.password = password;
    }
    public getPassword(){
        return this.password;
    }
    public setEmail(email: string){
        this.email = email;
    }
    public getEmail(){
        return this.email;
    }
    public setCourseId(courseId: string){
        this.courseId = courseId;
    }
    public getCourseId(){
        return this.courseId;
    }
    public setName(name: string){
        this.name = name;
    }
    public getName(){
        return this.name;
    }
    public setSurname(surname: string){
        this.surname = surname;
    }
    public getSurnmae(){
        return this.surname;
    }
    public setCourseList(course: string){
        this.courseList.push(course);
    }
    public getCourseList(){
        return this.courseList;
    }
}