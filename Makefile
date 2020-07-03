COMPILE_FLAGS=-b -m -n -ds
DEPLOY_DIR=${HOME}/Sites/bedlam

build:    build/balls.js build/phaser_platformer.js

build/balls.js: balls.py
	transcrypt $(COMPILE_FLAGS) balls.py
	mkdir -p build
	cp -r __target__/* build/

build/phaser_platformer.js: phaser_platformer.py
	transcrypt $(COMPILE_FLAGS) phaser_platformer.py
	mkdir -p build
	cp -r __target__/* build/

clean:
	rm -rf __target__
	rm -rf /__javascript__
	rm -rf build

deploy: build LICENSE
	mkdir -p $(DEPLOY_DIR)
	cp -rf __target__/ build/
	cp *.html $(DEPLOY_DIR)
	cp -r build $(DEPLOY_DIR)
	cp -r assets $(DEPLOY_DIR)
	cp LICENSE $(DEPLOY_DIR)


setup:
	virtualenv venv
	venv/bin/python -m pip install transcrypt mypy
	echo "Enter virtual environment with:  . venv/bin/activate"
