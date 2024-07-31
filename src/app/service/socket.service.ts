import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { AppServiceService } from './app-service.service';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  title = 'chattSocketUi';
  public newData = [];
  public group: any = {};
  public socket = socketIo.connect('http://localhost:3000');
  public receiveMessage: any;
  public sentMessages: any;
  public currentRoom: any;
  public chatting: any[] = [];
  public userList: any[] = [];
  public userInfo: any = {};
  public userlist: Subject<any> = new Subject();
  public chattList: Subject<any> = new Subject();
  public userDetails: Subject<any> = new Subject();

  constructor(public appService: AppServiceService) {
    this.socket.on('messages', (data) => {
      this.chattList.next(data);
    });
    this.socket.on('userList', (data) => {
      this.userlist.next(data);
    });
  }

  public getUserList(): Observable<any> {
    return this.userlist.asObservable();
  }

  public getchattList(): Observable<any> {
    return this.chattList.asObservable();
  }

  public getUserDetails(): Observable<any> {
    return this.userDetails.asObservable();
  }

  public Select() {
    this.appService.get(this.appService.url.api + '/socketapp', []).subscribe((result) => {
      console.log('value', result);
      this.newData = result;
    });
  }

  windowEvent() {
    const newWin = window.open('about:blank', 'hello', 'width=200,height=200');
    // newWin.close();
  }

  // Connect web socket
 public connectWebSocket() {
    this.socket.on('connection', (data) => {
      this.receiveMessage = data.message;
      console.log('socket connected !!!',  this.receiveMessage);
    });
  }

  // join_Room
  public joinRoom(input) {
    const data = {
      room : input.room,
      name: input.name
    };
    this.userInfo = data;
    this.socket.emit('join_Room', data);
  }

  public sentMessage(input) {
    this.socket.emit('sent_message', {message: input});
  }
}
