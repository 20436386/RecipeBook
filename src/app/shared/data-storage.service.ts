import { HttpClient, HttpEventType, HttpParams, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppinglist.service';
import { AuthService } from '../authenticate/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{

    //Have subscribe method here to emit error when database is empty and get request occurs

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService, 
        private shoppingListService: ShoppingListService){}

    getRecipes(){
        //Get recipes
        //Note that observable is returned here and subscribe therefore has to be done in calling function
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            console.log(user)
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/recipes/.json', {
            observe: "body",
            params: new HttpParams().set('auth', user.token)
            })
        })
        ).pipe(map((responseData) => {
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
         this.authService.user.pipe(take(1)).subscribe(user => {
            this.http.get<Ingredient[]>('https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/shopping-list/.json', {
                observe: "body",
                params: new HttpParams().set('auth', user.token)
            }).subscribe((responseData) => {
                // console.log(responseData);
                if(responseData === null){
                    let error = new Error("There are no ingredients in the database!");
                    console.log(error);
                }else{
                    this.shoppingListService.updateFromServer(responseData);
                }
            })
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
        url = 'https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/shopping-list/.json';
        console.log(url);
        this.http.put<{[key: string] : string}>(url, this.shoppingListService.getIngredients(), {
            observe: 'body'
        })
        .subscribe((responseData) => {
            console.log(responseData);
        })
    }
}