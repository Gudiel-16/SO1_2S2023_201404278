import os
from dotenv import load_dotenv

load_dotenv()

config_db = {
    'host': os.getenv('HOST_MYSQL'),
    'database': os.getenv('NAMEDB_MYSQL'),
    'user': os.getenv('USER_MYSQL'),
    'password': os.getenv('PASS_MYSQL'),
    'port': os.getenv('PORT_MYSQL'),
    'autocommit': True
}