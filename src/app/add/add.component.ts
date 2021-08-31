import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee';
import { PayrollService } from '../service/payroll.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  employee: Employee = new Employee();
  sliderValue: number=0;
  addEmployeeForm: FormGroup = new FormGroup({});

  departments: any = [
    { name: "HR", value:"HR", checked: false },
    { name: "Sales", value:"Sales", checked: false },
    { name: "Finamce", value:"Finance", checked: false },
    { name: "Engineer", value:"Engineer", checked: false },
    { name: "Others", value:"Others", checked: false }
  ];

  constructor( 
              private activatedRoute: ActivatedRoute, 
              private formBuilder: FormBuilder, 
              private httpService: PayrollService,
              private route: Router) { 
    this.addEmployeeForm = this.formBuilder.group({
      name: new FormControl(''),
      salary: new FormControl(''),
      profile: new FormControl(''),
      gender: new FormControl(''),
      department: this.formBuilder.array([]),
      date: new FormControl(''),
      notes: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.sliderValue=50000;
  }
  /**
   * Purpose: To add Employee Payroll details to the database.
   */
  addEmployee() {
    this.employee.name=this.addEmployeeForm.get('name').value;
    this.employee.salary=this.addEmployeeForm.get('salary').value;
    this.employee.profilePic=this.addEmployeeForm.get('profile').value;
    this.employee.gender=this.addEmployeeForm.get('gender').value;
    this.employee.department=this.addEmployeeForm.get('department').value;
    this.employee.startDate=this.addEmployeeForm.get('date').value;
    this.employee.note=this.addEmployeeForm.get('notes').value;
    this.httpService.addEmployeeData(this.employee).subscribe(resp => {
      console.log(resp);
    });
    this.route.navigateByUrl('/home');
  }
  /** 
   * Purpose: To set salary value.
  */
  updateSetting(event) {
    this.sliderValue = event.value;
  }
  /**
  * @title Slider with custom thumb label formatting.
  */
  formatLabel(value: number) {
    if (value >= 1000) {
    return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  /**
  * Purpose: To get an array of checkbox value.
  * @param e The checkox event
  */
  onCheckboxChange(event) {
    let department: FormArray = this.addEmployeeForm.get('department') as FormArray;
    if (event.target.checked) {
      department.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      department.controls.forEach((item: FormControl) => {
        if (item.value == event.target.value) {
          department.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
