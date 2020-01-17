import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.addStudent = functions.https.onCall((data, context)=>{
    return admin.auth().getUserByEmail(data.email).then(user =>{
        return admin.auth().setCustomUserClaims(user.uid,{
            student: true
        })
    }).then(()=>{
        return {
            message: `Success! ${data.email} has been made a student`
        }
    }).catch(err =>{
        return err;
    });
});


export const sendOnFirestoreCreate = functions.firestore
.document('studentCourse/{stId}')
.onCreate(async snapshot =>{
    const notification: admin.messaging.Notification = {
        title: 'New Discount Available',
        body: 'body'
    };

    const payload: admin.messaging.Message = {
        notification,

        webpush: {
            notification: {
                vibrate: [200, 100, 200],
                actions: [
                    {
                        action: 'like',
                        title: 'Yaay'
                    },
                    {
                        action: 'dislike',
                        title: 'Boooo!'
                    }
                ]
            }
        },
        topic: 'New student application'
    }

    return admin.messaging().send(payload);
})