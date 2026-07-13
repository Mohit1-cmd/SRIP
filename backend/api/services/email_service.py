import logging
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)

def send_onboarding_email(application, temp_password=None):
    """
    Sends the welcome onboarding email to the student applicant.
    """
    position_title = application.position.title if application.position else "Research Internship"
    subject = f'Your SRIP Application - WSL Lab, IIIT Bangalore'
    
    # Get the web URL from settings or use default
    anumati_web_url = getattr(settings, 'ANUMATI_WEB_URL', 'https://anumati1.iiitb.ac.in')
    
    password_note = f"\n   (Your temporary password is: {temp_password})\n   Please change it after logging in." if temp_password else ""

    body = f'''
Dear {application.full_name},

Thank you for your interest in the {position_title} position
at WSL Lab, IIIT Bangalore.

NEXT STEPS:
1. Log in to your pre-created Anumati account: {anumati_web_url}/login
   Username: {application.email}{password_note}
2. Create a locker named: SRIP Application
3. Upload your CV, transcript, and Statement of Purpose
4. You will receive a connection request from the lab.
   Accept it to share your documents with us.

If you face issues creating an account, reply to this email.

Best regards,
WSL Lab, IIIT Bangalore
'''
    
    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[application.email],
            fail_silently=False,
        )
        logger.info(f"Onboarding email successfully sent to {application.email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send onboarding email to {application.email}: {str(e)}")
        return False
