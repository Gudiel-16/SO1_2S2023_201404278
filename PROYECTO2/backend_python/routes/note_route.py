from flask import Blueprint, request, jsonify, make_response
from models.note_model_mysql import insert_in_mysql
from models.note_model_redis import insert_in_redis

route_note= Blueprint("route_note", __name__)

@route_note.route('/note', methods=['POST'])
def insert_note():

    try:

        r = request.json

        save_msql = insert_in_mysql(r)
        save_redis = insert_in_redis(r)

        if save_msql and save_redis:
            response = make_response(
                jsonify(
                    {"status": "200", "msg": "Nota insertada con exito.", "data": []}
                ),
                200,
            )
            return response
        else:
            response = make_response(
                jsonify(
                    {"status": "400", "msg": "Error al insertar nota.", "data": []}
                ),
                400,
            )
            return response

    except Exception as inst:
        print(inst)
        response = make_response(
                jsonify(
                    {"status": "400", "msg": "Error en el servidor python al registrar nota", "data": []}
                ),
                400,
            )
        return response
