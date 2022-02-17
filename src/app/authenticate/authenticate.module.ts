import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthenticateComponent } from "./authenticate.component";

@NgModule({
    declarations:[
        AuthenticateComponent
    ],
    imports:[
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: AuthenticateComponent}
        ])
    ]
})
export class AuthenticateModule{}