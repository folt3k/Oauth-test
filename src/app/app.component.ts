import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import jwtDecode from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oauth-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('googleSignInWrapper')
  googleSignInWrapperEl!: ElementRef<HTMLElement>;

  userInfo: { firstName: string; lastName: string; email: string } | null =
    null;
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.initGoogleSignIn();
  }

  ngAfterViewInit(): void {
    this.renderGoogleSignInBtn();
    googleSignIn.render(this.googleSignInWrapperEl.nativeElement);
  }

  private renderGoogleSignInBtn(): void {
    google.accounts.id.renderButton(this.googleSignInWrapperEl.nativeElement, {
      type: 'standard',
    });
  }

  private initGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id:
        '446066326969-j7f36bhn6uccqg1rq05bsqj8savusbic.apps.googleusercontent.com',
      callback: (response) => {
        const {
          given_name: firstName,
          family_name: lastName,
          email,
        } = jwtDecode<any>(response.credential);
        this.userInfo = { firstName, lastName, email };
        this.cdr.detectChanges();
      },
    });
    google.accounts.id.prompt();
  }
}
