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
    title = db.Column(db.String(255))
    address = db.Column(db.Text)
    date = db.Column(db.String(50))

class EventUpdateStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    last_updated = db.Column(db.Date)