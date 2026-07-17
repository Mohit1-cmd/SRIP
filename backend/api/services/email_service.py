import logging
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)

def send_onboarding_email(application, temp_password=None):
    """
    Sends the welcome / form-received confirmation email to the student applicant.
    """
    position_title = application.position.title if application.position else "Research Internship"
    subject = f'Application Received – {position_title} | WSL Lab, IIITB'

    anumati_web_url = getattr(settings, 'ANUMATI_WEB_URL', 'https://anumati1.iiitb.ac.in')
    password_note = (
        f"\n   Temporary password: {temp_password}"
        f"\n   (Please change it after your first login.)"
    ) if temp_password else ""

    body = f'''Hi {application.full_name},

Thank you for applying! We have received your application for the
{position_title} position at WSL Lab, IIIT Bangalore.

Our team will review your details and get back to you shortly.

────────────────────────────────────────
NEXT STEP — SET UP YOUR ANUMATI LOCKER
────────────────────────────────────────
We use Anumati, a consent-based document locker, to collect
your supporting documents securely. We have pre-created an
account for you.

  Login URL : {anumati_web_url}/login
  Username  : {application.email}{password_note}

Once logged in:
  1. Create a locker named  →  SRIP Application
  2. Upload your CV, transcript, and Statement of Purpose
  3. Accept the connection request from our lab to share
     your documents with us.

────────────────────────────────────────

If you have any questions, just reply to this email.

Best regards,
WSL Lab, IIIT Bangalore
https://wsl.iiitb.ac.in
'''
    
    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[application.email],
            fail_silently=False,
        )
        logger.info(f"Confirmation email sent to {application.email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send confirmation email to {application.email}: {str(e)}")
        return False


def send_direct_email(to_email, full_name, position_title="Research Internship", temp_password=None):
    """
    Sends the onboarding email directly to any given email address.
    Does NOT require an Application object — just the raw email + name.
    """
    anumati_web_url = getattr(settings, 'ANUMATI_WEB_URL', 'https://anumati1.iiitb.ac.in')

    password_note = (
        f"\n   (Your temporary password is: {temp_password})"
        f"\n   Please change it after logging in."
    ) if temp_password else ""

    body = f'''
Dear {full_name},

Thank you for your interest in the {position_title} position
at WSL Lab, IIIT Bangalore.

NEXT STEPS:
1. Log in to your pre-created Anumati account: {anumati_web_url}/login
   Username: {to_email}{password_note}
2. Create a locker named: SRIP Application
3. Upload your CV, transcript, and Statement of Purpose
4. You will receive a connection request from the lab.
   Accept it to share your documents with us.

If you face issues, reply to this email.

Best regards,
WSL Lab, IIIT Bangalore
'''

    try:
        send_mail(
            subject='Your SRIP Application - WSL Lab, IIIT Bangalore',
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[to_email],
            fail_silently=False,
        )
        logger.info(f"Direct onboarding email sent to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send direct email to {to_email}: {str(e)}")
        return False
