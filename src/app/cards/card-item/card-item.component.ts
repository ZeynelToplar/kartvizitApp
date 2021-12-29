import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cards } from 'src/app/models/cards';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() card!: Cards;

  constructor(
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  openUpdateCardModal(card:Cards){
    this.dialog.open(CardModalComponent, {
      width:'400px',
      data:card
    })
  }
}
