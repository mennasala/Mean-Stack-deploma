import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateLoginGuard } from './guards/can-activate-login.guard';
import { CanActivateGuard } from './guards/can-activate.guard';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RegisterComponent } from './pages/register/register.component';
import { SingleProjectComponent } from './pages/single-project/single-project.component';
import { UpdatProfileComponent } from './pages/updat-profile/updat-profile.component';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  // { path: '', component: ProjectsComponent },
  {
    path: 'projects',
    children: [
      { path: '', component: ProjectsComponent },
      { path: 'add', component: AddProjectComponent },
      { path: ':id', component: SingleProjectComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [CanActivateGuard] },
  { path: 'upload', component: UploadImageComponent },
  {
    path: 'my-profile',
    component: UserProfileComponent,
    canActivate: [CanActivateLoginGuard],
  },
  {
    path: 'update-profile',
    component: UpdatProfileComponent,
    canActivate: [CanActivateLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
