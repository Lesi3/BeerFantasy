from flask import Flask, request, jsonify
from db import getConnection
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    if not data or "name" not in data or "password" not in data:
        return jsonify({"error": "Datos incompletos"}), 400

    name = data["name"]
    password = data["password"]

    conn = getConnection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT id, name, KG
        FROM users
        WHERE name = %s AND password = %s
    """
    cursor.execute(query, (name, password))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return jsonify({"error": "Credenciales incorrectas"}), 401

    return jsonify({
        "message": "Login correcto",
        "user": user
    }), 200

@app.route("/api/groups/<int:user_id>", methods=["GET"])
def get_user_groups(user_id):
    conn = getConnection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT g.id, g.name
        FROM groupss g
        JOIN users_groups ug ON ug.groupss_id = g.id
        WHERE ug.user_id = %s
    """
    cursor.execute(query, (user_id,))
    groups = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(groups), 200

@app.route("/api/drinks", methods=["GET"])
def get_drinks():
    conn = getConnection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT id, name from drinks;
    """

    try:
        cursor.execute(query)
        drinks = cursor.fetchall()
    except Exception as e:
        return jsonify({"error": "Error cargando las bebidas"}), 500
    finally:
        cursor.close()
        conn.close()
    
    return jsonify(drinks), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5777, debug=True)
