import {Component, effect, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs} from 'keycloak-angular';
import Keycloak, {KeycloakProfile} from 'keycloak-js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular-v19-Keycloak';

  isAuthenticated = false;
  profile!: KeycloakProfile;

  constructor(private readonly keycloak: Keycloak) {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(() => {
      const keycloakEvent = keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.isAuthenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
        if (!this.isAuthenticated) {
          this.keycloak.login({

          }).then(() => console.log('redirected!'));
        }
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.isAuthenticated = false;
        this.keycloak.login({

        }).then(() => console.log('redirected!'));
      }
    });
  }

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(userProfile => this.profile = userProfile);
  }

}
