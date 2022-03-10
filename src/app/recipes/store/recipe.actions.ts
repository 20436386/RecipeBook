import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import { Recipe } from "../recipes.model";

export const ADD_RECIPE = '[Recipe] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipe] UPDATE_RECIPE';
export const REMOVE_RECIPE = '[Recipe] REMOVE_RECIPE';
export const UPDATE_INDEX = '[Recipe] UPDATE_INDEX';
export const UPDATE_FROM_SERVER = '[Recipe] UPDATE_FROM_SERVER';
export const FETCH_RECIPES = '[Recipe] FETCH_RECIPES';
export const ADD_TO_SHOPPING_LIST = '[Recipe] ADD_TO_SHOPPING_LIST';
export const STORE_RECIPES = '[Recipe] STORE_RECIPES';

export class AddRecipe implements Action{
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe){}
}

export class UpdateRecipe implements Action{
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {recipe: Recipe, index: number}){}
}

export class RemoveRecipe implements Action{
    readonly type = REMOVE_RECIPE;
    constructor(public payload: number){}
}

export class UpdateFromServer implements Action{
    readonly type = UPDATE_FROM_SERVER;
    constructor(public payload: Recipe[]){}
}

export class FetchRecipes implements Action{
    readonly type = FETCH_RECIPES;
}

export class AddToShoppingList implements Action{
    readonly type = ADD_TO_SHOPPING_LIST;
    constructor(public payload: Ingredient[]){}
}

export class UpdateIndex implements Action{
    readonly type = UPDATE_INDEX;
    constructor(public payload: number){}
}

export class StoreRecipes implements Action{
    readonly type = STORE_RECIPES;
}

export type recipeActions = AddRecipe | UpdateRecipe | RemoveRecipe | UpdateFromServer | AddToShoppingList | UpdateIndex;