import os
import random
import urllib.parse as urllib
from flask import Flask, request, render_template, redirect
from linkgen import gen_long_url, gen_short_url
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder="./src/")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///redirects.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

splashesLarge = ["smaller", "unpleasurable", "pleasurable", "longer", "shorter", "girthy", "wimpy", "juicy", "drier", "plump", "fatter", "thinner", "nicer", "rougher", "stronger", "finer", "coarser", "great", "horrible", "pleasant", "unpleasant", "unique"];

class urls(db.Model):
    id_ = db.Column("id_", db.Integer, primary_key=True)
    origin = db.Column("origin", db.String())
    redirect = db.Column("redirect", db.String())
    user = db.Column("username", db.String())

    def __init__(self, origin, redirect, user=""):
        self.origin = origin
        self.redirect = redirect



@app.route('/', methods=["POST", "GET"])
def index(bloat_mode="true"):
    if request.method == "POST":
        url = request.form["url"]
        operation = request.form["operation"]
        mode = request.form["mode"]
        amplifier = request.form["amplifier"]
        longer = False
        if (request.form.get("longer")):
            longer = True

        print(request.form.get("longer"))

        origin_url = ""
        if (operation == "1"):
            origin_url = gen_long_url(mode, amplifier, longer)
        elif (operation == "2"):
            origin_url = gen_short_url(mode)
        new_url = urls(origin_url, url)
        db.session.add(new_url)
        db.session.commit()
        if request.headers.getlist("User-Agent")[0] == "S7EXP_APP" and request.headers.getlist("S7AUTH")[0] == os.environ["S7AUTH"]:
            print(origin_url)
            return origin_url

        return render_template("submitted.html", code=origin_url), 201
    else:
        return render_template("landing.html", splash=random.choice(splashesLarge), bloat=bloat_mode), 201

# @app.route("/bloat", methods=["GET"])
# @app.route("/lengthen", methods=["GET"])
# def rerouteb():
#     index(bloat_mode="true")

# @app.route("/trim")
# @app.route("/shorten", methods=["GET"])
# def reroutet():
#     index(bloat_mode="false")

@app.route("/signup")
@app.route("/login")
def beta():
    return render_template("beta.html"), 501

@app.route('/<origin>', methods=['GET'])
def redirection(origin):
    url = urls.query.filter_by(origin=urllib.unquote(origin)).first()
    if url:
        return redirect(url.redirect)
    else:
        return redirect("https://bloat.link")

@app.route("/cookies4everyone")
def bruh():
    return render_template("303.html"), 303

@app.route("/support")
def support():
    return render_template("support.html")

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html")

@app.errorhandler(500)
def server_error(e):
    return render_template("500.html")

def init_db():
    with app.app_context():
        db.create_all()

if __name__ == "__main__":
    init_db()
    app.run(host='0.0.0.0', port=8080, debug=True)
