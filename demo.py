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
    """
    This simple Sprite draws a small circle and bounces it across the screen.
    """
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
    """
    This Sprite bounces an image around the screen.
    It also rotates the image as it moves round.
    """
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
    """
    This Sprite bounces an image around the screen.
    It appears to rotate, but it actually cycles through
    different images in a SpriteSheet.
    """
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
    """
    This base Scene is a parent class for all the other demo scenes.
    It also contains the 'ouch' function that demonstrate GameTasks.
    """
    def __init__(self, game, name, num_balls=8):
        Scene.__init__(self, game, name)
        self.my_sound = game.load_audio('mySound')
        for n in range(num_balls):
            self.append(BallSprite(self.game, 100, 10))
    
    def handle_gamepad(self, gp):
        Scene.handle_gamepad(self, gp)
        console.log("Gamepad:")

    def handle_mousedown(self, event):
        Scene.handle_mousedown(self, event)
        # console.log('mousedown: ' + event.mouseX + ',' + event.mouseY)
        # self.button1.label = '' + event.mouseX + ',' + event.mouseY

    def ouch(self):
        """
        This function demonstrates scheduling GameTask objects within this Scene.
        Five different tasks will be scheduled, with delay times spread out over
        several seconds.  The last two tasks are set to repeat multiple times.
        """
        console.log("Ouch!!!")
        self.my_sound.play()
        self.button2.enabled = not self.button2.enabled
        console.log("TEST0: button function :")
        t = 4

        def ouch_closure():
            console.log("TEST1: closure: {} seconds later ".format(t))

        lambda_task_1 = lambda: console.log("TEST2: lambda, two seconds in the future: ")

        self.schedule(lambda_task_1, 2000)
        self.schedule(self.ouch_func, 3000)
        self.schedule(ouch_closure, 4000)
        self.schedule(OuchTask1(self.game, self, 5000, 4))
        self.schedule(OuchTask2(self.game, self, 6000, 2, "Hello from the ouch function"))

    def ouch_func(self, scene=None):
        console.log("TEST3: function, scheduled a few seconds in the future: " + scene)


class OuchTask1(GameTask):
    """
    This task toggles the color of button1 between blue and yellow.
    It is implemented by overriding the 'run' method.
    """
    def __init__(self, game, gameobject, time_delay=0, repeat_count=0):
        GameTask.__init__(self, game, gameobject, None, time_delay, repeat_count)
        self.count = 0

    def run(self):
        self.count = self.count + 1
        new_fill_color = 'blue' if self.count % 2 == 1 else 'yellow'
        self.gameobject.button1.fillStyle = new_fill_color
        console.log("TEST4: simple custom GameTask " + self.count)


class OuchTask2(GameTask):
    """
    This task toggles the color of button2 between red and white.
    It is implemented by assigning the 'func' property to an internal function.
    """
    def __init__(self, game, gameobject, time_delay=0, repeat_count=0, msg="HELLO"):
        GameTask.__init__(self, game, gameobject, None, time_delay, repeat_count)
        self.count = 0

        def run_func():
            self.count = self.count + 1
            new_fill_color = 'red' if self.count % 2 == 1 else 'white'
            self.gameobject.button2.fillStyle = new_fill_color
            console.log("TEST5: custom GameTask with a closure inside, : {}} : {}".format(self.count, msg))

        self.func = run_func


class DemoScene1(DemoScene):
    """
    The first demo scene bounces some BallSprites on a white background.
    It contains some buttons to execute the 'ouch' function for running
    GameTasks.
    """
    def __init__(self, game, name, num_balls=8):
        DemoScene.__init__(self, game, name, num_balls)
        self.button1 = self.append(Button(self.game, 50, 360, 130, 30, 'Test'))
        self.button1.fillStyle = 'yellow'
        self.button1.textStyle = '#333333'
        self.button1.callback = self.ouch
        self.button2 = self.append(Button(self.game, 50, 420, 130, 30, 'TEST'))
        self.button2.enabled = False


