import unittest

from flask import json
from flask_sqlalchemy import SQLAlchemy

from flaskr import create_app


class TodoAPITests(unittest.TestCase):
    """This class represents the unit tests for the flask app"""

    def setUp(self) -> None:
        self.app = create_app()
        self.client = self.app.test_client

        self.sample_todo = {"description": "A sample todo."}

        self.sample_bucket = {"name": "Sample"}

        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            self.db.create_all()

    def test_add_bucket(self):
        res = self.client().post("/api/bucket", data=json.dumps(self.sample_bucket), content_type="application/json")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 201)
        self.assertEqual(data.get("name"), self.sample_bucket.get("name"))
        self.assertEqual(data.get("todos"), [])

    def test_add_todo(self):
        res = self.client().post("/api/todo", data=json.dumps(self.sample_todo), content_type="application/json")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 201)
        self.assertEqual(data.get("description"), self.sample_todo.get("description"))
        self.assertFalse(data.get("done"))

    def test_get_all_buckets(self):
        res = self.client().get("/api/bucket")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data, [])

    def test_get_all_todos(self):
        res = self.client().get("/api/todo")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data, [])

    def test_update_todo(self):
        res = self.client().post("/api/todo", data=json.dumps(self.sample_todo), content_type="application/json")
        res_todo = json.loads(res.data)
        res_todo["done"] = True
        res = self.client().put("/api/todo", data=json.dumps(res_todo), content_type="application/json")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertTrue(data.get("done"))

    def test_delete_bucket(self):
        res = self.client().post("/api/bucket", data=json.dumps(self.sample_bucket), content_type="application/json")
        res_bucket = json.loads(res.data)
        res = self.client().delete(f'/api/bucket?name={res_bucket.get("name")}')
        self.assertEqual(res.status_code, 200)

    def test_delete_todo(self):
        res = self.client().post("/api/todo", data=json.dumps(self.sample_todo), content_type="application/json")
        res_todo = json.loads(res.data)
        res = self.client().delete(f'/api/todo?id={res_todo.get("id")}')
        self.assertEqual(res.status_code, 200)


if __name__ == '__main__':
    unittest.main()
