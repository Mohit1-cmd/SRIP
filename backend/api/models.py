from django.db import models

class Position(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    duration = models.CharField(max_length=100)  # e.g., '8 weeks'
    stipend = models.CharField(max_length=100, blank=True, default='')
    eligibility = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title

class Application(models.Model):
    STATUS_CHOICES = [
        ('submitted', 'Submitted'),
        ('email_sent', 'Email Sent'),
        ('anumati_invited', 'Anumati Invited'),
        ('documents_received', 'Documents Received'),
        ('shortlisted', 'Shortlisted'),
        ('rejected', 'Rejected'),
    ]
    position = models.ForeignKey(Position, on_delete=models.SET_NULL, null=True, related_name='applications')
    full_name = models.CharField(max_length=200)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, blank=True, default='')
    email = models.EmailField(unique=True)
    
    institute = models.CharField(max_length=200)
    roll_number = models.CharField(max_length=50, blank=True, default='')
    programme = models.CharField(max_length=50)
    cgpa = models.CharField(max_length=10, blank=True, default='')
    
    preferred_faculty = models.CharField(max_length=200, blank=True, default='')
    mode = models.CharField(max_length=50, choices=[('Remote', 'Remote'), ('In-person', 'In-person'), ('Hybrid', 'Hybrid')], default='Remote')
    requested_duration_start = models.DateField(null=True, blank=True)
    requested_duration_end = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='submitted')
    anumati_invited = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.position.title if self.position else 'No Position'}"
