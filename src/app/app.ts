import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Jobs } from './public/jobs/jobs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Jobs],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('smarthire.client');
}
