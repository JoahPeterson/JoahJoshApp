import { Component, Input, OnInit } from '@angular/core';
import { GoalService } from 'src/app/services/goal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css'],
})
export class GoalDetailsComponent {
  @Input() viewMode = false;

  @Input() currentGoal: Goal = {
    title: '',
    description: '',
    completed: false
  };

  message = '';

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getGoal(this.route.snapshot.params['id']);
    }
  }

  getGoal(id: string): void {
    this.goalService.get(id).subscribe({
      next: (data) => {
        this.currentGoal = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentGoal.title,
      description: this.currentGoal.description,
      completed: status
    };

    this.message = '';

    this.goalService.update(this.currentGoal.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentGoal.completed = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updateGoal(): void {
    this.message = '';

    this.goalService
      .update(this.currentGoal.id, this.currentGoal)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This goal was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteGoal(): void {
    this.goalService.delete(this.currentGoal.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/goals']);
      },
      error: (e) => console.error(e)
    });
  }
}
