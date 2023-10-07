from database.config_mysql import my_db_mysql

def insert_in_mysql(r):

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
        return True
    else:
        return False

