import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode: boolean = false;
  private recipeIndex: number;
  private focusedRecipe: Recipe
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['recipeId'] != null){
        this.editMode = (params['recipeId'] != null);
        this.recipeIndex = +params['recipeId'];
      }
      this.formInit();
    })
    console.log("edit mode = " + this.editMode);
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
      this.focusedRecipe = this.recipeService.getRecipe(this.recipeIndex);
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
      // this.recipeService.updateRecipe(recipe, this.recipeIndex);
      this.recipeService.updateRecipe(this.recipeForm.value, this.recipeIndex);
      this.router.navigate(['recipes/detail', this.recipeIndex]);

    }else{
      //Create new recipe
      // this.recipeService.addRecipe(recipe);
      this.recipeService.addRecipe(this.recipeForm.value);
      this.router.navigate(['recipes/detail', (this.recipeService.length - 1)]);
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

}
