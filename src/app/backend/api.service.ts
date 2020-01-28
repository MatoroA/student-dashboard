import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../models/course';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { StudentCourse } from '../models/studentCourse';
import { Turtor } from '../models/turtor';
import { Trainer } from '../models/trainer';
import { NewCourse } from '../models/new-course';
import { Admin } from 'src/app/models/admin';
import { ArrayList } from 'src/app/models/custom-arraylist';
import { Content } from '../models/content-interface';

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth,
    private _storage: AngularFireStorage) { }


  updateCourseList(uid: string, courseId: String[]) {
    this.afs.doc("turtors/" + uid).update({ course: courseId })
  }
  async addAdmin(admin: Admin) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(admin.getEmail(), admin.getPassword()).then(user => {
      const firebase = require('firebase');
      const firebaseFunction = firebase.functions();
      const adminRole = firebaseFunction.httpsCallable('addAdmin');
      adminRole({ email: admin.getEmail() }).then(result => {
        console.log(result);

        let doc = {
          firstname: admin.getName(),
          lastname: admin.getSurname(),
          email: admin.getEmail(),
          cellPhone: admin.getCellPhone(),
          uid: user.user.uid
        }

        this.afs.doc("Users/" + user.user.uid).set(doc);


        return result;
      });
    });
  }

  updateStudentStatus(docId: string, registeredDocId: string, status: string) {
    console.log(docId)
    this.afs.doc("students/" + docId).update({ registered: registeredDocId }).then(() => {
      this.afs.doc("studentCourse/" + registeredDocId).update({ status: status })
    })
  }

  addTutor(trainer: Trainer) {

    console.log(trainer)
    return this.afAuth.auth.createUserWithEmailAndPassword(trainer.getEmail(), trainer.getPassword()).then(user => {

      const firebase = require('firebase');
      const firebaseFunction = firebase.functions();
      const roleTurtor = firebaseFunction.httpsCallable('addTurtor');
      roleTurtor({ email: trainer.getEmail() }).then(result => {
        console.log(result)

        let doc = {
          firstname: trainer.getName(),
          lastname: trainer.getSurnmae(),
          email: trainer.getEmail(),
          course: trainer.getCourseList(),
          uid: user.user.uid
        }
        this.afs.doc("turtors/" + user.user.uid).set(doc);
        return "User has been successfully created.....";
      });
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

  updateCourses(uid: string, collection: string, docId: string, coursesId: string[]) {
    return this.afs.doc(collection + "/" + docId).update({ course: coursesId })
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
    return this.afs.collection<StudentCourse>('studentCourse').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as StudentCourse;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getTurtors() {
    return this.afs.collection<Turtor>('turtors').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Turtor;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  async getStudentEnrolled() {
    return await this.afs.collection<Course>('courses').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Course;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }
  getStudentDoc(id: string) {
    let studentDoc = this.afs.doc<Student>("students/" + id);
    return studentDoc.valueChanges();
  }
  getTurtorDoc(id: string) {
    console.log(id)
    let studentDoc = this.afs.doc<Turtor>("turtors/" + id);
    return studentDoc.valueChanges();
  }
  getCourseDocument(courseId: string): Observable<Course> {

    let courseDoc = this.afs.doc<Course>("courses/" + courseId)

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
    return await this.afs.doc("courses/" + courseId).update({ requirements: requirementsArray });
  }

  async uploadCourse(course: NewCourse) {

    this._storage.upload("courses/" + course.getCourseName() + "/" + course.getImageName(), course.getImageCover()).then(results => {
      results.downloadURL
      results.ref.getDownloadURL().then(url => {
        let courseDoc = {
          coverUrl: url,
          code: course.getCourseId(),
          name: course.getCourseName(),
          requirement: course.getRequirements(),
          fee: course.getCourseFee(),
          description: course.getDescription()
        }

        console.log(courseDoc)

        return this.afs.collection("courses").add(courseDoc);
      })
    })
  }

  uploadFiles(course: NewCourse, courseContent: ArrayList) {

    for (let i = 0; i < courseContent.getAll().length; i++) {
      console.log(courseContent.getItemAt(i).getFileName())
      const task = this._storage.upload("courses/" + course.getCourseName() + "/contents/" + courseContent.getItemAt(i).getFileName(), courseContent.getItemAt(i).getFileUrl());
      courseContent.getItemAt(i).setProgress(task.percentageChanges());

      task.then(results => {
        console.log(results)
        results.ref.getDownloadURL().then(url => {
          const data: Content = {
            fileUrl: url,
            access: courseContent.getItemAt(i).getAudience(),
            title: courseContent.getItemAt(i).getTitle(),
            format: courseContent.getItemAt(i).getFormat()
          }

          course.setCourseContent(data);

          if (courseContent.getAll().length == i + 1) {
              this.afs.doc("courses/"+course.getCourseId()).update({contents: course.getCourseContent()})
            .then(res=>{
              console.log(res);
            })
          }

        })
      })
    }
    console.log(course.getCourseName())
  }
  //   const task = this._storage.upload(filepath,this.selectedImage)



  //   task.snapshotChanges().pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         this.upSvc.insertImageDetails(this.daydetails.value);
  //         this.toaster.success("Submitted successfully")
  //         this.router.navigate(['../Home'],{relativeTo:this.activatedroute})
  //       })
  //     }),
  //   ).subscribe()
  // }
}
