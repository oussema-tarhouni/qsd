import { Component, AfterViewInit, HostListener, NgZone, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { initShell } from './shell';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  private zone = inject(NgZone);

  // Auth + pricing panels
  loginOpen = signal(false);
  pricingOpen = signal(false);
  authView = signal<'signin' | 'register'>('signin');
  showPwdIn = signal(false);
  showPwdReg = signal(false);

  ngAfterViewInit() {
    initShell();

    // Keep any code in shell.ts that calls these globals working with the Angular state.
    const w = window as any;
    const inZone = (fn: () => void) => () => this.zone.run(fn);
    w.openPageLogin = inZone(() => this.openLogin());
    w.closePageLogin = inZone(() => this.closeLogin());
    w.showSignIn = inZone(() => this.showSignIn());
    w.showRegister = inZone(() => this.showRegister());
  }

  openLogin(view: 'signin' | 'register' = 'signin') {
    this.pricingOpen.set(false);
    this.authView.set(view);
    this.loginOpen.set(true);
  }

  closeLogin() {
    this.loginOpen.set(false);
    this.showPwdIn.set(false);
    this.showPwdReg.set(false);
  }

  showSignIn() { this.authView.set('signin'); }
  showRegister() { this.authView.set('register'); }

  openPricing() {
    this.loginOpen.set(false);
    this.pricingOpen.set(true);
  }

  closePricing() { this.pricingOpen.set(false); }

  /** Close a panel only when the dark backdrop itself is clicked. */
  onBackdrop(e: Event, which: 'login' | 'pricing') {
    if (e.target !== e.currentTarget) return;
    which === 'login' ? this.closeLogin() : this.closePricing();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeLogin();
    this.closePricing();
  }

  loginWith(provider: string) {
    (window as any).loginWith?.(provider);
    this.closeLogin();
  }

  closeMenu() { (window as any).closeMenu?.(); }
}
