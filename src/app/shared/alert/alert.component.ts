import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  
  @Input() message: string;
  @Output() event = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.event.emit(null);
  }

}
