import { Component } from '@angular/core';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective,  InputGroupTextDirective, ButtonDirective]
})
export class LoginComponent {

  constructor(public auth: AuthService) { }
  login(): void {
    // Call this to redirect the user to the login page
    this.auth.loginWithRedirect();
    console.log(this.auth);
  }
}
