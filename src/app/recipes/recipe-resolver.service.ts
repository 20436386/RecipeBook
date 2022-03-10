import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';

import { Recipe} from './recipes.model'
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as recipeActions from '../recipes/store/recipe.actions';
import * as fromRecipe from '../recipes/store/recipe.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log("Inside recipe resolver");
    return this.store.select("recipes").pipe(
        //NB will not load detail page without the take operator. Take operator ensures we do not do this multiple times.
        take(1),
        switchMap((state: fromRecipe.State) => {
        if(state.recipes.length === 0){
          console.log("Recipes of length zero, fetching recipes");
          this.store.dispatch(new recipeActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(recipeActions.UPDATE_FROM_SERVER),
            //Note that code here will execute after UpdateFromServer action has completed
            //The take operator is used so that value is taken once and then subscription is destroyed i.e. no ongoing subscription.
            take(1)
          )
        }else{
          console.log("Recipes length not zero");
          return of(state.recipes);
        }
      })
    );
      
  }
}
