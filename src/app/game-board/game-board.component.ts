import { Component } from '@angular/core';
import { YahtzeeService } from '../yahtzee.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  rollsLeft = 3;

  constructor(public yahtzeeService: YahtzeeService) {}

  rollDice() {
    if (this.rollsLeft > 0) {
      this.yahtzeeService.rollDice();
      this.rollsLeft--;
    }
  }

  resetGame() {
    this.rollsLeft = 3;
    this.yahtzeeService.resetGame();
  }
}
