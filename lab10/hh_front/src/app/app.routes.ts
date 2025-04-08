import { Routes } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyVacanciesComponent } from './company-vacancies/company-vacancies.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { VacancyFormComponent } from './vacancy-form/vacancy-form.component';
import { TopVacanciesComponent } from './top-vacancies/top-vacancies.component';

export const routes: Routes = [
  { path: 'сompanies/', component: CompanyListComponent },
  { path: 'companies/create', component: CompanyFormComponent },
  { path: 'companies/:id/edit', component: CompanyFormComponent },
  { path: 'companies/:id/vacancies', component: CompanyVacanciesComponent },
  {
    path: 'companies/:companyId/vacancies/create',
    component: VacancyFormComponent,
  },
  { path: 'vacancies/:id/edit', component: VacancyFormComponent },
  { path: 'vacancies/top_ten', component: TopVacanciesComponent },
  { path: '**', redirectTo: 'companies/' },
];
