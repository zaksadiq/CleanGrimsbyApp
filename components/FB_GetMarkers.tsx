import {
CG_FB_apiKey,
CG_FB_authDomain,
CG_FB_databaseURL,
CG_FB_projectId,
CG_FB_storageBucket,
CG_FB_messagingSenderId,
CG_FB_appId,
} from '@env';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';
import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: CG_FB_apiKey,
  authDomain: CG_FB_authDomain,
  databaseURL: CG_FB_databaseURL,
  projectId: CG_FB_projectId,
  storageBucket: CG_FB_storageBucket,
  messagingSenderId: CG_FB_messagingSenderId,
  appId: CG_FB_appId
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log(`Database URL : ${CG_FB_databaseURL}`);
console.log(db);
export { db };



// export default function GetMarkers() {
//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: CG_FB_apiKey,
//     authDomain: CG_FB_authDomain,
//     databaseURL: CG_FB_databaseURL,
//     projectId: CG_FB_projectId,
//     storageBucket: CG_FB_storageBucket,
//     messagingSenderId: CG_FB_messagingSenderId,
//     appId: CG_FB_appId
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   console.log('Initialised App.');
//   const db = getDatabase(app);
//   console.log('Got Database.');
//   // let markers = db.ref('markers/');
//   return { db };
//   console.log('Got Markers:');
//   console.log(JSON.stringify(markers));
//   return { markers };
// }

