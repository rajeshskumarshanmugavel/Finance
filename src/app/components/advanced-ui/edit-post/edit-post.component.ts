import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  constructor() { }

  CategoryBindingsList = [
    { value: 1, label: 'IT'},
    { value: 2, label: 'Language'},
    { value: 3, label: 'Science'},
    { value: 4, label: 'Health'},
    { value: 5, label: 'Humanities'},
    { value: 6, label: 'Business'},
    { value: 7, label: 'Maths'},
    { value: 8, label: 'Marketing'}
  ];
  InstructorBindingsList = [
    { value: 1, label: 'Pedro Cox'},
    { value: 2, label: 'Vera Guzman'},
    { value: 3, label: 'Glenda Long'},
    { value: 4, label: 'Joel Anderson'},
    { value: 5, label: 'Blanche Henderson'}
  ];

  CategoryselectedCity:any = null;
  InstructorselectedCity:any = null;

  ngOnInit() {
      this.CategoryselectedCity = this.CategoryBindingsList[0];
      this.InstructorselectedCity = this.InstructorBindingsList[1];
  }
}
