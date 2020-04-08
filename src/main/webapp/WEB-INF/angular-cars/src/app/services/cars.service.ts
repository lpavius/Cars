import {Injectable} from '@angular/core';
import {Car} from '../models/car';
import {Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  port: number = 8080;

  carObverver: Observer<Car>;

  carObversable: Observable<Car>

  constructor(private http: HttpClient) {
    this.carObversable = new Observable<Car>(observer => {
      this.carObverver = observer;
    });
  }

  // TODO add authorize header
  public insert(car: Car): Observable<any> {
    return this.http.post(`http://localhost:${this.port}/cars`, car);
  }

  // TODO add authorize header
  public delete(car: Car): Observable<any> {
    return this.http.delete(`http://localhost:${this.port}/cars/${car.id}`);
  }

  public findBrands(): Observable<any> {
    return this.http.get(`http://localhost:${this.port}/cars/brands/`);
  }

  public findCarsByBrand(brand: string): Observable<any> {
    return this.http.get(`http://localhost:${this.port}/cars/brands/${brand}`);
  }

}
