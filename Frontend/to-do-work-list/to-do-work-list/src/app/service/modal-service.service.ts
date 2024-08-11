import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Injectable({
  providedIn: 'root',
  
})
export class ModalServiceService {

  constructor(private http:HttpClient) { }

   subject = new BehaviorSubject('');

  getAllTasks():Observable <any>{
    return this.http.get("http://localhost:3000/api/tasks")
  }

  addtask(tasks:any):Observable<any>{

    return this.http.post("http://localhost:3000/api/tasks",tasks);
  }
  editeTask(id:any,task:any):Observable<any>{
    return this.http.put(`http://localhost:3000/api/tasks/`+`${id}`,task);

  }

  deleteTask(id:number):Observable<any>{

    
    return this.http.delete(`http://localhost:3000/api/tasks/`+`${id}`);
  }

  open(id: string) {
    const modal = document.getElementById(id);
    if (modal) {
      (modal as any).style.display = 'block';
      (modal as any).classList.add('show');
    }
  }

  close(id: string) {
    const modal = document.getElementById(id);
    if (modal) {
      (modal as any).style.display = 'none';
      (modal as any).classList.remove('show');
    }
  }
}
