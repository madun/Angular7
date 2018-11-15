import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface EmployeeInterface {
  status: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // status: number;
  constructor(private service : EmployeeService,private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm) {
    if(form != null)
    form.resetForm();
    this.service.formData = {
      id: null,
      fullname: '',
      position: '',
      empCode: '',
      mobile: ''
    }
  }

  onSubmit(form : NgForm){
    if(form.value.id == null)
    this.insertRecord(form)
    else
    this.updateRecord(form)
  }

  insertRecord(form : NgForm){
    this.service.postEmployee(form.value).subscribe( res => {
      if(res.status == 200){
        this.toastr.success('Data has been created', 'Success');
        this.resetForm(form)
        this.service.getEmployee()
      } else {
        this.toastr.error('Something Wrong!', 'Error');
      }
    })
  }

  updateRecord(form : NgForm){
    this.service.putEmployee(form.value).subscribe( res => {
      // console.log(res)
      if(res.status == 200){
        this.toastr.info('Data has been Updated', 'Success');
        this.resetForm(form)
        this.service.getEmployee()
      } else {
        this.toastr.error('Something Wrong!', 'Error');
      }
    })
  }

}
