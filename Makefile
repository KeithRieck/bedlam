COMPILE_FLAGS=-b -m -n
PYTHON_HOME=/usr/local/opt/python@3.8
DEPLOY_DIR=${HOME}/Sites/bedlam

build:     build/balls.js build/boids.js build/platformer_phaser.js build/demo.js build/snake.js

build/balls.js: balls.py
	transcrypt $(COMPILE_FLAGS) balls.py
	mkdir -p build
	cp -r __target__/* build/

build/boids.js: boids.py
	transcrypt $(COMPILE_FLAGS) boids.py
	mkdir -p build
	cp -r __target__/* build/

build/demo.js: demo.py
	transcrypt $(COMPILE_FLAGS) demo.py
	mkdir -p build
	cp -r __target__/* build/

build/snake.js: snake.py
	transcrypt $(COMPILE_FLAGS) snake.py
	mkdir -p build
	cp -r __target__/* build/

build/platformer_phaser.js: platformer_phaser.py
	transcrypt $(COMPILE_FLAGS) platformer_phaser.py
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
	virtualenv venv --python=${PYTHON_HOME}/bin/python3
	venv/bin/python -m pip install transcrypt mypy
	echo "Enter virtual environment with:  . venv/bin/activate"
