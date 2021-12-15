import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCVAEO0vg3nYGEMfk8ptDcbmYhu1dqAj24",
  authDomain: "escu-ebe2e.firebaseapp.com",
  projectId: "escu-ebe2e",
  storageBucket: "escu-ebe2e.appspot.com",
  messagingSenderId: "936239440609",
  appId: "1:936239440609:web:9652233531da143e2bcda0"
};

firebase.initializeApp(firebaseConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
