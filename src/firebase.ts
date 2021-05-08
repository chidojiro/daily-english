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
  apiKey: 'AIzaSyBadH4Xxer0oOIISZE-fJhui9qgAAp_BQI',
  authDomain: 'daivoca-devepopment.firebaseapp.com',
  databaseURL: 'https://daivoca-devepopment.firebaseio.com',
  projectId: 'daivoca-devepopment',
  storageBucket: 'daivoca-devepopment.appspot.com',
  messagingSenderId: '522139265741',
  appId: '1:522139265741:web:967536066054ad3af7d784',
  measurementId: 'G-XD3QKGK7BQ',
};

firebase.initializeApp(isDev ? devFirebaseConfig : firebaseConfig);
