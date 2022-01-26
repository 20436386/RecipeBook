import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppinglist.service';
import { Recipe } from './recipes.model';

@Injectable()
export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Eggs Benedict',
        'Eggs and salmon on toast', 
        'http://3.bp.blogspot.com/-_pdJXbExgXE/U8tXlkuY5MI/AAAAAAAAJyA/Z2wBv7EYG9M/s1600/1.jpg',
        [
            new Ingredient('egg', 2),
            new Ingredient('bread', 1)
        ]),
        new Recipe('Pepparoni Pizza', 
        'The only way to make a pizza!', 
        'https://riotfest.org/wp-content/uploads/2016/10/Pepperoni_1.jpg',
        [
            new Ingredient('pepperoni', 300),
            new Ingredient('pizza base', 1)
        ])
      ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    onAddToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addManyItems(ingredients);
    }
    
}