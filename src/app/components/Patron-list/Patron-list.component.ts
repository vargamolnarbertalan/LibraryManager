import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-Patron-list',
  templateUrl: './Patron-list.component.html',
  styleUrls: ['./Patron-list.component.css']
})
export class PatronListComponent implements OnInit {
  Patron: any = [];

  constructor(private apiService: ApiService) {
    this.readPatron();
  }

  ngOnInit() {}

  readPatron() {
    this.apiService.getAllPatron().subscribe((data) => {
      this.Patron = data;
    });
  }

  removePatron(Patron, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deletePatron(Patron._id).subscribe((data) => {
          this.Patron.splice(index, 1);
        }
      );
    }
  }
}
