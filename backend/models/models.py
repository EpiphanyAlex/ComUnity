from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Playground(db.Model):
    __tablename__ = 'playgrounds'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(255), nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    mel_features = db.relationship('MelFeature', backref='playground', lazy=True)
    
    def __repr__(self):
        return f"<Playground {self.name}>"

class MelFeature(db.Model):
    __tablename__ = 'mel_features'
    
    id = db.Column(db.Integer, primary_key=True)
    playground_id = db.Column(db.Integer, db.ForeignKey('playgrounds.id'), nullable=False)
    feature_vector = db.Column(db.Text, nullable=False)  # Stored as JSON string
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    def __repr__(self):
        return f"<MelFeature {self.id} for Playground {self.playground_id}>" 