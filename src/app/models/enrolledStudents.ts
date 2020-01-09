import { Student } from './student';
import { Course } from './course';

export class EnrolledStudent{
    private students: Student[] = [];
    private course: Course;
    private courseId: string;

    public setCourseId(courseId: string){
        this.courseId = courseId;
    }

    public getCourseId(){
        return this.courseId;
    }

    public setStudent(item: Student){
        this.students.push(item);
    }
    public getStudent(){
        return this.students;
    }
    public setCourse(item: Course){
        this.course = item;
    }
    public getCourse(){
        return this.course;
    }

    
}