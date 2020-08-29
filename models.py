from flask import abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Text, Boolean
from sqlalchemy.exc import IntegrityError

db = SQLAlchemy()


def setup_db(app):
    """
    Binds a flask application and a SQLAlchemy service
    Uses configuration from config.py
    :param app: Flask app instance
    :return:
    """
    app.config.from_object('config')
    db.app = app
    db.init_app(app)


def db_drop_and_create_all():
    """
    Drops the database tables and starts fresh
    Can be used to initialize a clean database
    :return:
    """
    db.drop_all()
    db.create_all()


class TodoItem(db.Model):
    """
    Persistent To-Do item model, extends the base SQLAlchemy model
    """
    __tablename__ = "todo_items"
    id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(Text, nullable=False)
    done = Column(Boolean, nullable=False)

    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except IntegrityError as exception:
            return abort(jsonify(code="BAD_REQUEST", message="Unable to add todo item."), 400)

    def update(self):
        try:
            db.session.commit()
        except IntegrityError as exception:
            return abort(jsonify(code="BAD_REQUEST", message="Unable to update todo item."), 400)

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except IntegrityError as exception:
            return abort(jsonify(code="BAD_REQUEST", message="Unable to delete todo item."), 400)

    def dictionary(self):
        return {
            "id": self.id,
            "description": self.description,
            "done": self.done,
        }
