import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { AlertComponent } from "./alert/alert.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { SpinnerIconComponent } from "./spinner-icon/spinner-icon.component";



@NgModule({
    declarations: [
        DropdownDirective,
        SpinnerIconComponent,
        AlertComponent,
        PlaceholderDirective,
    ],
    exports: [
        DropdownDirective,
        SpinnerIconComponent,
        AlertComponent,
        PlaceholderDirective,
    ]
})
export class SharedModule {}