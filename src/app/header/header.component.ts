import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    //Used before routing was implemented
    // @Output() featureSelected = new EventEmitter<string>();

    constructor() { }
  
    ngOnInit(): void {
    }

    //This method was used before routing was implemented to emit which navbar link was clicked
    // onSelect(event: MouseEvent){
    //     // console.log(event);
    //     if((<HTMLAreaElement>event.target).textContent === 'Recipes'){
    //         this.featureSelected.emit("nav-recipe");
    //     }else if((<HTMLAreaElement>event.target).textContent === 'Shopping List'){
    //         this.featureSelected.emit("nav-Shopping-List");
    //     }
    // }
    
  }