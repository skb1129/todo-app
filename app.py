from flask import Flask, request, jsonify, render_template
from jinja2 import TemplateNotFound
from werkzeug.exceptions import InternalServerError, BadRequest

from models import setup_db, TodoItem, TodoBucket, db_drop_and_create_all

app = Flask(__name__, static_url_path="", template_folder="static")
setup_db(app)

# Use this to re-initialize database:
db_drop_and_create_all()


@app.errorhandler(404)
def static_handler(e):
    try:
        render = render_template("index.html")
    except TemplateNotFound:
        return e
    return render, 200


@app.route("/api/todo", methods=["GET"])
def get_all_todo():
    todo_list = [todo.dictionary() for todo in TodoItem.query.all()]
    return jsonify(todo_list), 200


@app.route("/api/todo", methods=["POST"])
def add_todo():
    description = request.json.get("description", None)
    if not description:
        raise BadRequest("Required body parameter \"description\" not found.")
    todo = TodoItem(description=description, done=False, bucket=request.json.get("bucket", None))
    todo.insert()
    return jsonify(todo.dictionary()), 201


@app.route("/api/todo", methods=["PUT"])
def update_todo():
    todo_id = request.json.get("id", None)
    if not todo_id:
        raise BadRequest("Required body parameter \"id\" not found.")
    description = request.json.get("description", None)
    bucket = request.json.get("bucket", None)
    done = request.json.get("done", None)
    todo = TodoItem.get(todo_id)
    todo.description = description if description else todo.description
    todo.bucket = bucket if bucket else todo.bucket
    todo.done = done if type(done) is bool else todo.done
    todo.update()
    return jsonify(todo.dictionary()), 200


@app.route("/api/todo", methods=["DELETE"])
def delete_todo():
    todo_id = request.args.get("id", None)
    if not todo_id:
        raise BadRequest("Required query parameter \"id\" not found.")
    todo = TodoItem.get(todo_id)
    todo.delete()
    return jsonify({}), 200


@app.route("/api/bucket", methods=["GET"])
def get_all_buckets():
    bucket_list = [bucket.dictionary() for bucket in TodoBucket.query.all()]
    return jsonify(bucket_list), 200


@app.route("/api/bucket", methods=["POST"])
def add_bucket():
    name = request.json.get("name", None)
    if not name:
        raise BadRequest("Required body parameter \"name\" not found.")
    bucket = TodoBucket(name=name)
    bucket.insert()
    return jsonify(bucket.dictionary()), 201


@app.route("/api/bucket", methods=["PUT"])
def update_bucket():
    name = request.json.get("name")
    bucket = TodoBucket.get(name)
    bucket.name = name if name else bucket.name
    bucket.update()
    return jsonify(bucket.dictionary()), 200


@app.route("/api/bucket", methods=["DELETE"])
def delete_bucket():
    name = request.args.get("name", None)
    if not name:
        raise BadRequest("Required query parameter \"name\" not found.")
    bucket = TodoBucket.get(name)
    bucket.delete()
    return jsonify({}), 200


@app.errorhandler(InternalServerError)
def server_error(error):
    return jsonify(code="SERVER_ERROR", message="An internal server error occurred."), error.code


@app.errorhandler(BadRequest)
def bad_request_error(error):
    return jsonify(code="BAD_REQUEST", message=error.description), error.code


if __name__ == '__main__':
    app.run()
