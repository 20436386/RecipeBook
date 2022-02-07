import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent implements OnInit {

  //Code used before routing setup
  // focusedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    //Code used before routing setup
    //   this.recipeService.recipeSelected.subscribe((selectedRecipe: Recipe) =>{
    //   this.focusedRecipe = selectedRecipe;
    // })
  }
}
