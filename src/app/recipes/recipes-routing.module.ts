import { NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthGuardService } from "../authenticate/auth-guard.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";

const recipeRoutes = [
{path: 'recipes', 
    canActivate : [AuthGuardService],
    component: RecipesComponent, 
    children: [
        {path: '', component: SelectRecipeComponent},
        {path: 'detail/:recipeId', component: RecipeDetailComponent, resolve:[RecipeResolverService]},
        {path: 'new', component: RecipeEditComponent},
        {path: 'update/:recipeId', component: RecipeEditComponent, resolve:[RecipeResolverService]}
    ]}];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {}