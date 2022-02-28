#!/bin/sh -ex
PIPENV_VENV_IN_PROJECT=true pipenv --python 3.9
pipenv run python -m pip install -U pip
pipenv install --dev
