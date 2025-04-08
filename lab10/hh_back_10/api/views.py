from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Company, Vacancy
from .serializers import CompanyModelSerializer, VacancySerializer

# FBV
# @api_view(['GET', 'POST'])
# def company_list(request):
#     if request.method == 'GET':
#         companies = Company.objects.all()
#         serializer = CompanyModelSerializer(companies, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = CompanyModelSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PUT', 'DELETE'])
# def company_detail(request, id):
#     try:
#         company = get_object_or_404(Company, pk=id)
#     except Company.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializer = CompanyModelSerializer(company)
#         return Response(serializer.data)
    
#     elif request.method == 'PUT':
#         serializer = CompanyModelSerializer(company, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         company.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# CBV
class CompanyList(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanyModelSerializer

class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanyModelSerializer
    lookup_field = 'id' 
    
class VacancyList(generics.ListCreateAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer

class VacancyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializer
    lookup_field = 'id'
    
class CompanyVacancies(generics.ListAPIView):
    serializer_class = VacancySerializer
    lookup_field = 'id' 
    
    def get_queryset(self):
        company_id = self.kwargs['id']
        return Vacancy.objects.filter(company_id=company_id)
    
#FBV    
@api_view(['GET'])
def top_ten_vacancies(request):
    vacancies = Vacancy.objects.order_by('-salary')[:10]
    serializer = VacancySerializer(vacancies, many=True)
    return Response(serializer.data)