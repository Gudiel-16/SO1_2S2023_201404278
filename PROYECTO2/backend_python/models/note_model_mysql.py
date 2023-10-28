from database.config_mysql import config_db
import mysql.connector

def insert_in_mysql(r):

    try:

        my_db_mysql = mysql.connector.connect(**config_db)

        carnet = r['carnet']
        nombre = r['nombre']
        curso = r['curso']
        nota = r['nota']
        semestre = r['semestre']
        year = r['year']

        mycursor = my_db_mysql.cursor()

        query = ("CALL InsertarNota(%s, %s, %s, %s, %s, %s)")
        values = (carnet, nombre, curso, nota, semestre, year)

        mycursor.execute(query, values)
        my_db_mysql.commit()


        if mycursor.rowcount > 0:
            mycursor.close()
            my_db_mysql.close()
            return True
        else:
            mycursor.close()
            my_db_mysql.close()
            return False

    except mysql.connector.Error as err:
        my_db_mysql = -1
        print("Error connecting to MySQL!: {}".format(err))