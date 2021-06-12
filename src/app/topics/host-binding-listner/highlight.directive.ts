import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @HostBinding("style.border")
  border: string;

  @HostBinding("style.color")
  color:string;

  // We can also assign the classes, but the classes must be present
  // @HostBinding('class') class: string;
  ngOnInit() {
    // this.class="highlight box"
  }

  // constructor(private elementRef: ElementRef) {
  //   elementRef.nativeElement.style.color = "red";
  //   elementRef.nativeElement.style.fontSize = "15px";
  //   elementRef.nativeElement.style.backgroundColor = "lightgrey";
  //  }

  constructor() {
    this.border = "2px solid blue";
    this.color = "red";
  }

  @HostListener("mouseover")
  onMouseOver(){
    this.border = "2px solid red";
    this.color = "green";
  }

  @HostListener("mouseleave")
  onMouseLeave(){
    this.border = "2px solid blue";
    this.color = "red";
  }

}
