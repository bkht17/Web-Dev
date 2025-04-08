import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../services/vacancy.service';
import { CompanyService } from '../services/company.service';
import { Vacancy, Company } from '../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vacancy-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vacancy-form.component.html',
})
export class VacancyFormComponent implements OnInit {
  vacancy: Partial<Vacancy> = {
    name: '',
    description: '',
    salary: 0,
    company: 0,
  };
  companies: Company[] = [];
  isEdit = false;

  constructor(
    private vacancyService: VacancyService,
    private companyService: CompanyService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.vacancyService.getVacancy(+id).subscribe((vacancy) => {
        this.vacancy = vacancy;
      });
    } else {
      const companyId = this.route.snapshot.paramMap.get('companyId');
      if (companyId) {
        this.vacancy.company = +companyId;
      }
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.vacancyService
        .updateVacancy(this.vacancy.id!, this.vacancy as Vacancy)
        .subscribe(() => {
          this.router.navigate([
            '/companies',
            this.vacancy.company,
            'vacancies',
          ]);
        });
    } else {
      this.vacancyService
        .createVacancy(this.vacancy as Omit<Vacancy, 'id'>)
        .subscribe(() => {
          this.router.navigate([
            '/companies',
            this.vacancy.company,
            'vacancies',
          ]);
        });
    }
  }
}
