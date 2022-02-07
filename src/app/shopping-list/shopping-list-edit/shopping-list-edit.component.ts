import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm', {static: false}) ingredientForm: NgForm;
  private ingredientSelectedSub: Subscription;
  editMode: boolean = false;
  private editIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientSelectedSub = this.shoppingListService.ingredientSelectedIndex.subscribe(this.ingredientEdit.bind(this))
  }

  onSubmit(){
    let ingredient = new Ingredient(this.ingredientForm.value['ingredientName'], this.ingredientForm.value['ingredientAmount']);

    if(!this.editMode){
      this.shoppingListService.addItem(ingredient);
    }else{
      this.shoppingListService.onEditItem(this.editIndex, ingredient);
      this.editMode = false;
    }
    this.ingredientForm.reset();
   
  }

  ingredientEdit(index: number){
    console.log("ingredientEdit exec")
    let item = this.shoppingListService.getIngredients()[index];
    this.ingredientForm.setValue({
      ingredientName: item.name,
      ingredientAmount: item.amount
    });
    this.editMode = true;
    this.editIndex = index;
  }

  onClearForm(){
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete(){
    if(this.editMode){
      this.shoppingListService.onDeleteItem(this.editIndex);
      this.ingredientForm.reset();
      this.editMode = false;
    }
  }

  ngOnDestroy(): void {
      this.ingredientSelectedSub.unsubscribe();
  }

}
