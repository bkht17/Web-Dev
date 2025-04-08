"""
URL configuration for hh_back_10 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import (
    CompanyList, CompanyDetail, CompanyVacancies, VacancyList, VacancyDetail, top_ten_vacancies
)

urlpatterns = [
    path('companies/', CompanyList.as_view()),
    path('companies/<int:id>/', CompanyDetail.as_view()),
    path('companies/<int:id>/vacancies/', CompanyVacancies.as_view()),
    path('vacancies/', VacancyList.as_view()),
    path('vacancies/<int:id>/', VacancyDetail.as_view()),
    
    path('vacancies/top_ten/', top_ten_vacancies),
]
