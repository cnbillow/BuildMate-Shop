import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AddProductsComponent } from './admin/products/add-products/add-products.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductProfileComponent } from './admin/products/product-profile/product-profile.component';
import { AddStockComponent } from './admin/products/add-stock/add-stock.component';
import { ProductRegistryComponent } from './admin/products/product-registry/product-registry.component';
import { AddStaffsComponent } from './admin/staffs/add-staffs/add-staffs.component';
import { StaffProfileComponent } from './admin/staffs/staff-profile/staff-profile.component';
import { StaffsRegistryComponent } from './admin/staffs/staffs-registry/staffs-registry.component';
import { StockOrdersComponent } from './admin/transactions/stock-orders/stock-orders.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomePageComponent } from './general/home-page/home-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    GeneralLayoutComponent,
    AuthLayoutComponent,
    HomePageComponent,
    DashboardComponent,
    LoginComponent,
    AddProductsComponent,
    ProductProfileComponent,
    AddStaffsComponent,
    StaffsRegistryComponent,
    StaffProfileComponent,
    AddStockComponent,
    StockOrdersComponent,
    ProductRegistryComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    AppRoutingModule,
    BrowserAnimationsModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
