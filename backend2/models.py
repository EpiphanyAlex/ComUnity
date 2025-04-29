# models.py
from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    address = db.Column(db.Text, nullable=False)
    date = db.Column(db.String(50), nullable=False)

    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)

    link = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)

    venue_name = db.Column(db.String(255), nullable=True)
    venue_rating = db.Column(db.Float, nullable=True)
    venue_reviews = db.Column(db.Integer, nullable=True)

    thumbnail = db.Column(db.Text, nullable=True)
    image = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'address': self.address,
            'date': self.date,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'link': self.link,
            'description': self.description,
            'venue_name': self.venue_name,
            'venue_rating': self.venue_rating,
            'venue_reviews': self.venue_reviews,
            'thumbnail': self.thumbnail,
            'image': self.image
        }
