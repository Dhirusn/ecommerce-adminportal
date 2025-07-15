import { Component, DestroyRef, Inject, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';

import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryModule } from '../app/modules/category/category.module';
import { AuthService } from '@auth0/auth0-angular';
import { LoginComponent } from './views/pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<!-- Show login when NOT authenticated -->
<div *ngIf="!(auth.isAuthenticated$ | async)">
  <app-login></app-login>
</div>

<!-- Show app content when authenticated -->
<div *ngIf="auth.isAuthenticated$ | async">
  <router-outlet></router-outlet>
</div>
`,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    CategoryModule,
    LoginComponent
  ]
})
export class AppComponent implements OnInit {
  title = 'CoreUI Angular Admin Template';

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);
  readonly auth = inject(AuthService)
  constructor() {
    this.#titleService.setTitle(this.title);
    // iconSet singleton
    this.#iconSetService.icons = { ...iconSubset };
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {

    this.#router.events.pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.#colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
