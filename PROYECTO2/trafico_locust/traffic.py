import json

from random import randrange
from locust import HttpUser, between, task

# Controlar que salgan todas las salidas o solo las importantes
debug = False

def printDebug(msg):
    if debug:
        print(msg)

# Lectura de archivo
class Reader():

    def __init__(self):
        self.array = []

    # Seleccionando un registro
    def pickRandom(self):
        lenght = len(self.array)

        if (lenght > 0):
            random_index = randrange(0, lenght - 1) if lenght > 1 else 0
            return self.array.pop(random_index)
        else:
            print(">> Reader: No encontramos ningún valor o registro en el archivo.")
            return None

    # Cargar el archivo de datos
    def load(self):
        print(">> Reader: Estamos iniciando la lectura del archivo de datos.")

        try:
            with open("traffic1.json", 'r') as data_file:
                self.array = json.loads(data_file.read())
        except Exception as error:
            print(f'>> Reader: No se cargaron los datos, error: {error}')

    
class NotesTraffic(HttpUser):
    wait_time = between(0.9, 1) #0.1, 0.9

    # Instancia de la clase de lectura de archivo
    reader = Reader()
    reader.load()

    def on_start(self):
        print(">> NotesTraffic: Iniciando el envío de tráfico")

    @task
    def PostNotes(self):
        random_data = self.reader.pickRandom() # Obtenemos objeto a insertar

        if (random_data is not None):
            data_to_send = json.dumps(random_data) # Convertimos a json
            print(random_data)
            printDebug(data_to_send) # Mostramos data a enviar
            self.client.post("/api/note", json=random_data) # Hacemos la peticion
        else:
            print(">> NotesTraffic: Envío de tráfico a finalizado, no hay más registros para enviar.")
            self.stop(True) # Terminamos proceso
    
    # @task
    # def GetMessages(self):
    #     self.client.get("/")