import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  link1:boolean=true;
  link2:boolean=false;
  link3:boolean=false;

  Clique1(){
    this.link1=true;
    this.link2=false;
    this.link3=false;
  }

  Clique2(){
    this.link1=false;
    this.link2=true;
    this.link3=false;
  }

  Clique3(){
    this.link1=false;
    this.link2=false;
    this.link3=true;
  }

}
