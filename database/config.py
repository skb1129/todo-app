import os

SECRET_KEY = os.environ.get("SECRET_KEY", os.urandom(32))

basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")

SQLALCHEMY_TRACK_MODIFICATIONS = False
