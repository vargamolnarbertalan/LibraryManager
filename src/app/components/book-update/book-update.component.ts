import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../service/api.service';
import {Book} from '../../model/Book';

@Component({
  selector: 'app-Book-update',
  templateUrl: './Book-update.component.html',
  styleUrls: ['./Book-update.component.css']
})
export class BookUpdateComponent implements OnInit {
  submitted = false;
  editBookForm: FormGroup;
  BookData: Book[];
  BookStatus: any = ['AVAILABLE', 'BORROWED', 'SCRAPPED'];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateBook();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.getBook(id);
    this.editBookForm = this.fb.group({
      Title: ['', [Validators.required]],
      Writer: ['', [Validators.required]],
      Publisher: ['', [Validators.required]],
      ISBN: ['', [Validators.required]],
      Released: ['', [Validators.required]],
      NumberOfPages: ['', [Validators.required, Validators.pattern('(0|^[1-9]\\d*$)')]],
      OG_Price: ['', [Validators.required, Validators.pattern('^[^0][0-9]*$')]],
      status: ['', [Validators.required]]
    });
  }
  // Getter to access form control
  get myForm() {
    return this.editBookForm.controls;
  }

  getBook(id) {
    this.apiService.getBook(id).subscribe(data => {
      this.editBookForm.setValue({
        Title: data.Title,
        Writer: data.Writer,
        Publisher: data.Publisher,
        ISBN: data.ISBN,
        Released: data.Released,
        NumberOfPages: data.NumberOfPages,
        OG_Price: data.OG_Price,
        status: data.status,
      });
    });
  }

  updateBook() {
    this.editBookForm = this.fb.group({
      Title: ['', [Validators.required]],
      Writer: ['', [Validators.required]],
      Publisher: ['', [Validators.required]],
      ISBN: ['', [Validators.required]],
      Released: ['', [Validators.required]],
      NumberOfPages: ['', [Validators.required, Validators.pattern('(0|^[1-9]\\d*$)')]],
      OG_Price: ['', [Validators.required, Validators.pattern('^[^0][0-9]*$')]],
      status: ['', [Validators.required]]
    });
  }

  updateStatus(e) {
    this.editBookForm.get('status').setValue(e, {
      onlySelf: true
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editBookForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure')) {
        const id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateBook(id, this.editBookForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/Book-list');
            console.log('Content updated successfully!');
          }, (error) => {
            console.log(error);
          });
      }
    }
  }

}
