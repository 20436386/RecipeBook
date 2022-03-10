import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import { Recipe } from "../recipes.model";
import * as recipeActions from './recipe.actions';

export interface State {
    recipes: Recipe[],
    focusedIndex: number,
}

// const initialState: State = {
//     recipes: [
//             new Recipe('Pasta',
//             'Yummy pasta!', 
//             'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmodernlittlevictories.com%2Fwp-content%2Fuploads%2F2017%2F08%2Fputtanesca-9.jpg&f=1&nofb=1',
//             [
//                 new Ingredient('pasta', 1),
//                 new Ingredient('basil', 50)
//             ]),
//             new Recipe('Pepparoni Pizza', 
//         'The only way to make a pizza!', 
//         'https://riotfest.org/wp-content/uploads/2016/10/Pepperoni_1.jpg',
//         [
//             new Ingredient('pepperoni', 300),
//             new Ingredient('pizza base', 1)
//         ])
//     ],
//     focusedIndex: null

// }

const initialState: State = {
    recipes: [],
    focusedIndex: null

}

export function recipeReducer(state: State = initialState, action: recipeActions.recipeActions){
    
    let newState : State = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case recipeActions.ADD_RECIPE:
            // console.log("Inside add recipe in reducer");
            newState.recipes.push(action.payload);
            // newState.listLen = newState.recipes.length;
            newState.focusedIndex = newState.recipes.length - 1;
            Object.freeze(newState);
            return newState;

        case recipeActions.UPDATE_INDEX:
            newState.focusedIndex = action.payload;
            Object.freeze(newState);
            return newState;

        case recipeActions.REMOVE_RECIPE:
            //NB should use filter here as it return as new list and does'nt mutate the old list.
            newState.recipes.splice(action.payload, 1);
            newState.focusedIndex = null;
            //should place redirect in effects
            Object.freeze(newState);
            return newState;
        
        case recipeActions.UPDATE_RECIPE:
            console.log("Inside update recipe in reducer");
            //should maybe make deep copy
            newState.recipes[action.payload.index] =  action.payload.recipe;
            newState.focusedIndex = action.payload.index;
            Object.freeze(newState);
            return newState;
        
        case recipeActions.UPDATE_FROM_SERVER:
            console.log("Inside update recipes from server in reducer");
            newState.recipes = [... action.payload];
            Object.freeze(newState);
            return newState;
        
        default:
            return state;
    }
}