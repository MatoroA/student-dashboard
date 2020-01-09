import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../models/course';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { StudentCourse } from '../models/studentCourse';

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth,
    private _storage: AngularFireStorage) { }

  async addCourse(form: any) {
    let courseDoc = {
      courseId: form.value.course_id,
      name: form.value.course,
      period: form.value.no + ' ' + form.value.period,
      courseFee: form.value.course_fee
    }
    return await this.afs.collection("courses").add(courseDoc);
  }

  addAdmin(email: string, password: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      const firebase = require('firebase');
      const firebaseFunction = firebase.functions();
      const adminRole = firebaseFunction.httpsCallable('addAdmin');
      adminRole({ email: email }).then(result => {
        console.log(result)
      })

    })

  }

  addTutor(email: string, password: string) {
    console.log("kkkkk")

    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      const firebase = require('firebase');
      const firebaseFunction = firebase.functions();
      const adminRole = firebaseFunction.httpsCallable('addTutor');
      adminRole({ email: email }).then(result => {
        console.log(result)
      })

    })

  }
  addStudent(email: string, password: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      const firebase = require('firebase');
      const firebaseFunction = firebase.functions();
      const adminRole = firebaseFunction.httpsCallable('addStudent');
      adminRole({ email: email }).then(result => {
        console.log(result)
      })

    })

  }
  getCourses() {
    return this.afs.collection<Course>('courses').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Course;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getStudents() {
    return this.afs.collection<Student>('students').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Student;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getStudentCourse() {
    return  this.afs.collection<StudentCourse>('studentCourse').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as StudentCourse;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  async getStudentEnrolled(){
    return await this.afs.collection<Course>('courses').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Course;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }
  getStudentDoc(id: string){
    let studentDoc = this.afs.doc<Student>("students/"+id);
    return studentDoc.valueChanges();
  }
   getCourseDocument(courseId: string) : Observable<Course>{

    let courseDoc = this.afs.doc<Course>("courses/"+courseId)

    return courseDoc.valueChanges();
  }

  async signIn(email: string, password) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  async uploadingImage(folder: string, courseId: string, fileName: string, file: File) {
    return await this._storage.upload(folder + '/' + courseId + '/' + fileName + '/', file);
  }
  async updateCourseDBData(courseId: string, coverImage: string) {
    let doc = {
      coverUrl: coverImage
    }
    return await this.afs.doc("courses/" + courseId).update(doc)
  }


  async uploadCourseRequirements(requirementsArray: string[], courseId: string) {
    return await this.afs.doc("courses/" + courseId).update({requirements: requirementsArray});
  }
}
