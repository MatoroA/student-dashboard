import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';

import { AddUserComponent } from './modules/add-user/add-user.component';
import { MatProgressBarModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 