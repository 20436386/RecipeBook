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

    onLogout(){
        this.authService.signOut();
    }

    onFetch(){
        this.dataStorageService.getRecipes().subscribe((responseData) => {
            console.log(responseData);
            if(responseData === null){
                let error = new Error("There are no recipes in the database!");
                console.log(error);
            }
        });
        this.dataStorageService.getShoppingList();
    }

    onSave(){
        this.dataStorageService.storeData();
    }
    
  }