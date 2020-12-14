from bedlam import Game
from bedlam import Scene
from bedlam import Sprite

# __pragma__('skip')
document = window = Math = Date = console = 0  # Prevent complaints by optional static checker


# __pragma__('noskip')
# __pragma__('noalias', 'clear')


class Ball(Sprite):

    def __init__(self, game, speed=40, radius=10, color='black'):
        Sprite.__init__(self, game, radius, radius)
        self.x = self.game.canvas.width * Math.random()
        self.y = self.game.canvas.height * Math.random()
        angle = 2 * Math.PI * Math.random()
        self.dx = speed * Math.cos(angle)
        self.dy = speed * Math.sin(angle)
        self.radius = radius
        self.color = color

    def update(self, delta_time):
        self.x = self.x + self.dx * delta_time / 1000.0
        if self.x < self.radius:
            self.x = self.radius
            self.dx = self.dx * -1.0
        elif self.x > self.game.canvas.width - self.radius:
            self.x = self.game.canvas.width - self.radius
            self.dx = self.dx * -1.0
        self.y = self.y + self.dy * delta_time / 1000.0
        if self.y < self.radius:
            self.y = self.radius
            self.dy = self.dy * -1.0
        elif self.y > self.game.canvas.height - self.radius:
            self.y = self.game.canvas.height - self.radius
            self.dy = self.dy * -1.0

    def draw(self, ctx):
        Sprite.draw(self, ctx)
        ctx.save()
        ctx.globalCompositeOperation = 'source-over'
        ctx.strokeStyle = self.color
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.restore()


class MainScene(Scene):
    def __init__(self, game, name, num_balls=8):
        Scene.__init__(self, game, name)
        for n in range(num_balls):
            self.append(Ball(self.game, 100, 10))


class BallsGame(Game):
    def __init__(self, loop_time=20):
        Game.__init__(self, 'Balls', loop_time)
        self.append(MainScene(self, 'SCENE', 128))
