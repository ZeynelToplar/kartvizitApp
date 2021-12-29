import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cards } from 'src/app/models/cards';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  CardForm!:FormGroup;
  showSpinner = false;

  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef:MatDialogRef<CardModalComponent>,
    private fb:FormBuilder,
    private cardService:CardService,
    private snackBarService:SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data:Cards
    ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.CardForm = this.fb.group({
      name:[this.data?.name || '',Validators.maxLength(50)],
      title:[this.data?.title || '',[Validators.required,Validators.maxLength(50)]],
      phone:[this.data?.phone || '',[Validators.required,Validators.maxLength(20)]],
      email:[this.data?.email || '',[Validators.email,Validators.maxLength(50)]],
      address:[this.data?.address || '',[Validators.maxLength(255)]]
    })
  }

  addCard(){
    this.showSpinner = true
    this.cardService.addCard(this.CardForm.value)
    .subscribe((res:any)=> {
     this.getSuccess(res || "Kartvizit Başarıyla Eklendi")
    },(err:any) => {
      this.getError(err.message || "Kartvizit eklenirken bir sorun oluştu")
    })
  }

  updateCard(){
    this.showSpinner = true
    this.cardService.updateCard(this.CardForm.value,this.data.id)
    .subscribe((res)=>{
     this.getSuccess(res || "Kartvizit Başarıyla Güncellendi")
    },(err:any) => {
      this.getError(err.message || "Kartvizit Güncellenirken bir sorun oluştu")
    })
  }

  deleteCard(){
    this.showSpinner = true
    this.cardService.deleteCard(this.data.id)
    .subscribe((res)=>{
      this.getSuccess(res || "Kartvizit Başarıyla Silindi")
    },(err:any) => {
      this.getError(err.message || "Kartvizit silme işleminde bir sorun oluştu")
    })
  }

  getSuccess(message:string){
    this.snackBarService.createSnackBar('success', message)
    this.cardService.getCards()
    this.showSpinner = false
    this.dialogRef.close()
  }

  getError(message:string){
    this.snackBarService.createSnackBar('error',message)
    this.cardService.getCards()
    this.showSpinner = false
    this.dialogRef.close()
  }
}
