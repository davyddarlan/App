import { Component } from '@angular/core';
import { NavController, NavParams , AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { File } from '@ionic-native/file';

import { Itens } from '../../classes/itens/itens';
import { Extra } from '../../classes/extra/extra';

import { RessourcePage } from '../ressource/ressource';
import { Persistence } from '../../classes/persistence/persistence';
import { Item } from '../../classes/item/item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private title: string = 'App SUS';

  constructor(private itens: Itens, private nav: NavController) {}

  openRessource(item: Item): void {
    this.nav.push(RessourcePage, {
      id: item.getId()
    });
  }
}