class DemoScene2(DemoScene):
    """
    The second demo scene bounces more BallSprites on a gray background.
    """
    def __init__(self, game, name, num_balls=8):
        DemoScene.__init__(self, game, name, num_balls)

    def _clear_screen(self, ctx):
        ctx.save()
        ctx.globalCompositeOperation = 'copy'
        ctx.fillStyle = '#CCCCCC'
        ctx.fillRect(0, 0, self.game.canvas.width, self.game.canvas.height)
        ctx.restore()


class DemoScene3(DemoScene):
    """
    The third demo scene bounces some BallSprites and also a couple 
    of animated ImageSprites.
    """
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


class DemoScene4(DemoScene):
    """
    The fourth scene demonstrates handlers, while also managing
    some bouncing sprites.
    """
    def __init__(self, game, name, num_balls=4):
        DemoScene.__init__(self, game, name, num_balls)
        self.font = '12pt sans-serif'
        self.line_height = 20
        self.mouse_down = False
        self.mouse_x = 0
        self.mouse_y = 0
        self.offsetX = 0
        self.offsetY = 0
        self.clientX = 0
        self.clientY = 0
        self.screenX = 0
        self.screenY = 0
        self.layerX = 0
        self.layerY = 0
        self.win_x = 0
        self.win_y = 0
        self.pageX = 0
        self.pageY = 0
        self.win_left = 0
        self.win_top = 0
        self.win_app = ''
        self.key_down = ' '

    def handle_mouseup(self, event):
        Scene.handle_mouseup(self, event)
        self.mouse_down = False

    def handle_mousedown(self, event):
        Scene.handle_mousedown(self, event)
        self.mouse_down = True

    def handle_mousemove(self, event):
        Scene.handle_mousemove(self, event)
        self.mouse_x = event.mouseX
        self.mouse_y = event.mouseY
        self.offsetX = event.offsetX
        self.offsetY = event.offsetY
        self.clientX = event.clientX
        self.clientY = event.clientY
        self.screenX = event.screenX
        self.screenY = event.screenY
        self.layerX = event.layerX
        self.layerY = event.layerY
        self.pageX = event.pageX
        self.pageY = event.pageY
        self.win_x = event.currentTarget.screenX
        self.win_y = event.currentTarget.screenY
        self.win_left = event.currentTarget.screenLeft
        self.win_top = event.currentTarget.screenTop
        self.win_app = event.currentTarget.navigator.appCodeName
        self.win_app_version = event.currentTarget.navigator.appVersion

    def handle_keydown(self, event):
        Scene.handle_keydown(self, event)
        self.key_down = event.key

    def draw(self, ctx):
        Scene.draw(self, ctx)
        ctx.save()
        ctx.globalCompositeOperation = 'source-over'

        ctx.font = self.font
        ctx.fillStyle = 'black'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2

        lh = self.line_height/2
        ctx.beginPath()
        ctx.moveTo(self.mouse_x - lh, self.mouse_y - lh)
        ctx.lineTo(self.mouse_x + lh, self.mouse_y + lh)
        ctx.moveTo(self.mouse_x + lh, self.mouse_y - lh)
        ctx.lineTo(self.mouse_x - lh, self.mouse_y + lh)
        ctx.closePath()
        ctx.stroke()

        yy = 20

        ctx.fillText('Key down: {}'.format(self.key_down), 20, yy)
        yy = yy + self.line_height

        ctx.fillText('Mouse down: {}'.format(self.mouse_down), 20, yy)
        yy = yy + self.line_height
        yy = yy + self.line_height

        ctx.fillText('Mouse: {}, {}'.format(self.mouse_x, self.mouse_y), 20, yy)
        yy = yy + self.line_height

        ctx.fillText('Offset: {}, {}'.format(self.offsetX, self.offsetY), 20, yy)
        yy = yy + self.line_height

        ctx.fillText('Client: {}, {}'.format(self.clientX, self.clientY), 20, yy)
        yy = yy + self.line_height

        ctx.fillText('Layer: {}, {}'.format(self.layerX, self.layerY), 20, yy)
        yy = yy + self.line_height

        ctx.fillText('Page: {}, {}'.format(self.pageX, self.pageY), 20, yy)
        yy = yy + self.line_height

        ctx.fillText('Screen: {}, {}'.format(self.screenX, self.screenY), 20, yy)
        yy = yy + self.line_height
        yy = yy + self.line_height

        ctx.fillText('Canvas: {}'.format(self.game.canvas.localName), 20, yy)
        yy = yy + self.line_height

        ctx.fillText('width/height: {}, {}'.format(self.game.canvas.width, self.game.canvas.height), 40, yy)
        yy = yy + self.line_height

        ctx.fillText('left/top: {}, {}'.format(self.game.canvas.offsetLeft, self.game.canvas.offsetTop), 40, yy)
        yy = yy + self.line_height
        yy = yy + self.line_height

        ctx.fillText('Window: {}'.format(self.win_app), 20, yy)
        yy = yy + self.line_height

        ctx.fillText('x/y: {}, {}'.format(self.win_x, self.win_y), 40, yy)
        yy = yy + self.line_height

        ctx.fillText('left/top: {}, {}'.format(self.win_left, self.win_top), 40, yy)
        yy = yy + self.line_height
        yy = yy + self.line_height

        ctx.fillText(self.win_app_version, 20, yy)
        yy = yy + self.line_height
        yy = yy + self.line_height
        
        gp = self.game.get_gamepad()
        if gp is not None:
            msg = 'Gamepad: {} : '.format(gp.id)
            for i in range(len(gp.buttons)):
                if self.is_button_pressed(gp, i):
                    msg = msg + i + " "
            ctx.fillText(msg, 20, yy)
            yy = yy + self.line_height
            yy = yy + self.line_height

        ctx.lineWidth = 1
        ctx.strokeStyle = 'blue'
        ctx.rect(0, 0, self.game.canvas.width, self.game.canvas.height)
        ctx.stroke()
        ctx.strokeStyle = 'green'
        ctx.beginPath()
        ctx.moveTo(300, 300 - lh)
        ctx.lineTo(300, 300 + lh)
        ctx.moveTo(300 - lh, 300)
        ctx.lineTo(300 + lh, 300)
        ctx.closePath()
        ctx.stroke()

        ctx.restore()


