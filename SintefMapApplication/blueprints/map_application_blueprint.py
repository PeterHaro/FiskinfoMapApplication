import json
import os

from flask import Blueprint, render_template, abort, request
from jinja2 import TemplateNotFound
import requests
import requests.auth

templates_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../templates')
map_application_base_blueprint = Blueprint('map_application_base_blueprint', __name__,
                                           template_folder=templates_directory)

token_json = ""
# Default map application
@map_application_base_blueprint.route('/')
def show():
    try:
        return render_template('map_application_splash_screen.html')
    except TemplateNotFound:
        abort(404)


# Default map application
@map_application_base_blueprint.route('/pc')
def show_pc():
    try:
        return render_template('openlayers_computer.html')
    except TemplateNotFound:
        abort(404)


# Android
@map_application_base_blueprint.route('/android')
def ol_c_show():
    try:
        return render_template('openlayers_mobile.html')
    except TemplateNotFound:
        abort(404)


@map_application_base_blueprint.route("/pc/token")
def get_token():
    global token_json
    if token_json != "":
        return token_json["access_token"]
    username = ""
    password = ""
    with open("super_secrets.json") as secret_file:
        file_contents = json.load(secret_file)
        username = file_contents["username"]
        password = file_contents["password"]


    path = "https://www.barentswatch.no/api/token"
    post_data = {"grant_type": "password",
                 "username": username,
                 "password": password
                 }
    response = requests.post(path,
                             data=post_data, headers={"content-type" : "application/x-www-form-urlencoded"})
    token_json = response.json()
    print(token_json)
    return token_json["access_token"]
