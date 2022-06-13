import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarouselDisplayComponent } from './carousel-display/carousel-display.component';
import { ContactComponent } from './contact/contact.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ImageAssignmentComponent } from './image-assignment/image-assignment.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { LoginComponent } from './login/login.component';
import { QualityAssuranceComponent } from './quality-assurance/quality-assurance.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'file-upload', component: FileUploadComponent },
  { path: 'products/:categoryname', component: ImageGalleryComponent },
  { path: 'product-description', component: CarouselDisplayComponent },
  { path: 'home', redirectTo: 'login' },
  { path: 'image-assignment', component: ImageAssignmentComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'quality-assurance', component: QualityAssuranceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
