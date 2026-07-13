import logging
import requests
import secrets
import string
from django.conf import settings

logger = logging.getLogger(__name__)

def generate_temp_password(length=12):
    """
    Generates a secure temporary password.
    """
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    return "".join(secrets.choice(alphabet) for _ in range(length))

def invite_to_anumati(email, full_name):
    """
    Calls Anumati's manual signup API to pre-create the student's account.
    Returns: success_boolean
    """
    anumati_url = getattr(settings, 'ANUMATI_BASE_URL', 'https://anumati1.iiitb.ac.in/api')
    temp_password = generate_temp_password()
    
    # We use the email prefix as username, ensuring it's alphanumeric/clean
    username = email.split('@')[0].replace('.', '_').replace('-', '_')
    
    payload = {
        'username': username,
        'email': email,
        'description': f'SRIP Applicant - {full_name}',
        'password': temp_password
    }
    
    signup_endpoint = f"{anumati_url}/auth/signup/"
    
    try:
        logger.info(f"Sending signup request to Anumati for user: {username} ({email})")
        resp = requests.post(signup_endpoint, json=payload, timeout=10)
        
        if resp.status_code == 201:
            logger.info(f"Successfully pre-registered {email} on Anumati.")
            return True
        else:
            logger.error(f"Failed to pre-register {email} on Anumati. Status: {resp.status_code}, Response: {resp.text}")
            # Check if email already exists
            try:
                error_data = resp.json()
                if "already registered" in error_data.get("error", "").lower():
                    logger.info(f"User {email} is already registered on Anumati. Skipping.")
                    return True
            except Exception:
                pass
            return False
            
    except Exception as e:
        logger.error(f"Error calling Anumati signup API for {email}: {str(e)}")
        return False
