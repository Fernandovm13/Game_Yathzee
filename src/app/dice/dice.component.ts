import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent {
  @Input() dice: number[] = [];
  @Input() heldDice: boolean[] = [];

  toggleHold(index: number) {
    this.heldDice[index] = !this.heldDice[index];
  }
}
