import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

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
   * Purpose: Calling a `POST` request that interprets the body as a
             JSON object and returns the response body as a JSON object.
   * @param employee An Employee Object as a Request body
   * @returns An `Observable` of the response, with the response body as a JSON object.
   */
  addEmployeeData(employee): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/create", employee);
  }
  /**
   * Purpose: Calling a `DELETE` request that interprets the body as a JSON object and
              returns the response body as a JSON object.
   * @param id The Id for the Employee to be deleted. 
   * @returns Return a message if deleted Successfully.
   */
  deleteEmployeeData(id: number): Observable<any>{
    return this.httpClient.delete(this.baseUrl+"/delete?id=" +id)
  }
  /**
   * Purpose: Calling a `PUT` request that interprets the body as a JSON object and returns the response
              body as a JSON object.
   * @param id The Id for the Employee to be updated.
   * @param employee An Employee Object as a request boy.
   * @returns A message for update Successfully along with updated data.
   */
  updateEmployeeData(id: number, employee: Employee) {
    return this.httpClient.put(`${this.baseUrl}/update/${id}`, employee);
  }
}
