import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Cards } from '../models/cards';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards!:Cards[];
  filteredCards!:Cards[]

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private Http:HttpClient) { }

  getCards():void{
   this.Http.get<Cards[]>(this.apiUrl+'/cards')
   .subscribe((res:Cards[])=>{
    this.cards = this.filteredCards = res
   })
  }

  addCard(card:Cards):Observable<any>{
    return this.Http.post(this.apiUrl + '/cards',card)
  }

  updateCard(card:Cards,cardId:number):Observable<any>{
    return this.Http.put(this.apiUrl + '/cards/'+ cardId,card)
  }

  deleteCard(cardId:number):Observable<any>{
    return this.Http.delete(this.apiUrl + '/cards/' + cardId)
  }
}
