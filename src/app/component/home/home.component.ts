import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { PayrollService } from 'src/app/service/payroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public employeeList: Employee[] = [];

  public empCount: number;

  constructor(private payrollService: PayrollService) { }

  ngOnInit(): void {
    this.payrollService.getEmployeeData().subscribe((response) => {
      this.employeeList = response.data;
      console.log(this.employeeList);
      this.empCount = this.employeeList.length;
    });
  }
  remove(id: number) {
    console.log("delete Employee");
  }
  update(id: number, employee: any) {
    console.log("update Employee");   
  }
}
