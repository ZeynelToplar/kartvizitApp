import { Component, OnInit } from '@angular/core';
import { Cards } from 'src/app/models/cards';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent {

  constructor(private cardService:CardService) { }

  search(searhText:string){
    searhText = searhText.toLowerCase()
    this.cardService.filteredCards = this.cardService.cards.filter((card:Cards)=>{
      return card.title.toLowerCase().indexOf(searhText)>-1 || (card.name && card.name.toLowerCase().indexOf(searhText)>-1)
    })
  }
}
