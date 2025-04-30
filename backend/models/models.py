from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Playground(db.Model):
    __tablename__ = 'playgrounds'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    address = db.Column(db.String(500))
    # Add any other fields needed for playgrounds
    
    def __repr__(self):
        return f'<Playground {self.name}>'

class MelFeature(db.Model):
    __tablename__ = 'mel_features'
    
    id = db.Column(db.Integer, primary_key=True)
    playground_id = db.Column(db.Integer, db.ForeignKey('playgrounds.id'), nullable=False)
    feature_data = db.Column(db.Text)  # Store feature data as JSON or some other format
    
    playground = db.relationship('Playground', backref=db.backref('features', lazy=True))
    
    def __repr__(self):
        return f'<MelFeature {self.id} for Playground {self.playground_id}>' 

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

class EventUpdateStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    last_updated = db.Column(db.Date)