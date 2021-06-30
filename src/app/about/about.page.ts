import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public teste: any;

  constructor() { }

  showAlert() {
    console.log('Cool!');
    this.teste = 'Brasileiro';
  }

  ngOnInit() {
  }

}
