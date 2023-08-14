import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { DataInterceptor } from './data.interceptor';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  declarations: [
    AppComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    NgxCaptchaModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: DataInterceptor,
    multi: true,
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
