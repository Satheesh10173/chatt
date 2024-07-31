import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: 'root'
})


export class AppServiceService {
  public url = {
    api: '/app-api',
  };
  constructor(public http: HttpClient) { }

  public get(qry: string, prm: string[]): Observable<any> {
    const heads = {
      // tslint:disable-next-line:quotemark
      "Cache-control": 'no-cache,no-store',
      Expires: '0',
      Pragma: 'no-cache',
    };
    const options = { headers: heads };
    const aQry = this.formatQuery(qry, prm);
    return this.http.get(aQry, options).catch((err) => Observable.throwError(err));
  }
  private formatQuery(qry: string, prm: string[]) {
    let theString = arguments[0];
    let separator = '?';
    if (arguments.length !== 2) {
      return theString;
    }

    const theParams = arguments[1];
    for (let i = 0; i < theParams.length; i++) {
      if (theParams[i] !== undefined && theParams[i] !== null) {
        // tslint:disable-next-line:quotemark
        const regEx = new RegExp("\\{" + i + "\\}", "gm");
        theString = theString.replace(regEx, theParams[i]);
      }
    }

    if (theString.includes('?')) {
      separator = '&';
    }
    return theString;
  }
}
