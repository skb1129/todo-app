from flask import Flask, request, jsonify, render_template
from jinja2 import TemplateNotFound
from werkzeug.exceptions import InternalServerError

from models import setup_db, TodoItem, db_drop_and_create_all

app = Flask(__name__, static_url_path="", template_folder="static")
setup_db(app)

# Use this to re-initialize database:
db_drop_and_create_all()


@app.errorhandler(404)
def static_handler(e):
    try:
        render = render_template("index.html")
    except TemplateNotFound as exception:
        return e
    return render, 200


@app.route("/api/todo", methods=["GET"])
def get_all_todo():
    todo_list = [todo.dictionary() for todo in TodoItem.query.all()]
    return jsonify(todo_list), 200


@app.route("/api/todo", methods=["POST"])
def add_todo():
    todo = TodoItem(description=request.json.get("description"), done=False)
    todo.insert()
    return jsonify(todo.dictionary()), 201


@app.route("/api/todo", methods=["PUT"])
def update_todo():
    todo_id = request.json.get("id")
    description = request.json.get("description")
    done = request.json.get("done")
    todo = TodoItem.query.get(todo_id)
    todo.description = description if description else todo.description
    todo.done = done
    todo.update()
    return jsonify(todo.dictionary()), 200


@app.route("/api/todo", methods=["DELETE"])
def delete_todo():
    todo_id = request.args.get("id")
    todo = TodoItem.query.get(todo_id)
    todo.delete()
    return 200


@app.errorhandler(InternalServerError)
def server_error(error):
    return jsonify(code="SERVER_ERROR", message="An internal server error occurred."), error.code


if __name__ == '__main__':
    app.run()
