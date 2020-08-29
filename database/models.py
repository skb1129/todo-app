from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Text, Boolean, String, ForeignKey
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import BadRequest

from database import config

db = SQLAlchemy()


def setup_db(app):
    """
    Binds a flask application and a SQLAlchemy service
    Uses configuration from config.py
    :param app: Flask app instance
    :return:
    """
    app.config.from_object(config)
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
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(Text, nullable=False)
    done = Column(Boolean, nullable=False)
    bucket = Column(String(24), ForeignKey('buckets.name'), nullable=True)

    @staticmethod
    def get(todo_id):
        todo = TodoItem.query.get(todo_id)
        if not todo:
            raise BadRequest(f"Item with id:{todo_id} not found.")
        return todo

    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except IntegrityError:
            raise BadRequest("Unable to add todo item.")

    def update(self):
        try:
            db.session.commit()
        except IntegrityError:
            raise BadRequest("Unable to update todo item.")

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except IntegrityError:
            raise BadRequest("Unable to delete todo item.")

    def dictionary(self):
        return {
            "id": self.id,
            "description": self.description,
            "done": self.done,
            "bucket": self.bucket,
        }


class TodoBucket(db.Model):
    """
    Persistent To-Do bucket model, extends the base SQLAlchemy model
    """
    __tablename__ = "buckets"
    name = Column(String(24), primary_key=True)
    todos = db.relationship(TodoItem, backref="buckets")

    @staticmethod
    def get(name):
        bucket = TodoBucket.query.get(name)
        if not bucket:
            raise BadRequest(f"Bucket with name:{name} not found.")
        return bucket

    def insert(self):
        try:
            db.session.add(self)
            db.session.commit()
        except IntegrityError:
            raise BadRequest("Unable to create todo bucket.")

    def update(self):
        try:
            db.session.commit()
        except IntegrityError:
            raise BadRequest("Unable to update todo bucket.")

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except IntegrityError:
            raise BadRequest("Unable to delete todo bucket.")

    def dictionary(self):
        return {
            "name": self.name,
            "todos": [todo.dictionary() for todo in self.todos],
        }
