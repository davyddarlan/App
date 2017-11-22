import { Component } from '@angular/core';
import { NavController, NavParams , AlertController } from 'ionic-angular';

import { Itens } from '../../classes/itens/itens';
import { RessourcePage } from '../ressource/ressource';
import { Item } from '../../classes/item/item';
import { Transfer } from '../../classes/transfer/transfer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private title: string = 'App SUS';

  constructor(
    private itens: Itens, 
    private transfer: Transfer,
    private nav: NavController,
    private alert: AlertController
  ) {}

  openRessource(item: Item): void {
    if (item.getStatus() === 'ABRIR') {
      this.nav.push(RessourcePage, {
        id: item.getId(),
        title: item.getTitle()
      });
    }
  }

  download(item: Item): void {
    this.transfer.download(item);
  }

  cancel(item: Item): void {
    this.transfer.cancel(item);
  } 

  remove(item: Item): void {
    this.alert.create({
      title: 'Remover',
      message: `Você deseja remover o recurso educacional ${ item.getTitle() }?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.transfer.remove(item);
          }
        },
        {
          text: 'Não'
        }
      ]
    }).present();
  }
 }
