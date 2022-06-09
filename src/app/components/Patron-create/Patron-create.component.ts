import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-Patron-create',
  templateUrl: './Patron-create.component.html',
  styleUrls: ['./Patron-create.component.css']
})
export class PatronCreateComponent implements OnInit {
  submitted = false;
  PatronForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.PatronForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  // Getter to access form control
  get myForm() {
    return this.PatronForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log('Form submitted!');
    if (!this.PatronForm.valid) {
      console.log('Form data invalid');
      return false;

    } else {
      console.log('Form data valid, attempting to create Book');
      this.apiService.createPatron(this.PatronForm.value).subscribe(
        (res) => {
          console.log('Books successfully created!');
          this.ngZone.run(() => this.router.navigateByUrl('/Patron-list'));
        }, (error) => {
          console.log(error);
        });
    }
    console.log('If skipped');
  }
}
