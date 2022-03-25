import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/shared/models/Exercise.model';
import { ExercisesService } from 'src/app/shared/services/exercises.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.sass'],
})
export class ExercisesComponent implements OnInit {
  exercises: Exercise[] | undefined;
  sortByAscendingName: boolean;
  sortByAscendingMuscularGroup: boolean;
  alertIsShown: boolean;

  constructor(private exercisesService: ExercisesService) {
    this.exercisesService.getExercises().subscribe((response: Exercise[]) => {
      this.exercises = response;
    });
    this.sortByAscendingName = true;
    this.sortByAscendingMuscularGroup = true;
    this.alertIsShown = false;
  }

  ngOnInit(): void {
    if (window.sessionStorage.getItem('success') == 'exercise')
      this.alertIsShown = true;
    window.setTimeout(() => {
      this.alertIsShown = false;
    }, 3000);
    window.sessionStorage.removeItem("success");
  }

  sortByName() {
    if (this.sortByAscendingName) {
      this.sortExercisesByDescendingName(this.exercises);
      this.sortByAscendingName = false;
    } else {
      this.sortExercisesByAscendingName(this.exercises);
      this.sortByAscendingName = true;
    }
  }

  sortByMuscularGroup() {
    if (this.sortByAscendingMuscularGroup) {
      this.sortMuscularGroupByDescendingName(this.exercises);
      this.sortByAscendingMuscularGroup = false;
    } else {
      this.sortMuscularGroupByAscendingName(this.exercises);
      this.sortByAscendingMuscularGroup = true;
    }
  }

  sortExercisesByAscendingName(exercises: Exercise[] | undefined) {
    exercises?.sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  sortExercisesByDescendingName(exercises: Exercise[] | undefined) {
    exercises?.sort((a, b) => (a.name > b.name ? -1 : 1));
  }

  sortMuscularGroupByAscendingName(exercises: Exercise[] | undefined) {
    exercises?.sort((a, b) => (a.muscularGroup.name < b.muscularGroup.name ? -1 : 1));
  }

  sortMuscularGroupByDescendingName(exercises: Exercise[] | undefined) {
    exercises?.sort((a, b) => (a.muscularGroup.name > b.muscularGroup.name ? -1 : 1));
  }
}