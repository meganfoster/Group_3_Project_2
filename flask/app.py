from flask import Flask, jsonify, render_template, make_response
import sqlite3
from sqlite3 import Error

def select_all(conn):
    """
    Query all rows in the table
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

@app.route("/index")
def home():
    return render_template("index.html")

@app.route("/cities_data")
def cities_data():
    return render_template("cities_data.html")

@app.route("/scatter")
def scatter():
    return render_template("scatter.html")

@app.route("/bar-line")
def bar_line():
    return render_template("bar-line.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/city_data")
def city_data():
    results = create_connection(r"cities_data.sqlite")
    data=[]
    for row in results:
        dictionary = {}
        dictionary["sleep_less_than7hours"]=round(row[13],2)
        dictionary["OBESITY"]=round(row[12],2)
        dictionary["KIDNEY_DISEASE"]=round(row[11],2)
        dictionary["HIGH_CHOL"]=round(row[10],2)
        dictionary["DIABETES"]=round(row[9],2)
        dictionary["SMOKING"]=round(row[8],2)
        dictionary["ASTHMA"]=round(row[7],2)
        dictionary["CANCER"]=round(row[6],2)
        dictionary["BPHIGH"]=round(row[5],2)
        dictionary["ARTHRITIS"]=round(row[4],2)
        dictionary["population"]=row[3]
        dictionary["median_income"]=round(row[2],2)
        dictionary["state"]=row[1]
        dictionary["state_abbv"]=row[0]

        data.append(dictionary)
     
    return jsonify(data)
    


if __name__ == '__main__':
    app.run(debug=True)