from flask import Flask, jsonify, render_template
import sqlite3
from sqlite3 import Error

def select_all(conn):
    """
    Query all rows in the tasks table
    :param conn: the Connection object
    :return:
    """
    cur = conn.cursor()
    cur.execute("SELECT * FROM state_data2")

    rows = cur.fetchall()
    return rows

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
        return select_all(conn)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

app = Flask(__name__)
@app.route("/")
def index():
    return render_template("cities_data.html")


@app.route("/cities_data")
def cities_data():
    results = create_connection(r"cities_data.sqlite")
    data=[]
    for row in results:
        dictionary = {}
        dictionary["StateCode"]=row[0]
        dictionary["State"]=row[1]
        dictionary["MedianIncome"]=row[2]
        dictionary["Population2010"]=row[3]
        dictionary["Arthritis"]=row[4]
        dictionary["HighBloodPreasure"]=row[5]
        dictionary["Cancer"]=row[6]
        dictionary["Smoking"]=row[7]
        dictionary["Diabetes"]=row[8]
        dictionary["HighCholesterol"]=row[9]
        dictionary["KidneyDisease"]=row[10]
        dictionary["Obesity"]=row[11]
       
        data.append(dictionary)
     
    return jsonify(data)
    

if __name__ == '__main__':
    app.run(debug=True)