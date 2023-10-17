import os
import redis
import json
import uuid
# from dotenv import load_dotenv
# load_dotenv()

cx = redis.Redis(host=os.getenv('HOSTREDIS'), port=os.getenv('PORTREDIS'))

def insert_in_redis(r):

    myuuid = str(uuid.uuid4())

    myobject = {
        'id': myuuid,
        'carnet': r['carnet'],
        'nombre': r['nombre'],
        'curso': r['curso'],
        'nota': r['nota'],
        'semestre': r['semestre'],
        'year': r['year'],
    }

    data = json.dumps(myobject)

    res = cx.set(myuuid, data)

    key_increment= str(r['curso']) + str(r['semestre'])
    cx.hincrby("cantidad_notas",key_increment,1)

    # mykeys = cx.keys("*")
    # for key in mykeys:
    #     value = cx.get(key)
    #     valuej = json.loads(value.decode('utf-8'))
    #     print(valuej['carnet'])
    #     print("\n")

    return res # true or false