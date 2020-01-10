import { Student } from './student';
import { Course } from './course';

export class EnrolledStudent{
    private studentsList: Array<Student>;
    private course: Course;
    private courseId: string;

    public constructor(){
        this.studentsList = new Array<Student>();
    }

    public setCourseId(courseId: string){
        this.courseId = courseId;
    }

    public getCourseId(){
        return this.courseId;
    }

    public setStudentsList(item: Student){
        this.studentsList.push(item);
    }
    public getStudentsList(): Array<Student>{
        return this.studentsList;
    }
    public setCourse(item: Course){
        this.course = item;
    }
    public getCourse(){
        return this.course;
    }

    
}