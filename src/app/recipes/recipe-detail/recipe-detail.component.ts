import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { Recipe } from '../recipes.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromRecipes from 'src/app/recipes/store/recipe.reducer';
import * as recipeActions from '../store/recipe.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy{

  // @Input() recipe: Recipe;
  recipe: Recipe;
  // probably dont need this
  recipeIndex: number;
  storeSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.route.params.pipe(map((params: Params) => {
      return +params['recipeId']
    }),
    switchMap((recipeId) => {
      this.recipeIndex = recipeId; 
      return this.store.select('recipes');
    }))
    .subscribe((state: fromRecipes.State) => {
      this.recipe = state.recipes[this.recipeIndex];
    })


    // this.route.params.subscribe((params: Params) => {
    //   this.recipeIndex = (+params['recipeId']); 
    //   // this.recipe = this.recipeService.getRecipes()[this.recipeIndex];

    //   this.store.dispatch(new recipeActions.UpdateIndex(this.recipeIndex));
    // })

    // this.storeSub = this.store.select('recipes').subscribe((state: fromRecipes.State) => {
    //   this.recipe = state.recipes[state.focusedIndex];
    // })
  }

  onAddToList(){
    // this.recipeService.onAddToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new recipeActions.AddToShoppingList(this.recipe.ingredients));
  }

  onDelete(){
    // this.recipeService.removeRecipe(this.recipeIndex);
    // this.router.navigate(['/recipes']);

    //Using the store:
    this.store.dispatch(new recipeActions.RemoveRecipe(this.recipeIndex));
  }

  ngOnDestroy(): void {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }   
  }

}
