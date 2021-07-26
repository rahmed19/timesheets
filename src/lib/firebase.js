import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "timesheets-e4500.firebaseapp.com",
    projectId: "timesheets-e4500",
    storageBucket: "timesheets-e4500.appspot.com",
    messagingSenderId: "917768165785",
    appId: "1:917768165785:web:9a7c7191058264c1331b08"
};

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore
export { firebase, FieldValue }