class DemoGame(Game):
    """
    This is the parent Game class.  It manages all the Scenes.
    Every game contains one Game object and one or more Scenes.
    """
    def __init__(self, loop_time=20):
        Game.__init__(self, 'Balls', loop_time)

        self.scene1 = DemoScene1(self, 'SCENE', 8)
        btn1 = self.scene1.append(Button(self, 50, 300, 130, 30, 'Switch'))
        btn1.callback = self.switch_scene
        self.append(self.scene1)

        self.scene2 = DemoScene2(self, 'SCENE2', 64)
        btn2 = self.scene2.append(Button(self, 200, 300, 130, 30, 'Switch'))
        btn2.callback = self.switch_scene
        self.append(self.scene2)

        self.scene3 = DemoScene3(self, 'SCENE3', 16)
        btn3 = self.scene3.append(Button(self, 350, 300, 130, 30, 'Switch'))
        btn3.callback = self.switch_scene
        self.append(self.scene3)

        self.scene4 = DemoScene4(self, 'SCENE4')
        btn4 = self.scene4.append(Button(self, 500, 300, 130, 30, 'Switch'))
        btn4.callback = self.switch_scene
        self.append(self.scene4)

        self.currentScene = self.scene1

    def switch_scene(self):
        console.log("Switch!!!")
        self.currentScene = self.scene2 if self.currentScene == self.scene1 else \
            (self.scene3 if self.currentScene == self.scene2 else
             (self.scene4 if self.currentScene == self.scene3 else self.scene1))
