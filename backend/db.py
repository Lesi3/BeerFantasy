import mysql.connector as db

def getConnection():
    return db.connect(
        host = "localhost",
        user = "isel_bd",
        password = "",
        database = "cuenta_botellin"
    )

