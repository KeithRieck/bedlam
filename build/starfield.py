from bedlam import Game
from bedlam import Scene
from bedlam import GameObject

# __pragma__('skip')
document = window = Math = Date = console = 0  # Prevent complaints by optional static checker

# __pragma__('noskip')
# __pragma__('noalias', 'clear')


MAX_DIM = 10000
ZOOM_LEVEL = 50
SPEED = 1500
A_SPEED = 2.0
STAR_RADIUS = 200


class Star(GameObject):

    def __init__(self, game):
        GameObject.__init__(self, game)
        self.x = self.rand(-MAX_DIM, MAX_DIM)
        self.y = self.rand(-MAX_DIM, MAX_DIM)
        self.z = self.rand(-MAX_DIM, MAX_DIM)
        self.color = "rgb({},{},{}".format(self.rand(127, 255), self.rand(127, 255), self.rand(127, 255))

    def update(self, delta_time):
        move_dist = Math.max(SPEED * delta_time / 1000, 1)
        self.z = self.z - move_dist
        if self.z < (-1 * MAX_DIM):
            self.z = self.z + (2 * MAX_DIM)

    def draw(self, ctx):
        GameObject.draw(self, ctx)
        ox = self.game.canvas.width / 2
        oy = self.game.canvas.height / 2
        sx = self.x * ZOOM_LEVEL / self.z
        sy = self.y * ZOOM_LEVEL / self.z
        if self.z <= 0 or sx > ox or sx < -ox or sx > oy or sy < -oy:
            return
        radius = 2 * (ZOOM_LEVEL * STAR_RADIUS) / (ZOOM_LEVEL + self.z)
        ctx.save()
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = self.color
        if radius < 1:
            ctx.fillRect(sx + ox, sy + oy, 2, 2)
        else:
            ctx.beginPath()
            ctx.arc(sx + ox, sy + oy, radius, 0, 2 * Math.PI)
            ctx.fill()
        ctx.restore()

    @staticmethod
    def rand(min_val, max_val):
        return Math.round(Math.random() * (max_val - min_val) + min_val)


class MainScene(Scene):
    def __init__(self, game, name, num_stars=100):
        Scene.__init__(self, game, name)
        self.background_color = "rgb(0,0,0)"
        self.key = None
        for n in range(num_stars):
            self.append(Star(self.game))

    def handle_keydown(self, event):
        Scene.handle_keydown(self, event)
        if event.key == 'a' or event.key == 'ArrowLeft':
            self.key = 'LEFT'
        elif event.key == 'd' or event.key == 'ArrowRight':
            self.key = 'RIGHT'
        elif event.key == 'w' or event.key == 'ArrowUp':
            self.key = 'UP'
        elif event.key == 's' or event.key == 'ArrowDown':
            self.key = 'DOWN'

    def update(self, delta_time: float):
        Scene.update(self, delta_time)
        if self.key is not None:
            delta_angle = (delta_time / 1000.0) * A_SPEED
            for star in self:
                if self.key == 'LEFT':
                    star.x, star.z = self.rotate(star.x, star.z, -delta_angle)
                elif self.key == 'RIGHT':
                    star.x, star.z = self.rotate(star.x, star.z, delta_angle)
                elif self.key == 'UP':
                    star.y, star.z = self.rotate(star.y, star.z, -delta_angle)
                elif self.key == 'DOWN':
                    star.y, star.z = self.rotate(star.y, star.z, delta_angle)
        self.key = None

    @staticmethod
    def rotate(x, y, delta_angle):
        angle = Math.atan2(y, x) + delta_angle
        r = Math.sqrt(x * x + y * y)
        return r * Math.cos(angle), r * Math.sin(angle)


class MainGame(Game):
    def __init__(self, loop_time=20):
        Game.__init__(self, 'Starfield', loop_time)
        self.append(MainScene(self, 'SCENE', 128))
