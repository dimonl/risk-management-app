import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../shared/services/login.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../shared/interfaces';

@Component({
  selector: 'app-form-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;

  constructor(private auth: LoginService,
              private router: Router,
              private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params.accessDenied) {
        console.log('accessDenied');
      }
    });
  }


  onSubmit() {
    const user: User = {
      id: '',
      name: this.form.value.name,
      password: this.form.value.password
    };

    // this.form.disable();
    this.subscription = this.auth.login(user).subscribe(
      next => {
        // console.log(localStorage.getItem('user'));
        this.router.navigate(['/mainpage']);

      },
      error => {
        console.log('error');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onRegister() {
    const user: User = {
      id: '',
      name: this.form.value.name,
      password: this.form.value.password
    };
    // console.log(user);
    this.auth.register(user).subscribe(
      next => {
        this.auth.setUser(next);
        localStorage.setItem('user', next.name);
        localStorage.setItem('id', next.id);
        this.router.navigate(['/mainpage']);
      }
    );
    //
    // if (elem) {
    //   this.router.navigate(['/mainpage']);
    // }
  }
}
