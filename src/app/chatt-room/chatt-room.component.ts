import { Component, OnInit, EventEmitter } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';
import { SocketService } from '../service/socket.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chatt-room',
  templateUrl: './chatt-room.component.html',
  styleUrls: ['./chatt-room.component.css']
})
export class ChattRoomComponent implements OnInit {

  title = 'chattSocketUi';
  public newData = [];
  public userName = new EventEmitter();
  public group: any = {};
  public receiveMessage: any;
  public sentMessages: any;
  public currentRoom: any;
  public chatting: any[] = [];

  constructor(public socketIo: SocketService, public rout: Router, private toastr: ToastrService) { }
  public ngOnInit() {
  }



  public joinRoom(input) {
    if (input && input.room && input.name) {
      this.socketIo.joinRoom({room : input.room, name: input.name});
      this.rout.navigate(['chatt']);
    } else {
      this.toastr.error('Error', 'Enter the valid group and username');
    }
  }

}
