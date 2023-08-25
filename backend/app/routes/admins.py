from fastapi import Depends, HTTPException, status
from fastapi.routing import APIRouter
from sqlmodel import Session
from app.models.admins import Admin
from app.models.database import get_session
from app.schemas.admins import LoginAdmin, NewAdmin


router = APIRouter()


@router.post("/registro")
async def registro(admin: NewAdmin, session: Session = Depends(get_session)):
    admin_db = Admin.from_new_admin(admin)
    session.add(admin_db)
    session.commit()
    session.refresh(admin_db)
    if admin_db:
        return {"message": "Admin creado exitosamente"}
    # Error 409
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST, detail="Admin no creado"
    )


@router.post("/login")
async def login(admin: LoginAdmin):
    return {"message": f"{admin.email} {admin.password}"}


@router.post("/logout")
async def logout(_: str):
    return "Log out"
