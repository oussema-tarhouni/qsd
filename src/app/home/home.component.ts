import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { initHero } from './hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private stop?: () => void;
  ngAfterViewInit() { this.stop = initHero(); }
  ngOnDestroy() { this.stop?.(); }
}
