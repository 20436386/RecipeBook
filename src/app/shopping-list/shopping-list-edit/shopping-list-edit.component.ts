import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('ingredientName', {static:false}) name: ElementRef;
  @ViewChild('ingredientAmount', {static:false}) amount: ElementRef;
  @Output() shoppingListEdit = new EventEmitter<{action:string, data:Ingredient}>();

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    console.log("onAdd called")
    this.shoppingListEdit.emit({
      action: "add", 
      data: {name: this.name.nativeElement.value,
      amount: parseInt(this.amount.nativeElement.value)}
    })
}

  onDelete(){
    this.shoppingListEdit.emit({
      action: "remove", 
      data: {name: this.name.nativeElement.value,
      amount: parseInt(this.amount.nativeElement.value)}
    })
}

  onClear(){
    console.log(this.name)
    this.name.nativeElement.value = '';
    this.amount.nativeElement.value = '';
  }

}
