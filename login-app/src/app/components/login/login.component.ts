import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup : FormGroup;
  invalidLogin : boolean = false;

  constructor(private formBuilder : FormBuilder, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      user : this.formBuilder.group({
        username : new FormControl('', [Validators.minLength(2), Validators.required]),
        password : new FormControl('', [Validators.required, Validators.minLength(8)])
      })
    });
  }

  get username() { return this.loginFormGroup.get('user.username'); }
  get password() { return this.loginFormGroup.get('user.password')}

  onSubmit() {
    if(this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    const username : string = this.loginFormGroup.get('user.username').value;
    const password : string = this.loginFormGroup.get('user.password').value;

    console.log(`username: ${username}, password: ${password}`);

    this.authService.authenticate(username, password).subscribe(
      data => {
        this.router.navigate(['/user-list']);
        this.invalidLogin = false;
      }, error => {
        this.invalidLogin = true;
      }
    );
  }

}
