import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {


  
  // private _teacherMessageSource = new Subject<string>();
  // teacherMessage$ = this._teacherMessageSource.asObservable();

  // private _studentMessageSource = new Subject<string>();
  // studentMessage$ = this._studentMessageSource.asObservable();

  private teacherMessageSource:Subject<string>;
  teacherMessage$:Observable<string>;

  private studentMessageSource:Subject<string>;
  studentMessage$:Observable<string>;
  
  constructor() {
    this.teacherMessageSource = new Subject<string>();
    this.teacherMessage$ = this.teacherMessageSource.asObservable();

    this.studentMessageSource = new Subject<string>();
    this.studentMessage$ = this.studentMessageSource.asObservable();

  }

  sendTeacherMessage(message:string){
    this.teacherMessageSource.next(message);
  }

  sendStudentMessage(message:string){
    this.studentMessageSource.next(message);
  }
}
