from bedlam import Game
from bedlam import Scene
from bedlam import GameObject

# __pragma__('skip')
document = window = Math = Date = console = 0  # Prevent complaints by optional static checker

# __pragma__('noskip')
# __pragma__('noalias', 'clear')


MAX_DIM = 10000
ZOOM_LEVEL = 10
SPEED = 500
STAR_RADIUS = 200


class Star(GameObject):

    def __init__(self, game):
        GameObject.__init__(self, game)
        self.x = Math.round((Math.random() * 2 * MAX_DIM) - MAX_DIM)
        self.y = Math.round((Math.random() * 2 * MAX_DIM) - MAX_DIM)
        self.z = Math.round((Math.random() * 2 * MAX_DIM) - MAX_DIM)
        red = Math.round(Math.random() * 128 + 127)
        green = Math.round(Math.random() * 128 + 127)
        blue = Math.round(Math.random() * 128 + 127)
        self.color = "rgb({},{},{}".format(red, green, blue)

    def update(self, delta_time):
        move_dist = Math.max(SPEED * delta_time / 1000, 1)
        self.z = self.z - move_dist
        if self.z < (-1 * MAX_DIM):
            self.z = self.z + (2 * MAX_DIM)

    def draw(self, ctx):
        GameObject.draw(self, ctx)
        if self.z <= 0:
            return
        ox = self.game.canvas.width / 2
        oy = self.game.canvas.height / 2
        sx = self.x * ZOOM_LEVEL / self.z
        if sx > ox or sx < (-1 * ox):
            return
        sy = self.y * ZOOM_LEVEL / self.z
        if sx > oy or sy < (-1 * oy):
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


class MainScene(Scene):
    def __init__(self, game, name, num_stars=100):
        Scene.__init__(self, game, name)
        self.background_color = "rgb(0,0,0)"
        for n in range(num_stars):
            self.append(Star(self.game))


class MainGame(Game):
    def __init__(self, loop_time=20):
        Game.__init__(self, 'Starfield', loop_time)
        self.append(MainScene(self, 'SCENE', 128))
