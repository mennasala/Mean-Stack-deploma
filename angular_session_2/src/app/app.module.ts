import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ErrorComponent } from './pages/error/error.component';
import { IndexComponent } from './pages/index/index.component';
import { PostsComponent } from './pages/posts/posts.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { UsersComponent } from './pages/users/users.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BlogsComponent } from './component/blogs/blogs.component';
import { CardComponent } from './component/card/card.component';
import { Comp1Component } from './component/comp1/comp1.component';
import { ConvertPipe } from './pipes/convert.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    AddUserComponent,
    ContactComponent,
    EditUserComponent,
    ErrorComponent,
    IndexComponent,
    PostsComponent,
    SinglePostComponent,
    UsersComponent,
    NavbarComponent,
    BlogsComponent,
    CardComponent,
    Comp1Component,
    ConvertPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
