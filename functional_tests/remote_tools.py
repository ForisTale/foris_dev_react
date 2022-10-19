# from fabric.api import run
# from fabric.context_managers import settings


def _get_manage_dot_py(host):
    return f"~/sites/{host}/virtualenv/bin/python ~/sites/{host}/manage.py"


def reset_database(host):
    manage_dot_py = _get_manage_dot_py(host)
    raise Exception("install fabric3 and uncomment to use it")
    # with settings(host_string=f"Eien@{host}"):
    #     run(f"{manage_dot_py} flush --noinput")
