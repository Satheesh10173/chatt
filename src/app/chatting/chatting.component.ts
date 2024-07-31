import { Component, OnInit } from '@angular/core';
import { SocketService } from '../service/socket.service';
import * as socketIo from 'socket.io-client';
import * as jQuery from 'jquery';
@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {
  public socket = socketIo.connect('http://localhost:3000');
  title = 'chattSocketUi';
  public newData = [];
  public group: any = {};
  public receiveMessage: any;
  public sentMessages: any;
  public currentRoom: any;
  public chatting: any[] = [];
  public userList: any[] = [];
  public value: any;
  public userDetails: any = {};

  constructor(public socketIO: SocketService) { }

  public ngOnInit() {
    this.userDetails = this.socketIO.userInfo;
    console.log(this.userDetails, 'userdetails');
    this.socketIO.getchattList().subscribe((data) => {
      this.chatting.push(data);
    });
    this.socketIO.getUserList().subscribe((data) => {
      this.userList = data;
    });
    // this.socketIO.getUserDetails().subscribe((data) => {
    //   this.userDetails = data;
    //   console.log(this.userDetails, 'userdetails');
    // });
  }


  sentMessage(input) {
    // const messages = jQuery('#messageId')[0];
    if (input) {
      this.socketIO.sentMessage(input);
      this.value = '';
    }
    // const objDiv = document.getElementById('messageId');
    // messages.scrollTop = messages.scrollHeight;
    // messages.scrollTop(messages.scrollHeight);
  }
  onclick() {
    const element: any = document.getElementsByClassName('message-card').length;
    if (element > 2) {
        const g = document.getElementsByClassName('message-card')[(element) - 1];
        g.scrollIntoView();
    }
  }
}
