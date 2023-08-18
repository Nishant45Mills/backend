import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpService } from 'src/app/http.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  files = [];
  fileData: any;
  imgData: any;
  imgData1: any;
  data: any;
  productArray: any;
  productId: any;

  productForm = this.fb.group({

    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    new_images: ['']

  })

  constructor(private fb: FormBuilder, private http: HttpService, private tostr: HotToastService) {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {

    this.http.get('/products').subscribe({
      next: (data: any) => {

        console.log(data);
        this.productArray = data['product'];
        console.log(this.productArray);

      }
    })

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

        // console.log(data);
        this.getAllProducts();

      }
    })

    this.productForm.reset();


  }

  checkFile(event: any) {

    this.imgData = event.target.files;

  }

  takeImageInfo(event: any) {

    this.imgData1 = event.target.files;
  }

  getPictureInfo(dataId: any) {

    this.productId = dataId;

  }

  updateData(data: any) {

    delete this.productForm.value.name;
    delete this.productForm.value.description;
    delete this.productForm.value.price;

    let formdata = new FormData();
    formdata.append('new_images', this.imgData1[0]);

    this.http.patch(`/products/images/${this.productId}`, formdata).subscribe({
      next: (data) => {

        this.tostr.success('Updated image successfully')
        this.getAllProducts();

      }
    })

  }

  updateInfo(data: any) {

    delete this.productForm.value.new_images;

    console.log(data);

    this.http.patch(`/products/${this.productId}`, data).subscribe((data) => {

      this.tostr.success('Updated product info successfully');
      this.getAllProducts();

    })

  }

  deleteProduct() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert product!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.delete(`/products/${this.productId}`).subscribe({
          next: (data) => {

            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

            this.getAllProducts();
          }
        })
      }
    })
  }
}
