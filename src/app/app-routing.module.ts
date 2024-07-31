import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChattingComponent } from './chatting/chatting.component';
import { ChattRoomComponent } from './chatt-room/chatt-room.component';

const routes: Routes = [
  { path: '', component: ChattRoomComponent },
  { path: 'chatt', component: ChattingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
