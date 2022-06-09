import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-Book-create',
  templateUrl: './Book-create.component.html',
  styleUrls: ['./Book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  submitted = false;
  BookForm: FormGroup;
  BookStatus: any = ['AVAILABLE', 'BORROWED', 'SCRAPPED'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  // TODO: get proper regexes for doubles
  mainForm() {
    this.BookForm = this.fb.group({
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
    return this.BookForm.controls;
  }

  updateStatus(e) {
    this.BookForm.get('status').setValue(e, {
      onlySelf: true
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted!');
    if (!this.BookForm.valid) {
      console.log('Form data invalid');
      return false;

    } else {
      console.log('Form data valid, attempting to create Book');
      this.apiService.createBook(this.BookForm.value).subscribe(
        (res) => {
          console.log('Book successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/Book-list'));
        }, (error) => {
          console.log(error);
        });
    }
  }
}
