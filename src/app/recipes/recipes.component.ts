import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent implements OnInit {

  //Code used before routing setup
  // focusedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
    //Code used before routing setup
    //   this.recipeService.recipeSelected.subscribe((selectedRecipe: Recipe) =>{
    //   this.focusedRecipe = selectedRecipe;
    // })
  }
}
