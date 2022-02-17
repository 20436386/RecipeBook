import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuardService } from "../authenticate/auth-guard.service";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";


@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ShoppingListComponent, canActivate: [AuthGuardService]}
        ])
    ]
})
export class ShoppingListModule {}