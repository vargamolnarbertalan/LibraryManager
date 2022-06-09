import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../service/api.service';
import {Borrow} from '../../model/Borrow';
import {Book} from '../../model/Book';

@Component({
  selector: 'app-Borrow-update',
  templateUrl: './Borrow-update.component.html',
  styleUrls: ['./Borrow-update.component.css']
})
export class BorrowUpdateComponent implements OnInit {
  submitted = false;
  closureForm: FormGroup;
  BorrowData: any = [];
  rentedBooks: any = [];
  BookStatus: any = ['AVAILABLE', 'BORROWED', 'SCRAPPED'];
  bill: number;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.getBorrow(id).then( () =>
      this.getRentedBooks()
    );
    this.closureForm = this.fb.group({
      damage: [''],
      OG_Price: ['', [Validators.required, Validators.pattern('^[^0][0-9]*$')]],
      duration: [''],
      bill: ['']
    });
  }

  // Getter to access form control
  get myForm() {
    return this.closureForm.controls;
  }

  async getBorrow(id) {
   await this.apiService.getBorrow(id).toPromise().then(data => {
      this.BorrowData = data;
    });
  }


  calculateBill() {
    this.bill = 0;
    const start = Date.parse(this.BorrowData.start);
    const end = Date.parse(this.BorrowData.end);
    let BorrowDuration = end - start;

    BorrowDuration = BorrowDuration / (1000 * 60 * 60 * 24);
    console.log('Borrow duration: ' + BorrowDuration);
    for (const Book of this.rentedBooks) {
        this.bill += BorrowDuration * Book.NumberOfPages;
    }
    this.bill += this.closureForm.value.OG_Price * 70;
    if (this.closureForm.value.damage) {
      this.bill += 100000;
      console.log('Book damaged! Extra fee added as penalty!');
    }
  }

  getRentedBooks() {
    for (const vId of this.BorrowData.RentedBook) {
      this.apiService.getBook(vId).subscribe(data => {
        this.rentedBooks.push(data);
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.closureForm.valid) {
      return false;
    } else {
        this.calculateBill();
        const id = this.actRoute.snapshot.paramMap.get('id');
        for ( const Book of this.rentedBooks) {
          Book.status = 'AVAILABLE';
          this.apiService.updateBook(Book._id, Book).subscribe(() => {
            console.log('Book status updated', Book._id);
          });
        }
    }
  }

}
