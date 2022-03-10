import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipes.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromRecipes from 'src/app/recipes/store/recipe.reducer';
import * as recipeActions from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  editMode: boolean = false;
  private recipeIndex: number;
  private focusedRecipe: Recipe
  recipeForm: FormGroup;
  private storeSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['recipeId'] != null){
        this.editMode = (params['recipeId'] != null);
        this.recipeIndex = +params['recipeId'];
        this.store.dispatch(new recipeActions.UpdateIndex(this.recipeIndex));
      }
      // this.formInit();
    })
    console.log("edit mode = " + this.editMode);
    this.formInit();
  }

  private formInit(){
    this.recipeForm = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "imgpath": new FormControl(null, Validators.required),
      "description": new FormControl(null, Validators.required),
      "ingredients": new FormArray([])
    });

    if(this.editMode){
      //Get relevant recipe
      // this.focusedRecipe = this.recipeService.getRecipe(this.recipeIndex);
      // Get recipes with the store
      this.storeSub = this.store.select('recipes').subscribe((state: fromRecipes.State) => {
        this.focusedRecipe = state.recipes[state.focusedIndex];
      })
      
      //setup initial values
      this.recipeForm.patchValue({
        "name": this.focusedRecipe.name,
        "imgpath": this.focusedRecipe.imgpath,
        "description": this.focusedRecipe.description
      })
      for(let item of this.focusedRecipe.ingredients){
        const ingredient = new FormGroup({
          "name": new FormControl(item.name),
          "amount": new FormControl(item.amount, Validators.pattern(/^[1-9]+[0-9]*$/)),
        });
        (<FormArray>this.recipeForm.get("ingredients")).push(ingredient);
      }
    }else{
      const ingredient = new FormGroup({
        "name": new FormControl(null),
        "amount": new FormControl(null,  Validators.pattern("^[1-9]+[0-9]$")),
      });
      (<FormArray>this.recipeForm.get("ingredients")).push(ingredient);
    }
  }

  onSubmit(){
    console.log(this.recipeForm.controls);
    //Dont need to do this as recipeForm.values object has the same structure as Recipe model
    // const recipe = new Recipe(this.recipeForm.value["name"], this.recipeForm.value["description"], this.recipeForm.value["imgPath"], this.recipeForm.value['ingredients']);

    //Determine if new recipe should be created or existing one updated
    if(this.editMode){
      //Update existing recipe
      // this.recipeService.updateRecipe(this.recipeForm.value, this.recipeIndex);
      // this.router.navigate(['recipes/detail', this.recipeIndex]);

      //now using the store
      const payload = {
        recipe: {...this.recipeForm.value},
        index: this.recipeIndex
      };
      this.store.dispatch(new recipeActions.UpdateRecipe(payload));

    }else{
      //Create new recipe
      // this.recipeService.addRecipe(recipe);
      // this.recipeService.addRecipe(this.recipeForm.value);
      // this.router.navigate(['recipes/detail', (this.recipeService.length - 1)]);

      // Update existing recipe using store
      this.store.dispatch(new recipeActions.AddRecipe(this.recipeForm.value));
    }
  }

  get controls(){
    // console.log((<FormArray>this.recipeForm.get('ingredients')).controls)
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient(){
    const control = new FormGroup({
      "name": new FormControl(null),
      "amount": new FormControl(null),
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(control);
  }

  removeIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(): void {
      if(this.storeSub){
        this.storeSub.unsubscribe();
      }
  }

}
