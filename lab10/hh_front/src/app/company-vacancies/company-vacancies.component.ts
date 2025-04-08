import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../services/vacancy.service';
import { CompanyService } from '../services/company.service';
import { Vacancy, Company } from '../interfaces';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-vacancies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-vacancies.component.html',
})
export class CompanyVacanciesComponent implements OnInit {
  company: Company | undefined;
  vacancies: Vacancy[] = [];

  constructor(
    public route: ActivatedRoute,
    private companyService: CompanyService,
    private vacancyService: VacancyService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const companyId = this.route.snapshot.paramMap.get('id');
    if (companyId) {
      this.loadData(+companyId);
    }
  }

  loadData(companyId: number): void {
    this.companyService.getCompany(companyId).subscribe((company) => {
      this.company = company;
    });

    this.vacancyService
      .getCompanyVacancies(companyId)
      .subscribe((vacancies) => {
        this.vacancies = vacancies;
      });
  }

  deleteVacancy(id: number): void {
    if (confirm('delete?')) {
      this.vacancyService.deleteVacancy(id).subscribe(() => {
        const companyId = this.route.snapshot.paramMap.get('id');
        if (companyId) {
          this.loadData(+companyId);
        }
      });
    }
  }
}
