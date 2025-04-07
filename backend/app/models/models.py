from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Playground(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    city = db.Column(db.String(50))
    description = db.Column(db.Text)

    features = db.Column(db.Text)
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    geo_shape = db.Column(db.JSON)  # requires MySQL 5.7+ for JSON support

