import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm', {static: false}) ingredientForm: NgForm;
  private ingredientSelectedSub: Subscription;
  //Used to conditionally display html elements
  editMode: boolean = false;
  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('shoppingList').subscribe((state) => {

      if(state.selectedIngredientIndex !== null){
        this.ingredientForm.setValue({
          ingredientName: state.selectedIngredient.name,
          ingredientAmount: state.selectedIngredient.amount
        });
        this.editMode = true;
      }else{
        this.editMode = false;
      }
    })
    // this.ingredientSelectedSub = this.shoppingListService.ingredientSelectedIndex.subscribe(this.ingredientEdit.bind(this))
  }

  onSubmit(){
    let ingredient = new Ingredient(this.ingredientForm.value['ingredientName'], this.ingredientForm.value['ingredientAmount']);

    if(!this.editMode){
      // this.shoppingListService.addItem(ingredient);
      // Using the store to add an ingredient now
      let action = new shoppingListActions.AddIngredient(ingredient);
      this.store.dispatch(action);
    }else{
      // this.shoppingListService.onEditItem(this.editIndex, ingredient);
      let action = new shoppingListActions.UpdateIngredient(ingredient);
      this.store.dispatch(action);
      this.store.dispatch(new shoppingListActions.StopEdit());
      this.editMode = false;
    }
    this.ingredientForm.reset();
   
  }

  // ingredientEdit(index: number){
  //   console.log("ingredientEdit exec")
  //   let item = this.shoppingListService.getIngredients()[index];
  //   this.ingredientForm.setValue({
  //     ingredientName: item.name,
  //     ingredientAmount: item.amount
  //   });
  //   this.editMode = true;
  //   this.editIndex = index;
  // }


  onClearForm(){
    this.ingredientForm.reset();
    this.store.dispatch(new shoppingListActions.StopEdit());
    this.editMode = false;
  }

  // onDelete(){
  //   if(this.editMode){
  //     this.shoppingListService.onDeleteItem(this.editIndex);
  //     this.ingredientForm.reset();
  //     this.editMode = false;
  //   }
  // }

  onDelete(){
    if(this.editMode){
      // this.shoppingListService.onDeleteItem(this.editIndex);
      let action = new shoppingListActions.DeleteIngredient();
      this.store.dispatch(action);
      this.ingredientForm.reset();
      this.store.dispatch(new shoppingListActions.StopEdit());
      this.editMode = false;
    }
  }

  ngOnDestroy(): void {
    // this.ingredientSelectedSub.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit());
    this.storeSub.unsubscribe();
  }

}
