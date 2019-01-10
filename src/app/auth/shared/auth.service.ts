import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem('decodedToken')) || new DecodedToken();
  }

  private decodedToken;
  private expToken: boolean;

  private saveToken(token: any) {
    // const decodedToken = jwt.decodeToken(token);
    // const expirationDate = jwt.getTokenExpirationDate(token);
    // const isExpired = jwt.isTokenExpired(token);
    // this.expToken = isExpired;
    // console.log(decodedToken);
    // console.log(expirationDate);
    // console.log(isExpired);
    // console.log(this.expToken);
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('decodedToken', JSON.stringify(this.decodedToken));
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
    // return this.expToken;
  }

  public registerUser(userData: any): Observable<any> {
    return this.http.post('/api/user/register', userData);
  }
  public loginUser(userData: any): Observable<any> {
    return this.http.post('/api/user/login', userData).pipe(
      map((tokenData: any) => {
        this.saveToken(tokenData.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('decodedToken');
    this.decodedToken = new DecodedToken();
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUserId(): string {
    return this.decodedToken.userId;
  }
}
