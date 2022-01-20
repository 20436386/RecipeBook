import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Output() featureSelected = new EventEmitter<string>();

    constructor() { }
  
    ngOnInit(): void {
    }

    onSelect(event: MouseEvent){
        // console.log(event);
        if((<HTMLAreaElement>event.target).textContent === 'Recipes'){
            this.featureSelected.emit("nav-recipe");
        }else if((<HTMLAreaElement>event.target).textContent === 'Shopping List'){
            this.featureSelected.emit("nav-Shopping-List");
        }
    }
    
  }