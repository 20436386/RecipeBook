import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes.model';
import * as fromRecipes from '../store/recipe.reducer';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  // private listChangedSub: Subscription;
  storeSub: Subscription;


  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // this.recipes = this.recipeService.getRecipes();
    // Get recipes with the store:
    this.storeSub = this.store.select('recipes').subscribe((state: fromRecipes.State) =>{
      this.recipes = state.recipes;
    })
    // this.listChangedSub = this.recipeService.recipeListUpdated.subscribe((list: Recipe[]) => {
    //   this.recipes = list;
    // })
  }

  ngOnDestroy(): void {
      // this.listChangedSub.unsubscribe();
      if(this.storeSub){
        this.storeSub.unsubscribe();
      }
  }

  //Used before routing setup
  // onRecipeSelect(selectedRecipe: Recipe){
  //   console.log('recipeSelect executed')
  //   this.recipeService.recipeSelected.emit(selectedRecipe);
  // }

}
