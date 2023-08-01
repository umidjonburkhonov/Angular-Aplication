import { Component, Inject, OnInit,  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {
  conditionalProduct: string[]=["New", "Second Hand", "B/Y" ]
  productForm!: FormGroup
  actionBtn: string = "Save"
constructor(
  private formBuilder: FormBuilder, 
  private api: ApiService, 
  private dialogRef: MatDialogRef <DialogComponent>,
  @Inject(MAT_DIALOG_DATA) public editDate: any 
  ){}

ngOnInit(): void {
  this.productForm = this.formBuilder.group({
    productName: ['', Validators.required],
    category: ['', Validators.required],
    condition: ['', Validators.required],
    price: ['', Validators.required],
    comment: ['', Validators.required],
    date: ['', Validators.required],
    
  })
  if(this.editDate){
    this.actionBtn = "Update"
    this.productForm.controls['productName'].setValue(this.editDate.productName),
    this.productForm.controls['category'].setValue(this.editDate.category),
    this.productForm.controls['condition'].setValue(this.editDate.condition),
    this.productForm.controls['price'].setValue(this.editDate.price),
    this.productForm.controls['comment'].setValue(this.editDate.comment),
    this.productForm.controls['date'].setValue(this.editDate.date)
    
  }
  
}


    addProduct(){
      if(!this.editDate){
        if (this.productForm.valid) {
          this.api.postProduct(this.productForm.value)
            .subscribe({
              next: ()=>{
                  alert("Product was added successfully")
                  this.productForm.reset()
                  this.dialogRef.close("save")
              },
              error: ()=> {
                  alert("Something went wrong while adding")
              }
            })
        }
      }else{
        this.updateProduct()
      }
       
    }
      
    updateProduct(){
      this.api.putProduct(this.productForm.value, this.editDate.id )
      .subscribe({
        next: (res) => {
          alert("Product updated successfully")
          this.productForm.reset()
          this.dialogRef.close("update")
      
          
          
        },
        error:() =>{
          alert("Something went wrong while updating")
        },
      })
      
    }
    

    
  

}
