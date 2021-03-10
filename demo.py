from bedlam import Animation
from bedlam import Button
from bedlam import Game
from bedlam import GameTask
from bedlam import ImageSprite
from bedlam import Scene
from bedlam import Sprite

# __pragma__('skip')
document = window = Math = Date = console = 0  # Prevent complaints by optional static checker


# __pragma__('noskip')
# __pragma__('noalias', 'clear')


class BallSprite(Sprite):

    def __init__(self, game, speed=40, radius=10):
        Sprite.__init__(self, game, radius, radius)
        self.x = self.game.canvas.width * Math.random()
        self.y = self.game.canvas.height * Math.random()
        angle = 2 * Math.PI * Math.random()
        self.dx = speed * Math.cos(angle)
        self.dy = speed * Math.sin(angle)
        self.radius = radius

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
        ctx.save()
        ctx.globalCompositeOperation = 'source-over'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.restore()


class DukeSprite(ImageSprite):
    def __init__(self, game, speed=20):
        duke_image = game.load_image('dukeImage')
        ImageSprite.__init__(self, game, duke_image, 50, 50)
        self.x = 100
        self.y = 100
        d_angle = 2 * Math.PI * Math.random()
        self.dx = speed * Math.cos(d_angle)
        self.dy = speed * Math.sin(d_angle)
        self.angle = 0
        self.radius = self.width / 2
        self.originX = self.radius
        self.originY = self.radius
        self.game_image.originX = self.originX
        self.game_image.originY = self.originY
        self.game_image.angle = self.angle

    def _move(self, delta_time):
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

    def update(self, delta_time):
        ImageSprite.update(self, delta_time)
        self.angle = self.angle + 0.4
        self._move(delta_time)


class ScrollerSprite(DukeSprite):
    def __init__(self, game, animation, speed=20):
        DukeSprite.__init__(self, game, speed)
        self.width = 60
        self.height = 60
        self.radius = self.width / 2
        animation.originX = self.radius
        animation.originY = self.radius
        self.animation = animation
        self.animation.start()


class DemoScene(Scene):
    def __init__(self, game, name, num_balls=8):
        Scene.__init__(self, game, name)
        self.my_sound = game.load_audio('mySound')
        for n in range(num_balls):
            self.append(BallSprite(self.game, 100, 10))

    def handle_mousedown(self, event):
        Scene.handle_mousedown(self, event)
        # console.log('mousedown: ' + event.x + ',' + event.y)
        # self.button1.label = '' + event.x + ',' + event.y

    def ouch(self):
        console.log("Ouch!!!")
        self.my_sound.play()
        self.button2.enabled = not self.button2.enabled
        console.log("TEST: button function :")
        t = 4
        def ouch_closure():
            console.log("TEST: closure: " + t + " seconds later ")
        lambda_task_1 = lambda: console.log("TEST: lambda, two seconds in the future: ")
        self.schedule(lambda_task_1, 2000)
        self.schedule(self.ouch_func, 3000)
        self.schedule(ouch_closure, 4000)
        self.schedule(OuchTask1(self.game, self, 5000, 4))
        self.schedule(OuchTask2(self.game, self, 6000, 2, "Hello from the ouch function"))

    def ouch_func(self, scene=None):
        console.log("TEST: function, scheduled a few seconds in the future: " + scene)


class OuchTask1(GameTask):
    def __init__(self, game, gameobject, time_delay=0, repeat_count=0):
        GameTask.__init__(self, game, gameobject, None, time_delay, repeat_count)
        self.count = 0

    def run(self):
        self.count = self.count + 1
        new_fill_color = 'blue' if self.count % 2 == 1 else 'yellow'
        self.gameobject.button1.fillStyle = new_fill_color
        console.log("TEST: simple custom GameTask " + self.count)


class OuchTask2(GameTask):
    def __init__(self, game, gameobject, time_delay=0, repeat_count=0, msg="HELLO"):
        GameTask.__init__(self, game, gameobject, None, time_delay, repeat_count)
        self.count = 0
        def run_func():
            self.count = self.count + 1
            new_fill_color = 'red' if self.count % 2 == 1 else 'white'
            self.gameobject.button2.fillStyle = new_fill_color
            console.log("TEST: custom GameTask with a closure inside, : " + self.count + " : " + msg)
        self.func = run_func


class DemoScene1(DemoScene):
    def __init__(self, game, name, num_balls=8):
        DemoScene.__init__(self, game, name, num_balls)
        self.button1 = self.append(Button(self.game, 50, 360, 130, 30, 'Test'))
        self.button1.fillStyle = 'yellow'
        self.button1.textStyle = '#333333'
        self.button1.callback = self.ouch
        self.button2 = self.append(Button(self.game, 50, 420, 130, 30, 'TEST'))
        self.button2.enabled = False


class DemoScene2(DemoScene):
    def __init__(self, game, name, num_balls=8):
        DemoScene.__init__(self, game, name, num_balls)

    def _clear_screen(self, ctx):
        ctx.save()
        ctx.globalCompositeOperation = 'copy'
        ctx.fillStyle = '#CCCCCC'
        ctx.fillRect(0, 0, self.game.canvas.width, self.game.canvas.height)
        ctx.restore()


class DemoScene3(DemoScene):
    def __init__(self, game, name, num_balls=8):
        DemoScene.__init__(self, game, name, num_balls)
        scroller_spritesheet = game.load_spritesheet('assets/scroller.json', 'scrollerImage')
        animation = Animation(self.game, scroller_spritesheet.frames())
        animation.name = 'scroller'
        self.append(DukeSprite(self.game, 50))
        self.append(ScrollerSprite(self.game, animation, 50))
        self.background_image = self.game.load_image('backgroundImage')
        self.background_image.global_composition_operation = 'copy'

    def _clear_screen(self, ctx):
        DemoScene._clear_screen(self, ctx)
        self.background_image.draw(ctx)


class BallsGame(Game):
    def __init__(self, loop_time=20):
        Game.__init__(self, 'Balls', loop_time)
        self.append(DemoScene(self, 'SCENE', 128))


class BallsGame1(Game):
    def __init__(self, loop_time=20):
        Game.__init__(self, 'Balls', loop_time)

        self.scene1 = DemoScene1(self, 'SCENE', 8)
        btn1 = self.scene1.append(Button(self, 50, 300, 130, 30, 'Switch'))
        btn1.callback = self.hey
        self.append(self.scene1)

        self.scene2 = DemoScene2(self, 'SCENE2', 64)
        btn2 = self.scene2.append(Button(self, 200, 300, 130, 30, 'Switch'))
        btn2.callback = self.hey
        self.append(self.scene2)

        self.scene3 = DemoScene3(self, 'SCENE3', 16)
        btn3 = self.scene3.append(Button(self, 350, 300, 130, 30, 'Switch'))
        btn3.callback = self.hey
        self.append(self.scene3)

        self.currentScene = self.scene1

    def hey(self):
        console.log("Hey!!!")
        self.currentScene = self.scene2 if self.currentScene == self.scene1 else \
            (self.scene3 if self.currentScene == self.scene2 else self.scene1)
