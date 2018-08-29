import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatNativeDateModule,
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
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { environment } from '../environments/environment';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageStockComponent } from './admin/products/manage-stock/manage-stock.component';
import { ProductCategoryComponent } from './admin/products/product-category/product-category.component';
import { ProductFormComponent } from './admin/products/product-form/product-form.component';
import { ProductProfileComponent } from './admin/products/product-profile/product-profile.component';
import { ProductRegistryComponent } from './admin/products/product-registry/product-registry.component';
import { TransactionLogComponent } from './admin/products/transaction-log/transaction-log.component';
import { StaffFormComponent } from './admin/staffs/staff-form/staff-form.component';
import { StaffProfileComponent } from './admin/staffs/staff-profile/staff-profile.component';
import { StaffsRegistryComponent } from './admin/staffs/staffs-registry/staffs-registry.component';
import { PosCartComponent } from './admin/transactions/pos-cart/pos-cart.component';
import { PosComponent } from './admin/transactions/pos/pos.component';
import { StockOrdersComponent } from './admin/transactions/stock-orders/stock-orders.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NewLoginComponent } from './auth/new-login/new-login.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { HomePageComponent } from './general/home-page/home-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { CheckOutComponent } from './admin/transactions/check-out/check-out.component';
import { ShoppingCartComponent } from './admin/transactions/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './admin/transactions/order-success/order-success.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    GeneralLayoutComponent,
    AuthLayoutComponent,
    HomePageComponent,
    DashboardComponent,
    LoginComponent,
    ProductProfileComponent,
    StaffsRegistryComponent,
    StaffProfileComponent,
    StockOrdersComponent,
    ProductRegistryComponent,
    ProductFormComponent,
    DropZoneDirective,
    ProductCategoryComponent,
    TransactionLogComponent,
    ManageStockComponent,
    StaffFormComponent,
    PosComponent,
    PosCartComponent,
    LoadingSpinnerComponent,
    NewLoginComponent,
    CheckOutComponent,
    ShoppingCartComponent,
    OrderSuccessComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,

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
    MatNativeDateModule,
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
  entryComponents: [
    ProductCategoryComponent,
    PosCartComponent
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
