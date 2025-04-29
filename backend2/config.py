# config.py

DB_USERNAME = "admin"
DB_PASSWORD = "Mahakal#2000"
DB_HOST = "kidsfinder-db.c96imq4cgc3h.ap-southeast-2.rds.amazonaws.com"
DB_PORT = "3306"
DB_NAME = "kidsfinderdb"

class Config:
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # 不要追踪对象的变化，节省开销
