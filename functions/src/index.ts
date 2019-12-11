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