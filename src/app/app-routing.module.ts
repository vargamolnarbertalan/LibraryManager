import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import {PatronCreateComponent} from './components/Patron-create/Patron-create.component';
import {PatronListComponent} from './components/Patron-list/Patron-list.component';
import {PatronUpdateComponent} from './components/Patron-update/Patron-update.component';
import {BookCreateComponent} from './components/Book-create/Book-create.component';
import {BorrowCreateComponent} from './components/Borrow-create/Borrow-create.component';
import {BookUpdateComponent} from './components/Book-update/Book-update.component';
import {BorrowUpdateComponent} from './components/Borrow-update/Borrow-update.component';
import {BookListComponent} from './components/Book-list/Book-list.component';
import {BorrowListComponent} from './components/Borrow-list/Borrow-list.component';
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {UserLoginComponent} from './components/user-login/user-login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user-login' },
  { path: 'create-employee', component: EmployeeCreateComponent },
  { path: 'create-Patron', component: PatronCreateComponent },
  { path: 'create-Book', component: BookCreateComponent },
  { path: 'create-Borrow', component: BorrowCreateComponent },
  { path: 'create-Borrow/:PatronId', component: BorrowCreateComponent },
  { path: 'edit-employee/:id', component: EmployeeEditComponent },
  { path: 'edit-Patron/:id', component: PatronUpdateComponent },
  { path: 'edit-Book/:id', component: BookUpdateComponent },
  { path: 'edit-Borrow/:id', component: BorrowUpdateComponent },
  { path: 'employees-list', component: EmployeeListComponent },
  { path: 'Patron-list', component: PatronListComponent },
  { path: 'Book-list', component: BookListComponent },
  { path: 'Borrow-list', component: BorrowListComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'user-login', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
