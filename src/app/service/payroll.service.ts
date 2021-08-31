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
   * Purpose: To get employee payroll list from the api.
   * @returns A list of employee details.
   */
   getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseUrl+ "/get");
  }
  /**
   * Purpose: Constructs a `POST` request that interprets the body as a
             JSON object and returns the response body as a JSON object.
   * @param employee An Employee Object as a Request body
   * @returns An `Observable` of the response, with the response body as a JSON object.
   */
  addEmployeeData(employee): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/create", employee);
  }
}
