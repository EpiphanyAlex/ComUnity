import pandas as pd
from app.models.models import db, MelFeature

def fetch_melfeature_data():
    # Access the engine directly from the db object
    engine = db.engine

    # Read the entire table into a pandas DataFrame
    df = pd.read_sql_table('MelFeature', con=engine)
    
    # Print the first few rows
    print(df.head())
    return df
