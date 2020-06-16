import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';
import { Router} from '@angular/router';
import * as CONSTANT from '../services/constants';
import {UserRegistrationComponentService} from './user-registration.service';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  form:FormGroup;
  submitted = false;

  constructor(
    private admin:AdminService,
    private router: Router,
    private fb: FormBuilder,
    private sp: UserRegistrationComponentService,

  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'name' : new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(45)]),
      'email' : new FormControl('',[Validators.required, Validators.pattern(CONSTANT.EMAIL_REGEX)]),
      'mobileNumber' : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)] ),
      'password' : new FormControl('',[Validators.required, Validators.pattern(CONSTANT.PASSWORD_REGEX)]),
      'confirmPassword' : new FormControl('',[Validators.required,])
    }, this.passwordMatchValidator)
  }
  get formCheck() { return this.form.controls;}
  userRegistation(){
    this.submitted=true;
    if (this.form.invalid){
      return;  
    }else{
      let url = 'http://localhost:3000/UserRegistration';
      let data = {};
      data['name'] = this.form.value.name;
      data['email'] = this.form.value.email;
      data['mobileNumber'] = this.form.value.mobileNumber;
      data['password'] = this.form.value.password;
      this.sp.submitForm(data,url).subscribe(
        success=>{
          this.admin.showAlert('Sucess','Your account has been sucessfully added.')
        }
      );
    }

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
      return true;
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  }
}
