import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-Borrow-list',
  templateUrl: './Borrow-list.component.html',
  styleUrls: ['./Borrow-list.component.css']
})
export class BorrowListComponent implements OnInit {

  Borrows: any = [];

  constructor(private apiService: ApiService) {
    this.readBorrows();
  }

  ngOnInit() {}

  readBorrows() {
    this.apiService.getAllBorrows().subscribe((data) => {
      this.Borrows = data;
    });
  }

  removeBorrow(Borrow, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteBorrow(Borrow._id).subscribe((data) => {
          this.Borrows.splice(index, 1);
        }
      );
    }
  }
}
