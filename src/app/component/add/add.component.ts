import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { PayrollService } from 'src/app/service/payroll.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  isUpdate: boolean = false;
  employee: Employee = new Employee();
  sliderValue: number=0;
  addEmployeeForm: FormGroup = new FormGroup({});

  departments: any = [
    { name: "HR",       value:"HR",       checked: false },
    { name: "Sales",    value:"Sales",    checked: false },
    { name: "Finance",  value:"Finance",  checked: false },
    { name: "Engineer", value:"Engineer", checked: false },
    { name: "Others",   value:"Others",   checked: false }
  ];

  constructor( 
              private matSnack: MatSnackBar, 
              private activatedRoute: ActivatedRoute, 
              private formBuilder: FormBuilder, 
              private httpService: PayrollService,
              private route: Router,
              private dataService: DataService) { 
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
    if(this.activatedRoute.snapshot.params.id != undefined) {
      this.isUpdate = true;
      this.dataService.currentEmployee.subscribe(employee => {
       if(Object.keys(employee).length !== 0) { 
          this.addEmployeeForm.patchValue({
            name:employee.name,
            profile:employee.profilePic,
            gender:employee.gender,
            salary:employee.salary,
            date:employee.startDate,
            notes:employee.note
          });
          const department: FormArray = this.addEmployeeForm.get('department') as FormArray;
          employee.department.forEach(departmentElements => {
            for ( let index = 0; index < this.departments.length; index++ ) {
              if(this.departments[index].name == departmentElements) {
                this.departments[index].checked = true;
                department.push(new FormControl(this.departments[index].value));
              }
            }
          })
          }
        });
      }
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
    if(this.isUpdate) {
      this.httpService.updateEmployeeData(this.activatedRoute.snapshot.params.id, this.employee).subscribe(response => {
        let message: any = "Employee Payroll Data Updated Successfull!!"
        this.matSnack.open(message,'',{
          duration:3000,
          verticalPosition: 'top',
          panelClass: ['green-snackbar']
      })
        console.log(response);
      });
    }else { 
      this.httpService.addEmployeeData(this.employee).subscribe(response => {
        this.matSnack.open(response.message.toString(),'',{
            duration:3000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar']
        })
        console.log(response);
      });
    }
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
