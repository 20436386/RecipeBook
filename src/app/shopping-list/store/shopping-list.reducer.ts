import { Ingredient } from "../../shared/ingredient.model";
import * as shoppingListActions from './shopping-list.actions'


export interface State{
    ingredients: Ingredient[],
    selectedIngredient: Ingredient,
    selectedIngredientIndex: number
}

// const initialState: State = {
//     ingredients: [
//         new Ingredient('cheese', 20),
//         new Ingredient('onion', 40)
//     ],
//     selectedIngredient: null,
//     selectedIngredientIndex: null
// }

const initialState: State = {
    ingredients: [],
    selectedIngredient: null,
    selectedIngredientIndex: null
}

export function shoppingListReducer(state = initialState, action: shoppingListActions.shoppingListActions){

    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case shoppingListActions.ADD_INGREDIENT:
            //Course code:
            // return {
            //     ...state,
            //     ingredients: [ ...state.ingredients, action.payload]
            // } 

            //Shallow copy of the state does not allow editing of the ingredients array for some reason, deep copy does work.
            // error: array with non-writable length js meaning 
            newState.ingredients.push(action.payload);
            //Makes object immutable
            Object.freeze(newState);
            return newState;

        case shoppingListActions.ADD_INGREDIENTS:
            newState.ingredients.push(...action.payload);
            Object.freeze(newState);
            return newState;
        
        case shoppingListActions.UPDATE_INGREDIENT:
            newState.ingredients[newState.selectedIngredientIndex].name = action.payload.name;
            newState.ingredients[newState.selectedIngredientIndex].amount = action.payload.amount;
            newState.selectedIngredient = null;
            newState.selectedIngredientIndex = null;
            Object.freeze(newState);
            return newState;
        
        case shoppingListActions.DELETE_INGREDIENT:
            newState.ingredients.splice(newState.selectedIngredientIndex, 1);
            newState.selectedIngredient = null;
            newState.selectedIngredientIndex = null;
            Object.freeze(newState);
            return newState;
        
        case shoppingListActions.UPDATE_FROM_SERVER:
            newState.ingredients = action.payload;
            newState.selectedIngredient = null;
            newState.selectedIngredientIndex = null;
            Object.freeze(newState);
            return newState;

        case shoppingListActions.START_EDIT:
            newState.selectedIngredientIndex = action.payload;
            newState.selectedIngredient = state.ingredients[action.payload];
            Object.freeze(newState);
            return newState;
        
        case shoppingListActions.STOP_EDIT:
            newState.selectedIngredientIndex = null;
            newState.selectedIngredient = null;
            Object.freeze(newState);
            return newState;
        
        default:
            return state;
    }
}