import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'
import { Employee } from './employee'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})

export class AppComponent implements OnInit {
  
  condition: boolean = true;
  employees: Employee[];
  employee: Employee;
  createdEmployee: Employee = new Employee();
  constructor(private dataService: DataService) { }

  

  ngOnInit() {
    this.loadEmployees();  
  }

  loadEmployees() {
    this.dataService.getEmployees().subscribe((data: Employee[]) => { this.employees = data, this.employee = this.employees[0]});
  }
  choose(ind: number): void {
    for (let i = 0; i < this.employees.length; i++) {
      if (ind == i) {
        this.employee = this.employees[i];
        this.condition = true;
        return;
      }
    }
  }

  save() {
    if (this.createdEmployee.id == null) {
      this.dataService.createEmployee(this.createdEmployee)
        .subscribe((data: Employee) => this.employees.push(data));
      this.cancelNewEmployee();
    } else {
      this.dataService.updateEmployee(this.employee)
        .subscribe(data => this.loadEmployees());
      this.cancelEditEmployee();
    }
    
  }

  newEmployee() {
    let viewNewEmployee = document.getElementById('container-new-employee');
    viewNewEmployee.style.display = 'block';
    let container = document.getElementById('container');

    container.style['filter'] = 'blur(5px)';
    container.style.pointerEvents = 'none';
  }

  cancelNewEmployee() {
    let viewNewEmployee = document.getElementById('container-new-employee');
    viewNewEmployee.style.display = 'none';

    let container = document.getElementById('container');
    container.style['filter'] = 'blur(0px)';
    container.style.pointerEvents = 'auto';
    this.createdEmployee = new Employee();
  }

  editEmployee() {
    let viewEditEmployee = document.getElementById('container-update-employee');
    viewEditEmployee.style.display = 'block';
    let container = document.getElementById('container');

    container.style['filter'] = 'blur(5px)';
    container.style.pointerEvents = 'none';
    this.createdEmployee = this.employee;
  }
  cancelEditEmployee() {
    let viewEditEmployee = document.getElementById('container-update-employee');
    viewEditEmployee.style.display = 'none';

    let container = document.getElementById('container');
    container.style['filter'] = 'blur(0px)';
    container.style.pointerEvents = 'auto';
    this.createdEmployee = new Employee();
  }
  
  delete() {
    let conf = confirm("Are you sure, you want to delete selected employee?")
    if (conf) {
      this.dataService.deleteEmployee(this.employee.id)
        .subscribe(data => this.loadEmployees());
    }
  }
 
}
