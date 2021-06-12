import { Component, OnInit } from '@angular/core';
import { Message, MessageType } from '../models/message';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  message: string;
  messageList: Message[] = [];

  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.interactionService.studentMessage$.subscribe(
      message => {
        console.log("Message Recieved: "+ message);
        let newMessage = new Message();
        // newMessage.type = MessageType.IN;
        newMessage.type = 'IN';
        newMessage.message = message;
        newMessage.time = new Date();
        this.messageList.push(newMessage);
      }
    );
  }

  send() {
    if (this.message) {
      let newMessage = new Message();
      // newMessage.type = MessageType.OUT;
      newMessage.type = 'OUT';
      newMessage.message = this.message;
      newMessage.time = new Date();
      this.messageList.push(newMessage);
      this.interactionService.sendTeacherMessage(this.message);
      this.message = "";
    }
  }

}
