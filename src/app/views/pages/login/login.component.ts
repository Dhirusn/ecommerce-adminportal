import { Component } from '@angular/core';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';

import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthResponse, LoginDto } from '../../../models/auth.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule, FormsModule]
})
export class LoginComponent {
  model: LoginDto = { email: '', password: '' };

  constructor(public auth: AuthService) { }

  login(): void {
    this.auth.login(this.model).subscribe({
      next: (res: AuthResponse) => {
        console.log('Login success:', res);
        this.auth.saveTokens(res);
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }
}
