import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';
import * as fromAuthenticate from 'src/app/authenticate/store/auth.reducer';
import * as fromRecipes from 'src/app/recipes/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State,
    auth: fromAuthenticate.State,
    recipes: fromRecipes.State
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuthenticate.authReducer,
    recipes: fromRecipes.recipeReducer
}