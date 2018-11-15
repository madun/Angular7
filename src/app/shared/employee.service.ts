import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  formData: Employee;
  listData: Employee[];
  readonly rootUrl  = "http://172.17.30.106:8000";
  constructor(private http: HttpClient) { }

  getEmployee(){
    return this.http.get(this.rootUrl+"/employees").toPromise().then(res => this.listData = res as  Employee[])
  }

  postEmployee(formData: Employee){
    return this.http.post(this.rootUrl+"/employees", formData)
  }

  putEmployee(formData: Employee){
    return this.http.put(this.rootUrl+"/employees/"+formData.id, formData)
  }

  deleteEmployee(id: number){
    return this.http.delete(this.rootUrl+"/employees/"+id)
  }
}
