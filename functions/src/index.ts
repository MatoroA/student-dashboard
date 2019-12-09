import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

exports.addTutor = functions.https.onCall((data, context)=>{
    return admin.auth().getUserByEmail(data.email).then(user =>{
        return admin.auth().setCustomUserClaims(user.uid,{
            tutor: true
        })
    }).then(()=>{
        return {
            message: `Success! ${data.email} has been made a tutor`
        }
    }).catch(err =>{
        return err;
    });
});