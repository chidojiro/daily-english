import * as firebase from 'firebase/app';

const isDev = process.env.NODE_ENV === 'development';

const firebaseConfig = {
  apiKey: 'AIzaSyCOZRs7UzfEhcewnvmQnAGVPM3vW0c2fZU',
  authDomain: 'daivoca.firebaseapp.com',
  databaseURL: 'https://daivoca.firebaseio.com',
  projectId: 'daivoca',
  storageBucket: 'daivoca.appspot.com',
  messagingSenderId: '205114645226',
  appId: '1:205114645226:web:94cfca76e9c05c2bffd593',
  measurementId: 'G-PZ3P2SL14E',
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
