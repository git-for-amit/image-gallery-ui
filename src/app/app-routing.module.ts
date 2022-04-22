import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselDisplayComponent } from './carousel-display/carousel-display.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HomeComponent } from './home/home.component';
import { ImageAssignmentComponent } from './image-assignment/image-assignment.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'file-upload', component: FileUploadComponent },
  { path: 'products', component: ImageGalleryComponent },
  { path: 'product-description', component: CarouselDisplayComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'image-assignment', component: ImageAssignmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
