import logo from './logo.svg';
import './App.css';
import FirebaseContext from './context/firebase'
import { firebase, FieldValue } from './lib/firebase'

function App() {
  // const dataFromFirebase = firebase.firestore().collection('sites')

  const data = firebase.firestore().collection('sites').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let data = []

      })
    })


  // snapshot.forEach(doc => {
  //   console.log(doc.id, '=>', doc.data());
  // });
  return (
    <div className="App">
      <h1>This is timesheet </h1>
    </div>
  );
}

export default App;
