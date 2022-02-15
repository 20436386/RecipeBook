import { Component, OnInit } from '@angular/core';
import { AuthService } from './authenticate/auth.service';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
  title = 'CourseProject';

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.autoLogin();    
  }

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
