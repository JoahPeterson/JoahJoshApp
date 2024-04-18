import { Component } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';
import { GoalService } from 'src/app/services/goal.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css'],
})
export class AddGoalComponent {
  goal: Goal = {
    title: '',
    description: '',
    completed: false
  };
  submitted = false;

  constructor(private goalService: GoalService) {}

  saveGoal(): void {
    const data = {
      title: this.goal.title,
      description: this.goal.description
    };

    this.goalService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newGoal(): void {
    this.submitted = false;
    this.goal = {
      title: '',
      description: '',
      completed: false
    };
  }
}
