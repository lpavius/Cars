import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { CarsService } from '../services/cars.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any;

  constructor(private http: HttpClient,
              private router: Router,
              private carsService: CarsService) { }

  ngOnInit(): void {
    this.model = {};
    sessionStorage.setItem('token', '');
  }

  register() {
    this.carsService
      .register(this.model.username, this.model.password)
      .subscribe(
        () => {
          let base64hash = btoa(this.model.username + ':' + this.model.password);
          sessionStorage.setItem('token', base64hash);
          this.router.navigate(['']);
        },
        error => {
          if (error.status === 401) {
            alert("Authentication failed");
          }
        }
      );
  }
}
