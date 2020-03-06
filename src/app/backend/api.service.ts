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
import { Message } from '../models/message';
import { CourseMessage } from '../models/binndingMeaageAndCourse';

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth,
    private _storage: AngularFireStorage) { }



  updateCourseNews(coursesAndNews: CourseMessage[]) {
    for (let message of coursesAndNews) {
      console.log(message);
      let arrayOfMessages = [];
      console.log(message.getMessages());
      for (let i = 0; i < message.getMessages().length; i++) {
        

        let obj = {
          format: message.getMessages()[i].getFormat(),
          message: message.getMessages()[i].getMessage(),
          title: message.getMessages()[i].getTitle()
        }

        console.log(message.getMessages().length);
        
        arrayOfMessages.push(obj);
        if(1 + i == message.getMessages().length){
          console.log(arrayOfMessages);
          console.log(message.getCourseId());
          
          this.afs.doc("courses/" + message.getCourseId()).update({ news: arrayOfMessages }).then(success => {
            console.log('this message has been sent successfully');
  
          }, err => {
            return err;
          })
        }
      }
    }
  }

  updateCourseList(uid: string, courses: String[]) {
    return this.afs.doc("users/" + uid).update({ course: courses }).then(success => {
      return success;
    }, err => {
      return err;
    })
  }

  async deleteCourse(courseId: string) {
    return await this.afs.doc("courses/" + courseId)
      .delete().then(results => {
        return results
      }, error => {
        return error;
      })
  }
  async addAdmin(admin: Admin) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(admin.getEmail(), admin.getPassword()).then(user => {
      const firebase = require('firebase');
      const firebaseFunction = firebase.functions();
      const adminRole = firebaseFunction.httpsCallable('addAdmin');
      return adminRole({ email: admin.getEmail() }).then(result => {

        let doc = {
          firstname: admin.getName(),
          lastname: admin.getSurname(),
          email: admin.getEmail(),
          cellPhone: admin.getCellPhone(),
          uid: user.user.uid,
          role: "admin"
        }
        this.afs.doc("users/" + user.user.uid).set(doc);

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
      return roleTurtor({ email: trainer.getEmail() }).then(result => {

        console.log(result);

        let doc = {
          firstname: trainer.getName(),
          lastname: trainer.getSurnmae(),
          email: trainer.getEmail(),
          course: trainer.getCourseList(),
          uid: user.user.uid,
          role: "tutor"
        }
        this.afs.doc("users/" + user.user.uid).set(doc);
        return result;
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
  // , ref => ref.where('size', '==', size)
  getStudentApplications(id: string) {
    return this.afs.collection<StudentCourse>('studentCourse', ref => ref.where('courseID', '==', id)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as StudentCourse;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getRegisteredStudent() {
    return this.afs.collection<StudentCourse>('studentCourse', ref => ref.where('status', '==', true)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as StudentCourse;
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
  // , ref => ref.where('size', '==', size)

  getTurtors() {
    return this.afs.collection<Turtor>('users', ref => ref.where('role', '==', 'tutor')).snapshotChanges().pipe(
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
    let studentDoc = this.afs.doc<Turtor>("users/" + id);
    return studentDoc.valueChanges();
  }
  getCourseDocument(courseId: string): Observable<Course> {

    let courseDoc = this.afs.doc<Course>("courses/" + courseId)

    return courseDoc.valueChanges();
  }


  async uploadCourseCover(courseName: string, file: File, courseId: string) {
    return await this._storage.upload("courses" + '/' + courseName + '/courseCover/', file).then(results => {
      results.downloadURL
      return results.ref.getDownloadURL().then(url => {
        console.log(url);

        return this.afs.doc("courses/" + courseId).update({ coverUrl: url }).then(() => {
          return url;
        }, () => {
          return -1;
        })
      })
    })
  }

  async updateCourse(course: NewCourse) {

    let courseData = {
      courseId: course.getCourseId(),
      courseName: course.getCourseName(),
      description: course.getDescription(),
      courseFee: course.getCourseFee(),
      code: course.getCode(),
      deposit: course.getDeposit(),
      requirement: course.getRequirements(),
      feesInclude: course.getFeesInclude()
    }

    return await this.afs.doc("courses/" + course.getCourseId())
      .update(courseData).then(() => {
        return "Course data has been updated!";
      })
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
          description: course.getDescription(),
          feesInclude: course.getFeesInclude(),
          endDate: course.getSEndDate(),
          startDate: course.getStartDate(),
          closingDate: course.getClosingDate()
        }


        return this.afs.collection("courses").add(courseDoc);
      })
    })
  }

  async uploadFiles(course: NewCourse, courseContent: ArrayList) {
    console.log(course);

    let dateArray = new Date().toLocaleDateString().split("/");

    let day = dateArray[1].length == 1 ? "0" + dateArray[1] : dateArray[1];
    let month = dateArray[0].length == 1 ? "0" + dateArray[0] : dateArray[0];
    let year = dateArray[2];

    if (course.getCourseName() != null && courseContent.getAll().length > 0) {
      for (let i = 0; i < courseContent.getAll().length; i++) {
        if (courseContent.getItemAt(i).getFile() != null) {
          console.log(courseContent.getItemAt(i).getFileName())
          this._storage.upload("courses/" + course.getCourseName() + "/contents/" + courseContent
            .getItemAt(i).getFileName(), courseContent.getItemAt(i).getFileUrl())
            .then(results => {
              console.log(results)
              results.ref.getDownloadURL().then(url => {
                const data: Content = {
                  fileUrl: url,
                  access: courseContent.getItemAt(i).getAudience(),
                  title: courseContent.getItemAt(i).getTitle(),
                  format: courseContent.getItemAt(i).getFormat(),
                  date: day + "/" + month + "/" + year
                }

                course.setCourseContent(data);


                if (courseContent.getAll().length == i + 1) {
                  console.log(course.getCourseContent());

                  return this.afs.doc("courses/" + course.getCourseId()).update({ contents: course.getCourseContent() })
                    .then(() => {
                      console.log("this user works just fine...");

                      return true;

                    }, () => {
                      return false;
                    })
                }

              })
            })
        } else {
          return false;
        }

      }
    }

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
