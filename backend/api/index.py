from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

def supabase_request(method, endpoint, data=None):
    url = f"{SUPABASE_URL}/rest/v1/{endpoint}"

    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    body = None
    if data is not None:
        body = json.dumps(data).encode("utf-8")

    request = urllib.request.Request(
        url,
        data=body,
        headers=headers,
        method=method
    )

    with urllib.request.urlopen(request) as response:
        return json.loads(response.read().decode("utf-8"))

class handler(BaseHTTPRequestHandler):
    def send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.path == "/":
            self.send_json(200, {"message": "MediClear backend is running"})
            return

        if self.path == "/medicine-plans":
            try:
                records = supabase_request(
                    "GET",
                    "medicine_plans?select=*&order=created_at.desc"
                )
                self.send_json(200, records)
            except Exception as e:
                self.send_json(500, {"error": str(e)})
            return

        self.send_json(404, {"error": "Route not found"})

    def do_POST(self):
        if self.path == "/medicine-plans":
            try:
                content_length = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(content_length)
                data = json.loads(body.decode("utf-8"))

                data["status"] = "saved"

                result = supabase_request(
                    "POST",
                    "medicine_plans",
                    data
                )

                self.send_json(200, {
                    "message": "Medicine plan saved successfully",
                    "data": result
                })

            except Exception as e:
                self.send_json(500, {"error": str(e)})
            return

        self.send_json(404, {"error": "Route not found"})
