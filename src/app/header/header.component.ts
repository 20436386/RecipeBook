import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../authenticate/auth.service';
import * as fromApp from "../store/app.reducer";
import * as authActions from "../authenticate/store/auth.actions";
import * as recipeActions from '../recipes/store/recipe.actions';
import * as slActions from '../shopping-list/store/shopping-list.actions';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    //Used before routing was implemented
    // @Output() featureSelected = new EventEmitter<string>();
    authenticated = false;
    private userSub: Subscription;

    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }
  
    ngOnInit(): void {
        this.userSub = this.store.select("auth").subscribe(authState => {
            if(authState.user !== null){
                this.authenticated = true;
            }else{
                this.authenticated = false;
            }
        })
    }

    onLogout(){
        this.store.dispatch(new authActions.Logout());
    }

    onFetch(){
        // this.dataStorageService.getRecipes().subscribe((responseData) => {
        //     console.log(responseData);
        //     if(responseData === null){
        //         let error = new Error("There are no recipes in the database!");
        //         console.log(error);
        //     }
        //     // this.store.dispatch(new recipeActions.UpdateFromServer(responseData));
        // });

        this.store.dispatch(new recipeActions.FetchRecipes());

        // this.dataStorageService.getShoppingList();
        this.store.dispatch(new slActions.FetchList());
    }

    onSave(){
        // this.dataStorageService.storeData();
        this.store.dispatch(new recipeActions.StoreRecipes());
        this.store.dispatch(new slActions.StoreList());
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    
 }