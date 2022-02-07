import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  private listChangedSub: Subscription;


  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.listChangedSub = this.recipeService.recipeListUpdated.subscribe((list: Recipe[]) => {
      this.recipes = list;
    })
  }

  ngOnDestroy(): void {
      this.listChangedSub.unsubscribe();
  }

  //Used before routing setup
  // onRecipeSelect(selectedRecipe: Recipe){
  //   console.log('recipeSelect executed')
  //   this.recipeService.recipeSelected.emit(selectedRecipe);
  // }

}
