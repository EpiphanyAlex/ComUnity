# backend/app/config/db_config.py
DB_USERNAME = "admin"
DB_PASSWORD = "Mahakal#2000"
DB_HOST = "kidsfinder-db.c96imq4cgc3h.ap-southeast-2.rds.amazonaws.com"
DB_PORT = "3306"
DB_NAME = "kidsfinderdb"

SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)