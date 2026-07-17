from django.urls import path
from .views import PositionListView, PositionDetailView, ApplicationCreateView, ApplicationUpdateView, SendEmailView

urlpatterns = [
    path('positions/', PositionListView.as_view(), name='position-list'),
    path('positions/<int:pk>/', PositionDetailView.as_view(), name='position-detail'),
    path('applications/', ApplicationCreateView.as_view(), name='application-create-list'),
    path('applications/<int:pk>/', ApplicationUpdateView.as_view(), name='application-update'),
    path('send-email/', SendEmailView.as_view(), name='send-email'),
]
