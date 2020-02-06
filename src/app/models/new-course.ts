import { Content } from './content-interface';

export class NewCourse{
    private courseName: string;
    private courseFee: string;
    private courseId: string;
    private duration: string;
    private description: string;
    private requirements: string[];
    private startDate: string;
    private endDate: string;
    private coverImage: string;
    private imageName: string;
    private code: string;
    private courseContentDb: Content[];
    private feesInclude: string[];

    constructor(){
        this.courseContentDb = [];
        this.requirements = [];
        this.feesInclude = [];
    }

    public setFeesInclude(item: string){
        this.feesInclude.push(item);
    }

    public getFeesInclude(){
        return this.feesInclude;
    }
    
    public setCourseContent(info: Content){
        this.courseContentDb.push(info);
    }
    getCourseContent(){
        return this.courseContentDb;
    }

    setCourseName(name: string){
        this.courseName = name;
    }
    getCourseName(){
        return this.courseName;
    }

    setCourseFee(fee: string){
        this.courseFee = fee;
    }
    getCourseFee(){
        return this.courseFee;
    }
    setCourseId(id: string){
        this.courseId = id;
    }
    getCourseId(){
        return this.courseId;
    }
    setDuration(duration: string){
        this.duration = duration;
    }
    getDuration(){
        return this.duration;
    }

    setDescription(description: string){
        this.description = description;
    }
    getDescription(){
        return this.description;
    }

    setReuirements(requirement: string){
        this.requirements.push(requirement);
    }

    getRequirements(){
        return this.requirements;
    }
    setStartDate(date: string){
        this.startDate = date;
    }
    getStartDate(){
        return this.startDate;
    }

    setEndDate(date: string){
        this.endDate = date;
    }
    getSEndDate(){
        return this.endDate;
    }

    setImageCover(image: string){
        this.coverImage = image;
    }
    getImageCover(){
        return this.coverImage;
    }
    setImageName(imageName: string){
        this.imageName = imageName;
    }
    getImageName(){
        return this.imageName;
    }
    setCode(code: string){
        this.code = code;
    }
    getCode(){
        return this.code;
    }
}