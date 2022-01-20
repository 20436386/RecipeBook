import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // private focusedRecipe: Recipe;
  focusedRecipe: Recipe;
  // @Input() detailDisabled: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  // getFocusedRecipe(){
  //   console.log("getFocusedRecipe executed")
  //   console.log(this.focusedRecipe)
  //   return this.focusedRecipe;
  // }

  onRecipeSelected(focusedRecipe: Recipe){
    // console.log("onRecipeSelected executed")
    // console.log(focusedRecipe)
    this.focusedRecipe = focusedRecipe;
    // this.detailDisabled = false;
  }
}
