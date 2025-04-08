import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../services/vacancy.service';
import { Vacancy } from '../interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-vacancies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-vacancies.component.html',
})
export class TopVacanciesComponent implements OnInit {
  vacancies: Vacancy[] = [];

  constructor(private vacancyService: VacancyService) {}

  ngOnInit(): void {
    this.vacancyService.getTopTenVacancies().subscribe((vacancies) => {
      this.vacancies = vacancies;
    });
  }
}
