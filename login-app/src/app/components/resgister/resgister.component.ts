import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/common/user-dto';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./resgister.component.css']
})
export class ResgisterComponent implements OnInit {

  registerFormGroup : FormGroup;

  constructor(private formBuilder : FormBuilder, private userService : CustomersService, private router : Router) { }

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      user : this.formBuilder.group({
        firstName : new FormControl('', [Validators.minLength(2), Validators.required]),
        lastName : new FormControl('', [Validators.required, Validators.minLength(2)]),
        username : new FormControl('', [Validators.minLength(2), Validators.required]),
        email : new FormControl('', [Validators.minLength(5), Validators.required]),
        password : new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")])        
      })
    });
  }

  get firstName() { return this.registerFormGroup.get('user.firstName'); }
  get lastName() { return this.registerFormGroup.get('user.lastName'); }
  get username() { return this.registerFormGroup.get('user.username'); }
  get password() { return this.registerFormGroup.get('user.password'); }
  get email() { return this.registerFormGroup.get('user.email'); }


  onSubmit() {
    if(this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      return;
    }

    const firstName : string = this.registerFormGroup.get('user.firstName').value;
    const lastName : string = this.registerFormGroup.get('user.lastName').value;
    const email : string = this.registerFormGroup.get('user.email').value;
    const username : string = this.registerFormGroup.get('user.username').value;
    const password : string = this.registerFormGroup.get('user.password').value;

    console.log(`${firstName}, ${lastName}, ${email}, ${password}, ${username}`);

    const user = new UserDto(firstName, lastName, email, username, password);

    this.userService.registerUser(user).subscribe({
      next : data => {
        const name = data.firstName;
        alert(`Congratulations ${name}! You have been registered successfully. \n You can now log in to the console`);
        this.router.navigate(['/login']);
      }, error : err => {
        alert(`There have been an error : ${err.message}`)
      }
    });
  }

}
