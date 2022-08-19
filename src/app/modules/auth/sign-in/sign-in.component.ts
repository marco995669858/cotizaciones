import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginI } from '@data/interfaces/form/LoginI.interface';
import { SnackBar } from '@data/interfaces/shared/snackbarI.interface';
import { AuthService } from '@data/services/auth/auth.service';
import { LoaderService } from '@data/services/loader/loader.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  public loginForm: FormGroup;
  public snackbar: SnackBar;
  public showSnackBar: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public loaderService: LoaderService
    ) {
  }

  ngOnInit(): void {
   // this.loginForm = this.formBuilder.group({
     // email: ['', [Validators.required, Validators.email]],
      //password: ['', [Validators.required]]
    //});
  }

  onLogin(): any {
    //const form: LoginI = this.loginForm.value;
    //this.authService.sign_in(form).subscribe( r => {
      //if(!r.error){
        //localStorage.setItem('token', r.data);
        this.router.navigate(['inicio']);
      //}else{
        //this.snackbar = new SnackBar("Credenciales incorrectas", 2, true);
        //this.showSnackBar = true;
      //}
    //})
  }

  //onCloseSnackbar(): any {
    //this.showSnackBar = false;
  //}
}
