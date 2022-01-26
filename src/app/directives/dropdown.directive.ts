import { Directive, HostListener, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Event } from '@angular/router';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{

  dropped: boolean = false;
  dropdownMenu: HTMLUListElement;

  constructor(private renderer: Renderer2, private currentElement: ElementRef) { }

  ngOnInit(): void {

    this.dropdownMenu = this.renderer.nextSibling(this.currentElement.nativeElement);
    // this.dropdownMenu = this.currentElement.nativeElement.nextElementSibling;
    // console.log(this.dropdownMenu)
  }

  // @HostListener('click') onClick(eventData: Event){
  //   // console.log("click handler called");

  //   if(!this.dropped){
  //     // console.log("Class added, dropped =" + this.dropped);
  //     this.renderer.addClass(this.dropdownMenu, "show");
  //     this.dropped = true;
  //   }else{
  //     // console.log("class removed, dropped = " + this.dropped);
  //     this.renderer.removeClass(this.dropdownMenu, "show");
  //     this.dropped = false;
  //   } 
  // }

  //This event handler will be called whenever a click occurs on the document
  @HostListener('document:click', ['$event']) toggleOpen(event: MouseEvent) {
    // console.log(event)
    //https://www.geeksforgeeks.org/collect-js-contains-method/
    if(this.currentElement.nativeElement.contains(event.target)){
      if(!this.dropped){
        // console.log("Class added, dropped =" + this.dropped);
        this.renderer.addClass(this.dropdownMenu, "show");
        this.dropped = true;
      }else{
        // console.log("class removed, dropped = " + this.dropped);
        this.renderer.removeClass(this.dropdownMenu, "show");
        this.dropped = false;
      } 
    }else{
      this.renderer.removeClass(this.dropdownMenu, "show");
      this.dropped = false;
    }
  }
}

