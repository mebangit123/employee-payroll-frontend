import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private baseUrl: string = "http://localhost:8080/employeepayrollservice";

  constructor( private httpClient: HttpClient){ }
  
  /** 
   * @returns {EmployeePayroll List} a list of employee details.
   */
   getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseUrl+ "/get");
  }
}
