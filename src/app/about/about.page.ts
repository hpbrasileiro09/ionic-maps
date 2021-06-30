import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public teste: any;

  public books: any = [];

  constructor(public http: HttpClient) {}

   prepareDataRequest() {
    let dataUrl = "https://hpbtec-app1.herokuapp.com/books";
    this.http.get(dataUrl).subscribe(data => {
      console.log(data);
      this.books = data;
    });
  }

  showAlert() {
    console.log('Cool!');
    this.teste = 'Brasileiro';
    this.prepareDataRequest();
  }

  ngOnInit() {
  }

}
