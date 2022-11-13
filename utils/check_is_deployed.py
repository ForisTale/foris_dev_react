import os
from pathlib import Path


def check_is_deployed():
    root_dir = Path(__file__).resolve().parent.parent
    return os.path.exists(os.path.join(root_dir, "deployment_settings.yaml"))
