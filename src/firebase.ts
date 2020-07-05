import * as firebase from 'firebase/app';

const isDev = process.env.NODE_END === 'development';

const firebaseConfig = {
  apiKey: 'AIzaSyCuwPwFw22P8o8Dt3fQxOJg-LpuKQ3VpOk',
  authDomain: 'vocab-dev.firebaseapp.com',
  databaseURL: 'https://vocab-dev.firebaseio.com',
  projectId: 'vocab-dev',
  storageBucket: 'vocab-dev.appspot.com',
  messagingSenderId: '501894563267',
  appId: '1:501894563267:web:957d9cf47a38af77e5e976',
  measurementId: 'G-CVQ8QZSKVS',
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

firebase.initializeApp(isDev ? devFirebaseConfig : firebaseConfig);
