__pragma__('noalias', 'update')


class Scene:
    def __init__(self, config=None):
        if config is None:
            self.scene = __new__(Phaser.Scene())
        else:
            self.scene = __new__(Phaser.Scene(config))
        self.scene.init = self.init
        self.scene.preload = self.preload
        self.scene.create = self.create
        self.scene.update = self.update
        self.add = self.scene.add
        self.load = self.scene.load
        self.physics = self.scene.physics
        self.anims = self.scene.anims
        self.input = self.scene.input

    def init(self):
        pass

    def preload(self):
        pass

    def create(self):
        pass

    def update(self):
        pass


class Sprite:
    def __init__(self):
        self.sprite = __new__(Phaser.GameObjects.Sprite(scene, x, y, texture))
        self.destroy = self.sprite.destroy

    def move_to(self, x, y, depth=None):
        self.sprite.x = x
        self.sprite.y = y
        if depth is not None:
            self.sprite.depth = depth


class Text:
    def __init__(self, scene, x, y, text, style=None):
        self.text = __new__(Phaser.GameObjects.Text(scene, x, y, text, style))

    def setText(self, text):
        self.text.setText(text)


class Game:
    def __init__(self, config=None):
        if config is None:
            self.game = __new__(Phaser.Game())
        else:
            self.game = __new__(Phaser.Game(config))
