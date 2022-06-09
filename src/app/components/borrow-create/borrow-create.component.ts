import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../service/api.service';
import {Patron} from '../../model/Patron';
import {Router} from '@angular/router';

@Component({
  selector: 'app-Borrow-create',
  templateUrl: './Borrow-create.component.html',
  styleUrls: ['./Borrow-create.component.css']
})
export class BorrowCreateComponent implements OnInit {

  BorrowForm: FormGroup;
  Books: any = [];
  addedBooks: any = [];
  Patron: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.mainForm();
    this.readBooks();
    this.readPatron();
  }

  get myForm() {
    return this.BorrowForm.controls;
  }

  ngOnInit(): void {}

  readBooks() {
    this.apiService.getAllBooks().subscribe((data) => {
      this.Books = data;
    });
  }

  readPatron() {
    this.apiService.getAllPatron().subscribe((data) => {
      this.Patron = data;
    });
  }

  updateSelectedPatron(id) {
    this.BorrowForm.value.Patron = id;
  }

  mainForm() {
    this.BorrowForm = this.formBuilder.group({
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      RentedBook: [''],
      Patron: ['']
    });
  }

  addBook(Book, i) {
    this.Books.splice(i, 1);
    this.addedBooks.push(Book);
    // this.BorrowForm.value.RentedBook = this.addedBooks;
  }

  removeBook(Book, i) {
    this.addedBooks.splice(i, 1);
    this.Books.push(Book);
    // this.BorrowForm.value.RentedBook = this.addedBooks;
  }

  onSubmit() {
    if (!this.BorrowForm.valid) {
      return false;
    } else {
      console.log(this.BorrowForm.value);
      const RentedBooksId: any = [];
      for (const Book of this.addedBooks) {
        RentedBooksId.push(Book._id);
      }
      this.BorrowForm.value.RentedBook = RentedBooksId;
      this.apiService.createBorrow(this.BorrowForm.value).subscribe(
        () => {
          this.addedBooks.forEach((Book) => {
            Book.status = 'BORROWED';
            this.apiService.updateBook(Book._id, Book).subscribe(() => {
              console.log('Status updated: ', Book._id);
            });
            console.log(
              'RentCreateComponent -> submitForm -> rentable',
              Book
            );
            this.apiService
              .updateBorrow(Book._id, Book)
              .subscribe(
                () => {
                  console.log('Borrow updated!');
                },
                (error) => {
                  console.log(error);
                }
              );
          });
          console.log('Borrow created!');
          this.ngZone.run(() => this.router.navigateByUrl('/Borrow-list'));
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
