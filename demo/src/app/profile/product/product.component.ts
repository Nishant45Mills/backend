import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  files = [];
  fileData: any;
  imgData: any;
  data: any;

  productForm = this.fb.group({

    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required]

  })

  constructor(private fb: FormBuilder, private http: HttpService) {

  }

  sendProduct() {

    this.data = this.productForm.value;

    const formObject = new FormData();

    for (var i = 0; i < this.imgData?.length; i++) {
      formObject.append('images', this.imgData[i]);
    }

    formObject.append('name', this.data.name);
    formObject.append('description', this.data.description);
    formObject.append('price', this.data.price);

    this.http.post('/products', formObject).subscribe({
      next: (data) => {

        console.log(data);

      }
    })

    this.productForm.reset();


  }

  checkFile(event: any) {

    console.log(event.target.files);
    // this.fileData = event.target.files;
    this.imgData = event.target.files;

    // console.log(this.fileData);

    // event.target.files

  }

}
