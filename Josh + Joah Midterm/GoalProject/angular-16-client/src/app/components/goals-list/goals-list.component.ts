import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';
import { GoalService } from 'src/app/services/goal.service';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css'],
})
export class GoalsListComponent {
  goals?: Goal[];
  currentGoal: Goal = {};
  currentIndex = -1;
  title = '';

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.retrieveGoals();
  }

  retrieveGoals(): void {
    this.goalService.getAll().subscribe({
      next: (data) => {
        this.goals = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveGoals();
    this.currentGoal = {};
    this.currentIndex = -1;
  }

  setActiveGoal(goal: Goal, index: number): void {
    this.currentGoal = goal;
    this.currentIndex = index;
  }

  removeAllGoals(): void {
    this.goalService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchTitle(): void {
    this.currentGoal = {};
    this.currentIndex = -1;

    this.goalService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.goals = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
