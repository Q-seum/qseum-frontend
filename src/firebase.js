import firebase from 'firebase'
// import firebase from 'firebase/app'
// import 'firebase/auth'
var config = {
  apiKey: 'AIzaSyAbsVvhLB-9MYtPCp5oQQ2eJuuz0SCRFAE',
  authDomain: 'q-seum.firebaseapp.com',
  databaseURL: 'https://q-seum.firebaseio.com',
  projectId: 'q-seum',
  storageBucket: 'q-seum.appspot.com',
  messagingSenderId: '64227425042'
}

firebase.initializeApp(config)
var storage = firebase.storage()
export default firebase
