import { ElementRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotifyType, Notification } from '../notification';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private notificationService: NotificationService
  ) { }

  createNotification(message:string, notifyType: NotifyType){
    this.notificationService.notify(new Notification(message, notifyType));
  }

  focusInvalidControl(form: FormGroup,controleName:string,elementRef: ElementRef){
    form.controls[controleName].setErrors({ 'incorrect': true });
    const invalidControl = elementRef.nativeElement.querySelector('[formcontrolname="'+ controleName +'"]');
    invalidControl.focus();
  }

  openConfirmationPopup(message:string, callback:any){
    callback(); // YES, NO

  }
}
