import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  userName: string = localStorage.getItem('user');

  constructor(private auth: LoginService,
              private router: Router) {
}

ngOnInit(): void {

    }

logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
}

}
