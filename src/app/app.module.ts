import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialog } from './alert/alert.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CarouselDialogComponent } from './carousel-dialog/carousel-dialog.component';
import { CarouselDisplayComponent } from './carousel-display/carousel-display.component';

import { MatChipsModule } from '@angular/material/chips';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AddAuthorizationPipe } from './add-authorization.pipe';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListUsersComponent,
    AlertDialog,
    ImageGalleryComponent,
    FileUploadComponent,
    CarouselDialogComponent,
    CarouselDisplayComponent,
    HomeComponent,
    ProductsComponent,
    AddAuthorizationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
