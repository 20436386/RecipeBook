import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipes.model';
import { Store } from '@ngrx/store';
import * as shoppingListActions from 'src/app/shopping-list/store/shopping-list.actions'
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';


@Injectable()
export class RecipeService{

    //Event emitter was used to pass selected recipe before routing was implemented
    // recipeSelected = new EventEmitter<Recipe>();

    recipeListUpdated = new Subject<Recipe[]>()

    // private recipes: Recipe[] = [
    //     new Recipe('Eggs Benedict',
    //     'Eggs and salmon on toast', 
    //     'http://3.bp.blogspot.com/-_pdJXbExgXE/U8tXlkuY5MI/AAAAAAAAJyA/Z2wBv7EYG9M/s1600/1.jpg',
    //     [
    //         new Ingredient('egg', 2),
    //         new Ingredient('bread', 1)
    //     ]),
    //     new Recipe('Pepparoni Pizza', 
    //     'The only way to make a pizza!', 
    //     'https://riotfest.org/wp-content/uploads/2016/10/Pepperoni_1.jpg',
    //     [
    //         new Ingredient('pepperoni', 300),
    //         new Ingredient('pizza base', 1)
    //     ])
    //   ];

    private recipes: Recipe[] = [];

    constructor(private store: Store<fromShoppingList.AppState>){}

    get length(){
        return this.recipes.length;
    }

    addRecipe(recipe: Recipe){
      console.log("addRecipe entered");
        this.recipes.push(recipe);
        console.log(this.recipes);
        this.recipeListUpdated.next(this.recipes.slice());
    }

    updateRecipe(recipe: Recipe, index: number){
        this.recipes.splice(index, 1, recipe);
        this.recipeListUpdated.next(this.recipes.slice());
    }
    updateFromServer(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeListUpdated.next(this.recipes.slice());
    }

    removeRecipe(index:number){
        this.recipes.splice(index, 1);
        this.recipeListUpdated.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes.slice()[index];
    }

    onAddToShoppingList(ingredients: Ingredient[]){
        this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
    }
    
}