import os
from dotenv import load_dotenv
import mysql.connector

load_dotenv()

try:
    my_db_mysql = mysql.connector.connect(
        host=os.getenv('HOST_MYSQL'),
        database=os.getenv('NAMEDB_MYSQL'),
        user=os.getenv('USER_MYSQL'),
        password=os.getenv('PASS_MYSQL'),
        port=os.getenv('PORT_MYSQL'),
        autocommit=True
    )
except mysql.connector.Error as err:
  my_db_mysql = -1
  print("Error connecting to MySQL!: {}".format(err))