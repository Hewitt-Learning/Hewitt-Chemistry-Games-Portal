"""Local entrypoint for running the Flask backend.

run it to start the dev server. If you see a port-in-use error, either change PORT or kill whatever's hogging it.
"""

import os

from app import create_app

app = create_app()


if __name__ == "__main__":
    # Debug mode is on for local development only. don't use this in prod.
    port = int(os.getenv("PORT", "5000"))
    # binding to 0.0.0.0 makes the server reachable from other machines
    # on your network — useful for testing on a phone or another laptop.
    app.run(host="0.0.0.0", port=port, debug=True)
