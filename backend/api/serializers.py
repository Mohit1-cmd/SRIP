from rest_framework import serializers
from .models import Position, Application

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    position_title = serializers.CharField(source='position.title', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id', 'position', 'position_title', 'full_name', 'date_of_birth', 'phone_number', 'email', 
            'institute', 'roll_number', 'programme', 'cgpa', 'preferred_faculty', 
            'mode', 'requested_duration_start', 'requested_duration_end', 'status', 'anumati_invited', 'created_at'
        ]
        read_only_fields = ['id', 'status', 'anumati_invited', 'created_at']
