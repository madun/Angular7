import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { Employee } from '../../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,private toastr: ToastrService,) { }
  data: object;

  ngOnInit() {
    this.service.getEmployee()
  }

  populateForm(emp: Employee) {
    this.service.formData = Object.assign({},emp)
  }

  

  deleteRecord(id : number){
    if(confirm('Are you sure want to delete this?')){
      this.service.deleteEmployee(id).subscribe( res => {
        if(res.status == 200){
          this.toastr.warning('Data has been Deleted', 'Success');
          this.service.getEmployee()
        } else {
          this.toastr.error('Something Wrong!', 'Error');
        }
      })
    }
  }

}
