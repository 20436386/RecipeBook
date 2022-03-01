import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit, OnDestroy {

  // There is a bug here: if you go to register then click on login, it doesnt change back to login. Possibly pass the mode as a parameter with the route
  // Note Code in the component should be primarily focused on updating the UI, therefore error handling has been done in the auth.service.ts

  userForm: FormGroup;
  loginMode: boolean;
  errorResponse: boolean;
  errorResponseMessage: string;
  isLoading: boolean;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  storeSub: Subscription;

  // private closeSub: Subscription;


  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.loginMode = true;
    this.errorResponse = false;
    
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
        if(authState.authError !== null){
          this.errorResponse = true;
        }else{
          this.errorResponse = false;
        }
        this.errorResponseMessage = authState.authError;
    })
  }

  onRegister(){
    this.loginMode = false;
    this.errorResponse = false;
    this.errorResponseMessage = null;
  }

  onSubmit(){
    console.log(this.userForm);
    console.log(this.userForm.value);


    this.isLoading = true;
    if(this.loginMode){
      // authObs = this.authService.signIn(this.userForm.value);
      this.store.dispatch(new authActions.LoginStart(this.userForm.value));
    }else{
      // authObs = this.authService.signUp(this.userForm.value);
      this.store.dispatch(new authActions.RegisterStart(this.userForm.value))
    }

    this.userForm.reset();
  }

  // onHandleError(){
  //   this.errorResponse = false;
  //   this.errorResponseMessage = null;
  // }

  // private showErrorAlert(message: string){
  //   const hostVCF = this.alertHost.viewContainerRef;
  //   hostVCF.clear();
  //   const componentRef = hostVCF.createComponent(AlertComponent);

  //   componentRef.instance.message = message;
  //   this.closeSub = componentRef.instance.event.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostVCF.clear();
  //   })
  // }

  ngOnDestroy(): void {
      if (this.storeSub){
        this.storeSub.unsubscribe();
      }
  }

}
