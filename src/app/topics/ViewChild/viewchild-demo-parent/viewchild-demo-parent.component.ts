import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ViewchildDemoChildComponent } from '../viewchild-demo-child/viewchild-demo-child.component';

@Component({
  selector: 'app-viewchild-demo-parent',
  templateUrl: './viewchild-demo-parent.component.html',
  styleUrls: ['./viewchild-demo-parent.component.css']
})
export class ViewchildDemoParentComponent implements OnInit, AfterViewInit {

  // @ViewChild(ViewchildDemoChildComponent)
  // childComponent:ViewchildDemoChildComponent;

  @ViewChild("child")
  childComponent:ViewchildDemoChildComponent;

  @ViewChild("inputTextTemplate")
  inputTextTemplateRef:ElementRef;

  @ViewChildren("inputTemplateRef")
  inputTemplateRefList:QueryList<ElementRef>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.inputTextTemplateRef);
    this.inputTextTemplateRef.nativeElement.value = "Template Reference Text";

    console.log(this.inputTemplateRefList);
    this.inputTemplateRefList.forEach(ele=>{
      ele.nativeElement.value = "View Children Text";
    })
  }

  changeChildTitle():void{
    this.childComponent.changeTitile("Changing the Child Title from Parent");
  }

}
 
