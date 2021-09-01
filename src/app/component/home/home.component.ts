import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { PayrollService } from 'src/app/service/payroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public employeeList: Employee[] = [];

  public empCount: number;

  constructor(private payrollService: PayrollService, private dataService: DataService, private route: Router) { }

  ngOnInit(): void {
    this.payrollService.getEmployeeData().subscribe((response) => {
      this.employeeList = response.data;
      console.log(this.employeeList);
      this.empCount = this.employeeList.length;
    });
  }

  /**
   * Purpose: To delete employee data from the database.
   * @param id The Id for the Employee to be delted.
   */
  remove(id: number) {
    this.payrollService.deleteEmployeeData(id).subscribe(data=> {
      console.log(data);
      this.ngOnInit();      
    });
  }
  /**
   * Purpose: To update Employee details from the database.
   * @param id The Id for the Employee to be updated.
   * @param employee Employee Object to be updated.
   */
  update(id: number, employee) {
    this.dataService.changeEmployee(employee);
    this.route.navigateByUrl('/update/'+id);
  }
}
