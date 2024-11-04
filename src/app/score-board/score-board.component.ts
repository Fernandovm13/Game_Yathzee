import { Component } from '@angular/core';
import { YahtzeeService } from '../yahtzee.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent {
  constructor(public yahtzeeService: YahtzeeService) {}

  scoreCategory(category: string) {
    this.yahtzeeService.scoreCategory(category);
  }
}
