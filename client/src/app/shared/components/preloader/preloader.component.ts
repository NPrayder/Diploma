import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/preloader.json',
    loop: false,
  };

  @Output() animCompleted: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  a() {
    console.log(2);
  }
}
