import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CourseProject';

  //code used before routing was implemented
  // recipeDisplay:boolean = true;
  // shoppingListDisplay:boolean = false;
  // // currentNav:string = '';

  // onNavigate(navTarget: string){
  //   // console.log(navTarget);
  //   if(navTarget === "nav-recipe"){
  //     this.recipeDisplay = true;
  //     this.shoppingListDisplay = false;
  //   }else if(navTarget === "nav-Shopping-List"){
  //     this.shoppingListDisplay = true;
  //     this.recipeDisplay = false;
  //   }
  // }
}
