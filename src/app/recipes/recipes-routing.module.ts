import { NgModule } from "@angular/core";
import { Route, Router, RouterModule } from "@angular/router";
import { AuthGuardService } from "../authenticate/auth-guard.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";

const recipeRoutes: Route[] = [
  //Was initially 'recipes'
    {path: '', 
        canActivate : [AuthGuardService],
        component: RecipesComponent, 
        children: [
            {path: '', component: SelectRecipeComponent},
            {path: 'detail/:recipeId', component: RecipeDetailComponent, resolve:[RecipeResolverService]},
            {path: 'new', component: RecipeEditComponent},
            {path: 'update/:recipeId', component: RecipeEditComponent, resolve:[RecipeResolverService]}
        ],
        //This ensures that if the user logs out while on the recipe page, the authGuard will be rerun.
        //https://angular.io/api/router/Route#runGuardsAndResolvers
        // runGuardsAndResolvers: 'always'
        
    }];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {}