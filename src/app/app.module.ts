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

import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatProgressBarModule, MatListModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { UpdateTurtorComponent } from './dialog/update-turtor/update-turtor.component';
import { ApplicantComponent } from './dialog/applicant/applicant.component';
import { OpenFileComponent } from './dialog/open-file/open-file.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DeleteCourseComponent } from './dialog/delete-course/delete-course.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AuthService } from './backend/auth.service';
import { PostNewsComponent } from './dialog/post-news/post-news.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeleteDialogComponent,
    UpdateTurtorComponent,
    ApplicantComponent,
    OpenFileComponent,
    DeleteCourseComponent,
    PostNewsComponent,
   
   
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
    MatRadioModule,
    PdfViewerModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  providers: [AuthService,CanActivateRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
 