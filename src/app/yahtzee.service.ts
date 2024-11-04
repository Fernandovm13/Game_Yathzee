import { Injectable } from '@angular/core';

interface Category {
  name: string;
  score: number | null;
  scored: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class YahtzeeService {
  dice: number[] = [1, 1, 1, 1, 1]; // Inicializar los dados con valores
  heldDice: boolean[] = [false, false, false, false, false]; // Para rastrear si se mantienen los dados
  rollsLeft: number = 3; // Número de lanzamientos restantes
  categories: Category[] = [
    { name: 'Ones', score: null, scored: false },
    { name: 'Twos', score: null, scored: false },
    { name: 'Threes', score: null, scored: false },
    { name: 'Fours', score: null, scored: false },
    { name: 'Fives', score: null, scored: false },
    { name: 'Sixes', score: null, scored: false },
    { name: 'Three of a Kind', score: null, scored: false },
    { name: 'Four of a Kind', score: null, scored: false },
    { name: 'Full House', score: null, scored: false },
    { name: 'Small Straight', score: null, scored: false },
    { name: 'Large Straight', score: null, scored: false },
    { name: 'Yahtzee', score: null, scored: false },
    { name: 'Chance', score: null, scored: false },
  ];
  totalScore: number = 0;

  constructor() {}

  rollDice() {
    for (let i = 0; i < this.dice.length; i++) {
      if (!this.heldDice[i]) {
        this.dice[i] = this.getRandomDie();
      }
    }
  }

  getRandomDie(): number {
    return Math.floor(Math.random() * 6) + 1; 
  }

  toggleHold(index: number) {
    this.heldDice[index] = !this.heldDice[index]; 
  }

  resetGame() {
    this.dice = [1, 1, 1, 1, 1];
    this.heldDice = [false, false, false, false, false];
    this.rollsLeft = 3;
    this.totalScore = 0;
    this.resetCategories();
  }

  resetCategories() {
    this.categories.forEach(category => {
      category.score = null;
      category.scored = false;
    });
  }

  scoreCategory(categoryName: string) {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category && !category.scored) {
      category.score = this.calculateScore(categoryName);
      category.scored = true;
      this.updateTotalScore();
    }
  }

  calculateScore(categoryName: string): number {
    const counts = this.getDiceCounts();
    let score = 0;

    switch (categoryName) {
      case 'Ones':
        score = counts[1];
        break;
      case 'Twos':
        score = counts[2] * 2;
        break;
      case 'Threes':
        score = counts[3] * 3;
        break;
      case 'Fours':
        score = counts[4] * 4;
        break;
      case 'Fives':
        score = counts[5] * 5;
        break;
      case 'Sixes':
        score = counts[6] * 6;
        break;
      case 'Three of a Kind':
        score = this.getThreeOfAKindScore(counts);
        break;
      case 'Four of a Kind':
        score = this.getFourOfAKindScore(counts);
        break;
      case 'Full House':
        score = this.getFullHouseScore(counts);
        break;
      case 'Small Straight':
        score = this.getSmallStraightScore();
        break;
      case 'Large Straight':
        score = this.getLargeStraightScore();
        break;
      case 'Yahtzee':
        score = this.getYahtzeeScore(counts);
        break;
      case 'Chance':
        score = this.dice.reduce((sum, die) => sum + die, 0);
        break;
    }
    return score;
  }

  getDiceCounts(): number[] {
    const counts = new Array(7).fill(0); 
    this.dice.forEach(die => counts[die]++);
    return counts;
  }

  getThreeOfAKindScore(counts: number[]): number {
    return counts.some(count => count >= 3) ? this.dice.reduce((sum, die) => sum + die, 0) : 0;
  }

  getFourOfAKindScore(counts: number[]): number {
    return counts.some(count => count >= 4) ? this.dice.reduce((sum, die) => sum + die, 0) : 0;
  }

  getFullHouseScore(counts: number[]): number {
    return counts.includes(3) && counts.includes(2) ? 25 : 0;
  }

  getSmallStraightScore(): number {
    const straights = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]];
    return straights.some(straight => straight.every(num => this.dice.includes(num))) ? 30 : 0;
  }

  getLargeStraightScore(): number {
    const straights = [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]];
    return straights.some(straight => straight.every(num => this.dice.includes(num))) ? 40 : 0;
  }

  getYahtzeeScore(counts: number[]): number {
    return counts.some(count => count === 5) ? 50 : 0;
  }

  updateTotalScore() {
    this.totalScore = this.categories.reduce((sum, category) => sum + (category.score || 0), 0);
  }
}
