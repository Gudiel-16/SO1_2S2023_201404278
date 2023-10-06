import os
from dotenv import load_dotenv
import mysql.connector

load_dotenv()

try:
    my_db_mysql = mysql.connector.connect(
        host=os.getenv('HOSTDB'),
        database=os.getenv('NAMEDB'),
        user=os.getenv('USERDB'),
        password=os.getenv('PASSDB'),
        port=os.getenv('PORTDB'),
        autocommit=True
    )
except mysql.connector.Error as err:
  my_db_mysql = -1
  print("Error connecting to MySQL!: {}".format(err))