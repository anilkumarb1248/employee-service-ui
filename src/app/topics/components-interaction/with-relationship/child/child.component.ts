import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges {

  // name:string = "Child";
  @Input()
  name:string = "Child";

  @Output()
  nameEmitter:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  emitName(){
    this.nameEmitter.emit(this.name);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("The name changed: " + JSON.stringify(changes));
  }

}
