import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { StarWarsService } from '../star-wars.service'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [StarWarsService]
})
export class ItemComponent implements OnInit {
  @Input() character;
  @Output() sideAssigned = new EventEmitter<{name: string, side: string}>();
  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {
  }

  onAssign(side) {
    // this.character.side = side; // not good practice to do this way without the Output above. Use the tabs component to manage the sides.
    // this.sideAssigned.emit({name: this.character.name, side: side});

   this.swService.onSideChosen({name: this.character.name, side: side});
  }

}


