import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../shared/services/login.service';
import {Observable, Subscription, timer} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../shared/interfaces';
import {STORAGE_SAVED_TYPES} from '../../shared/const';

@Component({
  selector: 'app-form-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private subscription: Subscription;
  public wrongPassword: boolean;
  private wrongPasswordTimer: Observable<number> = timer(2000);

  constructor(private auth: LoginService,
              private router: Router,
              private route: ActivatedRoute) {
    this.wrongPassword = false;
  }


  public ngOnInit(): void {
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


  public onSubmit() {
    const user: User = {
      id: '',
      name: this.form.value.name,
      password: this.form.value.password
    };

    this.subscription = this.auth.login(user).subscribe(
      next => {
        this.router.navigate(['/mainpage']);

      },
      error => {
        this.wrongPassword = true;
      }
    );
    this.wrongPasswordTimer.subscribe(() => (this.wrongPassword = false));
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onRegister() {
    const user: User = {
      id: '',
      name: this.form.value.name,
      password: this.form.value.password
    };
    this.auth.register(user).subscribe(
      next => {
        this.auth.setUser(next);
        localStorage.setItem(STORAGE_SAVED_TYPES.name, next.name);
        localStorage.setItem(STORAGE_SAVED_TYPES.id, next.id);
        this.router.navigate(['/mainpage']);
      }
    );
  }
}
