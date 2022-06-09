import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-Book-list',
  templateUrl: './Book-list.component.html',
  styleUrls: ['./Book-list.component.css']
})
export class BookListComponent implements OnInit {

  Books: any = [];
  hiddenBooks: any = [];
  filterForm: FormGroup;

  constructor(private apiService: ApiService, public fb: FormBuilder) {
    this.readBook();
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      Title: [''],
      Publisher: ['']
    });
  }

  readBook() {
    this.apiService.getAllBooks().subscribe((data) => {
      this.Books = data;
    });
  }

  removeBook(Book, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteBook(Book._id).subscribe((data) => {
          this.Books.splice(index, 1);
        }
      );
    }
  }

  filterBooks(Title, Publisher) {
    for (const Book of this.hiddenBooks) {
      this.Books.push(Book);
    }
    this.hiddenBooks = [];
    for (let i = 0; i <= this.Books.length; i++) {
      const Book = this.Books[i];
      if ((Book.Title !== Title && Title.length > 0) || (Book.Publisher !== Publisher && Publisher.length > 0)) {
        this.Books.splice(i, 1);
        this.hiddenBooks.push(Book);
        i--;
      }
    }
  }

  onFilterSubmit() {
    this.filterBooks(
      this.filterForm.value.Title,
      this.filterForm.value.Publisher
    );
  }

}
