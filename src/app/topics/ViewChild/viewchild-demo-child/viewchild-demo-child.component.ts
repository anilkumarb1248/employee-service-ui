import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewchild-demo-child',
  templateUrl: './viewchild-demo-child.component.html',
  styleUrls: ['./viewchild-demo-child.component.css']
})
export class ViewchildDemoChildComponent implements OnInit {

  childTitle:string = "Child Title";
  constructor() { }

  ngOnInit(): void {
  }

  changeTitile(title:string){
    this.childTitle = title;
  }

}
