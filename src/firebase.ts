import * as firebase from 'firebase/app';

const isDev = process.env.NODE_ENV === 'development';

const firebaseConfig = {
  apiKey: 'AIzaSyANAgn1PwbkgUkcOk81QrAVp0J3-nsDMaM',
  authDomain: 'vocab-cf44c.firebaseapp.com',
  databaseURL: 'https://vocab-cf44c.firebaseio.com',
  projectId: 'vocab-cf44c',
  storageBucket: 'vocab-cf44c.appspot.com',
  messagingSenderId: '161628363016',
  appId: '1:161628363016:web:d90f3f345535b51af934bd',
  measurementId: 'G-V2N0F9ET4P',
};

const devFirebaseConfig = {
  apiKey: 'AIzaSyCuwPwFw22P8o8Dt3fQxOJg-LpuKQ3VpOk',
  authDomain: 'vocab-dev.firebaseapp.com',
  databaseURL: 'https://vocab-dev.firebaseio.com',
  projectId: 'vocab-dev',
  storageBucket: 'vocab-dev.appspot.com',
  messagingSenderId: '501894563267',
  appId: '1:501894563267:web:957d9cf47a38af77e5e976',
  measurementId: 'G-CVQ8QZSKVS',
};

firebase.initializeApp(!isDev ? devFirebaseConfig : firebaseConfig);
