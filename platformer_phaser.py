import io.phaser as phaser

__pragma__('skip')
document = window = Math = Date = console = Phaser = 0  # Prevent complaints by optional static checker
__pragma__('noskip')
__pragma__('noalias', 'clear')
__pragma__('noalias', 'update')

GROUND_KEY = 'ground'
DUDE_KEY = 'dude'
STAR_KEY = 'star'
SKY_KEY = 'sky'
BOMB_KEY = 'bomb'


class ScoreLabel:
    def __init__(self, scene, x=16, y=16, score=0):
        self.scene = scene
        self.text = self.scene.add.text(x, y, '', {'fontSize': '32px', 'fill': '#000'})
        self.score = score
        self.update()

    def set_score(self, s):
        self.score = s
        self.update()

    def add(self, s):
        self.score = self.score + s
        self.update()

    def update(self):
        self.text.setText('Score: ' + self.score)


class BombSpawner:
    def __init__(self, scene):
        self.scene = scene
        self.group = self.scene.physics.add.group()

    def spawn(self, player_x = 0):
        x = Phaser.Math.Between(400, 800) if (player_x < 400) else Phaser.Math.Between(0, 400)
        bomb = self.group.create(x, 16, BOMB_KEY)
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(True)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)


class HelloWorldScene(phaser.Scene):
    def __init__(self):
        self.platforms = None
        self.player = None
        self.stars = None
        self.cursors = None
        self.score_label = None
        self.bomb_spawner = None
        self.game_over = False

    def preload(self):
        self.load.image(SKY_KEY, 'assets/sky.png')
        self.load.image(GROUND_KEY, 'assets/platform.png')
        self.load.image(STAR_KEY, 'assets/star.png')
        self.load.image(BOMB_KEY, 'assets/bomb.png')
        self.load.spritesheet(DUDE_KEY, 'assets/dude.png', {'frameWidth': 32, 'frameHeight': 48})

    def create(self):
        self.add.image(400, 300, SKY_KEY)
        self.platforms = self.create_platforms()
        self.player = self.create_player()
        self.stars = self.create_stars()
        self.physics.add.collider(self.player, self.platforms)
        self.physics.add.collider(self.stars, self.platforms)
        self.physics.add.overlap(self.player, self.stars, self.collect_star, None, self)
        self.cursors = self.input.keyboard.createCursorKeys()
        self.score_label = ScoreLabel(self)
        self.bomb_spawner = BombSpawner(self)
        self.physics.add.collider(self.bomb_spawner.group, self.platforms)
        self.physics.add.collider(self.player, self.bomb_spawner.group, self.hit_bomb, None, self)

    def create_platforms(self):
        platforms = self.physics.add.staticGroup()
        platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()
        platforms.create(600, 400, GROUND_KEY)
        platforms.create(50, 250, GROUND_KEY)
        platforms.create(750, 220, GROUND_KEY)
        return platforms

    def create_player(self):
        player = self.physics.add.sprite(100, 405, DUDE_KEY)
        player.setBounce(0.2)
        player.setCollideWorldBounds(True)
        self.anims.create({
            'key': 'left',
            'frames': self.anims.generateFrameNumbers(DUDE_KEY, {'start': 0, 'end': 3}),
            'frameRate': 10,
            'repeat': -1
        })
        self.anims.create({
            'key': 'turn',
            'frames': [{'key': DUDE_KEY, 'frame': 4}],
            'frameRate': 20
        })
        self.anims.create({
            'key': 'right',
            'frames': self.anims.generateFrameNumbers(DUDE_KEY, {'start': 5, 'end': 8}),
            'frameRate': 10,
            'repeat': -1
        })
        return player

    def create_stars(self):
        stars = self.physics.add.group({
            'key': STAR_KEY,
            'repeat': 11,
            'setXY': {'x': 12, 'y': 0, 'stepX': 70}
        })
        for child in stars.children.entries:
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        return stars

    def collect_star(self, player, star):
        star.disableBody(True, True)
        self.score_label.add(10)
        if self.stars.countActive(True) == 0:
            for child in self.stars.children.entries:
                child.enableBody(True, child.x, 0, True, True)
        self.bomb_spawner.spawn(self.player.x)

    def hit_bomb(self):
        self.physics.pause()
        self.player.setTint(0xff0000)
        self.player.anims.play('turn')
        self.game_over = True

    def update(self):
        if self.game_over:
            return
        if self.cursors.left.isDown:
            self.player.setVelocityX(-160)
            self.player.anims.play('left', True)
        elif self.cursors.right.isDown:
            self.player.setVelocityX(160)
            self.player.anims.play('right', True)
        else:
            self.player.setVelocityX(0)
            self.player.anims.play('turn')
        if self.cursors.up.isDown and self.player.body.touching.down:
            self.player.setVelocityY(-330)


config = {
    'type': Phaser.AUTO,
    'width': 800,
    'height': 600,
    'physics': {
        'default': 'arcade',
        'arcade': {
            'gravity': {'y': 300},
            'debug': False
        }
    },
    'scene': [HelloWorldScene]
}

game = __new__(Phaser.Game(config))
