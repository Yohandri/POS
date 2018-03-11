import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(
    public httpClient: HttpClient
  ) { }

  public get(path) {
		return this.httpClient
		    .get('' + path,{headers: new HttpHeaders().append("content-type","Application/json")})
		    .toPromise()
		    .then(res => res)
		    .catch(this.handleError);
	}

  public post(path,form){
		let json = form;
		return this.httpClient
		    .post('' + path, json, {headers: new HttpHeaders()})
		    .toPromise()
		    .then(res => res)
		    .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error);
	  return Promise.reject(error.message || error);
	}

}
