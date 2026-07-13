from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

from .models import Position, Application
from .serializers import PositionSerializer, ApplicationSerializer
from .services.email_service import send_onboarding_email
from .services.anumati_service import invite_to_anumati

class PositionListView(generics.ListAPIView):
    """
    List all active internship positions.
    """
    queryset = Position.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = PositionSerializer
    permission_classes = [AllowAny]

class PositionDetailView(generics.RetrieveAPIView):
    """
    Retrieve details of a single position.
    """
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    permission_classes = [AllowAny]

# Rate limit form submission to 5 per minute per IP to prevent spam
@method_decorator(ratelimit(key='ip', rate='5/m', method='POST', block=True), name='dispatch')
class ApplicationCreateView(APIView):
    """
    Submit interest in an internship position (POST) or list all applications (GET - Admin only).
    """
    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAdminUser()]

    def get_authenticators(self):
        if self.request.method == 'POST':
            return []
        return [SessionAuthentication(), BasicAuthentication()]

    def post(self, request):
        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            # Create application instance with default 'submitted' status
            app = serializer.save(status='submitted')

            # 1. Send onboarding email to student
            send_onboarding_email(app)

            # 2. Try to whitelist on Anumati (Option A)
            success = invite_to_anumati(app.email, app.full_name)
            if success:
                app.anumati_invited = True
                app.status = 'anumati_invited'
                app.save()

            return Response({'message': 'Application received'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        applications = Application.objects.all().order_by('-created_at')
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)

class ApplicationUpdateView(generics.UpdateAPIView):
    """
    Update application status (admin only).
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

