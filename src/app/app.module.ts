import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './service/api.service';
import {ReactiveFormsModule} from '@angular/forms';
import { PatronCreateComponent } from './components/Patron-create/Patron-create.component';
import { PatronListComponent } from './components/Patron-list/Patron-list.component';
import { PatronUpdateComponent } from './components/Patron-update/Patron-update.component';
import { BookCreateComponent } from './components/Book-create/Book-create.component';
import { BookListComponent } from './components/Book-list/Book-list.component';
import { BookUpdateComponent } from './components/Book-update/Book-update.component';
import { BorrowCreateComponent } from './components/Borrow-create/Borrow-create.component';
import { BorrowListComponent } from './components/Borrow-list/Borrow-list.component';
import { BorrowUpdateComponent } from './components/Borrow-update/Borrow-update.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    PatronCreateComponent,
    PatronListComponent,
    PatronUpdateComponent,
    BookCreateComponent,
    BookListComponent,
    BookUpdateComponent,
    BorrowCreateComponent,
    BorrowListComponent,
    BorrowUpdateComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
