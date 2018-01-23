import os

from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

templates_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../templates')
map_application_base_blueprint = Blueprint('map_application_base_blueprint', __name__,
                                           template_folder=templates_directory)


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
