import { HttpClient, HttpEventType, HttpParams, HttpResponse } from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core';
import { map, tap, take, exhaustMap, Subscription } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../authenticate/auth.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';
import * as shoppingListActions from 'src/app/shopping-list/store/shopping-list.actions'
import * as fromApp from 'src/app/store/app.reducer';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{

    private storeSub: Subscription;
    state: fromShoppingList.State;

    //Have subscribe method here to emit error when database is empty and get request occurs

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService, private store: Store<fromApp.AppState>){
        //Dont think its wise setup subscription here?
        this.storeSub = this.store.select('shoppingList').subscribe((state) => {
            console.log("state received")
            this.state = state;
        })
    }


    getRecipes(){
        //Get recipes
        //Note that observable is returned here and subscribe therefore has to be done in calling function
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/recipes/.json')
        .pipe(map((responseData) => {
            //This code adds an ingredient key and assigns it a value of [] for Recipes in the database that do not have an ingredients property which is possible as the ingredients are not required in the form.
            for(let item of responseData){
                if(item['ingredients'] === undefined){
                    item['ingredients'] = [];
                }
            }
            return responseData

            //courses code:
            // return responseData.map(recipe => {
            //     return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            // });
        }),
        tap((responseData)=>{
            this.recipeService.updateFromServer(responseData);
        }))
    }

    getShoppingList(){
         //Get shopping list
        this.http.get<Ingredient[]>('https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/shopping-list/.json')
        .subscribe((responseData) => {
            // console.log(responseData);
            if(responseData === null){
                let error = new Error("There are no ingredients in the database!");
                console.log(error);
            }else{
                this.store.dispatch(new shoppingListActions.UpdateFromServer(responseData));
            }
        })
    }

    storeData(){
        //Use put to update database wether its empty or not
        //Put recipes
        let url = 'https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/recipes/.json';
        this.http.put<{[key: string] : string}>(url, this.recipeService.getRecipes(), {
            observe: 'body'
        })
        .subscribe((responseData) => {
            console.log(responseData);
        })

        //Put shopping list
        console.log("inside storedata(), list: " + this.state.ingredients);
        url = 'https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/shopping-list/.json';
        console.log(url);
        this.http.put<{[key: string] : string}>(url, this.state.ingredients, {
            observe: 'body'
        })
        .subscribe((responseData) => {
            console.log(responseData);
        })
    }
}