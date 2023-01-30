import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'oauth-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('googleSignInWrapper') googleSignInWrapperEl!: ElementRef;

  title = 'oauth-test';

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '446066326969-j7f36bhn6uccqg1rq05bsqj8savusbic.apps.googleusercontent.com',
      callback: (response) => {
        console.log(response);
      },
    });
  }

  ngAfterViewInit(): void {
    google.accounts.id.renderButton(this.googleSignInWrapperEl.nativeElement, {
      type: 'standard',
    });
  }
}
