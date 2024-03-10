import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    RouterOutlet,
    MatProgressSpinnerModule,
    RouterLinkActive,
    RouterModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  exports:[SearchComponent]
})
export class ComponentsModule { }
