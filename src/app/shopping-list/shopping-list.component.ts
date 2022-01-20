import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('cheese', 20)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  updateList(updateInfo:{action:string, data:Ingredient}){
    console.log("updateList called")
    if(updateInfo.action === "add"){
      this.ingredients.push(updateInfo.data);
    }else if(updateInfo.action ==="remove"){
      
      let index = this.ingredients.findIndex((element)=>{
        if((element.name === updateInfo.data.name) && (element.amount === updateInfo.data.amount)){
          return true;
        }else{
          return false;
        }
      });
      
      if(index !== -1){
        this.ingredients.splice(index, 1);
      }else{
        return console.log("Entry Does not exist");
      }
    }
  }

}
