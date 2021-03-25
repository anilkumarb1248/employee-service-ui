import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private toastrService: ToastrService) { }

  showSuccess(message: string) {
    this.toastrService.success(message, "Success");
  }

  showInfo(message: string) {
    this.toastrService.info(message, "Information");
  }

  showError(message: string) {
    this.toastrService.error(message, "Error");
  }

  showWarning(message: string) {
    this.toastrService.warning(message, 'Warning', {
      timeOut: 3000
    });// We can add timout specific to message
  }
}
