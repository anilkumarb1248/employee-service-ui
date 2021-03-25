import { Injectable } from '@angular/core';
import { Notification, NotifyType } from '../notification';
import { ToastrNotificationService } from './toastr-notification.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifyService: ToastrNotificationService) { }

  notify(notification: Notification) {
    console.log(JSON.stringify(notification));
    if (notification.type == NotifyType.SUCCESS) {
      this.notifyService.showInfo(notification.message);
    } else if (notification.type == NotifyType.INFO) {
      this.notifyService.showInfo(notification.message);
    } else if (notification.type == NotifyType.ERROR) {
      this.notifyService.showError(notification.message);
    } else if (notification.type == NotifyType.WARNING) {
      this.notifyService.showWarning(notification.message);
    }
  }
}
