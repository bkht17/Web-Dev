import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Company } from '../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-form.component.html',
})
export class CompanyFormComponent implements OnInit {
  company: Partial<Company> = {
    name: '',
    description: '',
    city: '',
    address: '',
  };
  isEdit = false;

  constructor(
    private companyService: CompanyService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.companyService.getCompany(+id).subscribe((company) => {
        this.company = company;
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.companyService
        .updateCompany(this.company.id!, this.company as Company)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } else {
      this.companyService
        .createCompany(this.company as Omit<Company, 'id'>)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }
}
