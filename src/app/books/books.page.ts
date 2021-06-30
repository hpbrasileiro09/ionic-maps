import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {

  myForm: FormGroup;
  
  submitted = false;

  public errorMessage: any = '';

  public books: any = [];

  constructor(public http: HttpClient, public formBuilder: FormBuilder) {}

  prepareDataRequest() {
    let dataUrl = "https://hpbtec-app1.herokuapp.com/books";
    this.http.get(dataUrl).subscribe(data => {
      console.log(data);
      this.books = data;
    });
  }

  get errorCtr() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      console.log(this.myForm.value);
      let dataUrl = "https://hpbtec-app1.herokuapp.com/books";
      this.http.post(dataUrl, this.myForm.value).subscribe({
        next: data => {
          console.log(data);
          console.log('Book created succesfully!');
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', this.errorMessage);
        }      
      });      
    }
  }

  cleanBooks() {
    this.books = [];
  }

  loadBooks() {
    this.prepareDataRequest();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(3)]],
    })    
    console.log('prepareDataRequest...');
    this.prepareDataRequest();
  }

}
