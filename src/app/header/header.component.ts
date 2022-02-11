import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../authenticate/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    userSub: Subscription;
    authenticated:boolean;


    constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
  
    ngOnInit(): void {
        this.authenticated = false;
        this.userSub = this.authService.user.subscribe(user => {
            // User will be null if not authenticated and will contain a user object if authenticated
            if(user !== null){
                this.authenticated = true;
            }else{
                this.authenticated = false;
            }
        })
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
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