import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, take, tap, withLatestFrom } from "rxjs";
import * as recipeActions from '../store/recipe.actions';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromRecipes from 'src/app/recipes/store/recipe.reducer';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes.model";


@Injectable()
export class RecipeEffects {

    //review this
    recipeAdd = createEffect(() => {
        return this.actions$.pipe(
            ofType(recipeActions.ADD_RECIPE),
            withLatestFrom(this.store.select('recipes')),
            tap(([actionData, recipeState]) => {
                var len = recipeState.recipes.length;
                this.router.navigate(['/recipes/detail/', len - 1]);
            })
        );
    }, {dispatch: false});

    recipeDelete = createEffect(() => {
        return this.actions$.pipe(
            ofType(recipeActions.REMOVE_RECIPE),
            tap((recipeData: recipeActions.RemoveRecipe) => {
                this.router.navigate(['/recipes']);
            })
        );
    }, {dispatch: false});

    recipeUpdate = createEffect(() => {
        return this.actions$.pipe(
            ofType(recipeActions.UPDATE_RECIPE),
            tap((recipeData: recipeActions.UpdateRecipe) => {
            console.log("Inside update recipe in effects");

                this.router.navigate(['/recipes/detail/', recipeData.payload.index]);
                // this.router.navigate(['/recipes']);
            })
        )
    }, {dispatch: false});

    fetchRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(recipeActions.FETCH_RECIPES),
            switchMap(() => {
                console.log("Inside fetchRecipes");

                return this.http.get<Recipe[]>('https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/recipes/.json')
                .pipe(map((responseData) => {
                    //This code adds an ingredient key and assigns it a value of [] for Recipes in the database that do not have an ingredients property which is possible as the ingredients are not required in the form.
                    for(let item of responseData){
                        if(item['ingredients'] === undefined){
                            item['ingredients'] = [];
                        }
                    }
                    console.log("Inside fetchRecipes.pipe.map");
                    return new recipeActions.UpdateFromServer(responseData);               
                }))
            })
        )
    });

    storeRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(recipeActions.STORE_RECIPES),
            withLatestFrom(this.store.select("recipes")),
            switchMap(([actionData, recipeState]) => {
                let url = 'https://ng-course-recipe-book-b490c-default-rtdb.firebaseio.com/recipes/.json';
                return this.http.put<{[key: string] : string}>(url, recipeState.recipes, {
                    observe: 'body'
                })
            })
        )
    }, {dispatch: false});

    addToShoppingList = createEffect(() => {
        return this.actions$.pipe(
            ofType(recipeActions.ADD_TO_SHOPPING_LIST),
            map((recipeData: recipeActions.AddToShoppingList) => {
                return new shoppingListActions.AddIngredients(recipeData.payload);
            })
        )
    });
    
    constructor(private actions$: Actions, private router: Router, private store: Store<fromApp.AppState>, private http: HttpClient){}
}
