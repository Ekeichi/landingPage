from fastapi import APIRouter, HTTPException
from app import schemas

router = APIRouter()

@router.post("/contact", response_model=dict)
def contact(contact_data: schemas.ContactRequest):
    """
    Envoi d'un message de contact
    """
    try:
        # Ici vous pourriez ajouter l'envoi d'email
        # Pour l'instant, on simule juste la réception
        
        return {
            "message": "Message reçu ! Nous vous répondrons dans les plus brefs délais.",
            "contact_info": {
                "name": contact_data.name,
                "email": contact_data.email,
                "subject": contact_data.subject or "Contact depuis le site"
            }
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Erreur lors de l'envoi du message"
        )
