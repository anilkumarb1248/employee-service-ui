import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  
  private _teacherMessageSource = new Subject<string>();
  teacherMessage$ = this._teacherMessageSource.asObservable();

  private _studentMessageSource = new Subject<string>();
  studentMessage$ = this._studentMessageSource.asObservable();

  constructor() { }

  sendTeacherMessage(message:string){
    this._teacherMessageSource.next(message);
  }

  sendStudentMessage(message:string){
    this._studentMessageSource.next(message);
  }
}
