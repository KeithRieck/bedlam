// Transcrypt'ed from Python, 2021-03-09 20:41:03
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {Sprite} from './bedlam.js';
import {Scene} from './bedlam.js';
import {ImageSprite} from './bedlam.js';
import {GameTask} from './bedlam.js';
import {Game} from './bedlam.js';
import {Button} from './bedlam.js';
import {Animation} from './bedlam.js';
var __name__ = '__main__';
export var BallSprite =  __class__ ('BallSprite', [Sprite], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, speed, radius) {
		if (typeof speed == 'undefined' || (speed != null && speed.hasOwnProperty ("__kwargtrans__"))) {;
			var speed = 40;
		};
		if (typeof radius == 'undefined' || (radius != null && radius.hasOwnProperty ("__kwargtrans__"))) {;
			var radius = 10;
		};
		Sprite.__init__ (self, game, radius, radius);
		self.x = self.game.canvas.width * Math.random ();
		self.y = self.game.canvas.height * Math.random ();
		var angle = (2 * Math.PI) * Math.random ();
		self.dx = speed * Math.cos (angle);
		self.dy = speed * Math.sin (angle);
		self.radius = radius;
	});},
	get py_update () {return __get__ (this, function (self, delta_time) {
		self.x = self.x + (self.dx * delta_time) / 1000.0;
		if (self.x < self.radius) {
			self.x = self.radius;
			self.dx = self.dx * -(1.0);
		}
		else if (self.x > self.game.canvas.width - self.radius) {
			self.x = self.game.canvas.width - self.radius;
			self.dx = self.dx * -(1.0);
		}
		self.y = self.y + (self.dy * delta_time) / 1000.0;
		if (self.y < self.radius) {
			self.y = self.radius;
			self.dy = self.dy * -(1.0);
		}
		else if (self.y > self.game.canvas.height - self.radius) {
			self.y = self.game.canvas.height - self.radius;
			self.dy = self.dy * -(1.0);
		}
	});},
	get draw () {return __get__ (this, function (self, ctx) {
		ctx.save ();
		ctx.globalCompositeOperation = 'source-over';
		ctx.lineWidth = 3;
		ctx.beginPath ();
		ctx.arc (self.x, self.y, self.radius, 0, 2 * Math.PI);
		ctx.stroke ();
		ctx.restore ();
	});}
});
export var DukeSprite =  __class__ ('DukeSprite', [ImageSprite], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, speed) {
		if (typeof speed == 'undefined' || (speed != null && speed.hasOwnProperty ("__kwargtrans__"))) {;
			var speed = 20;
		};
		var duke_image = game.load_image ('dukeImage');
		ImageSprite.__init__ (self, game, duke_image, 50, 50);
		self.x = 100;
		self.y = 100;
		var d_angle = (2 * Math.PI) * Math.random ();
		self.dx = speed * Math.cos (d_angle);
		self.dy = speed * Math.sin (d_angle);
		self.angle = 0;
		self.radius = self.width / 2;
		self.originX = self.radius;
		self.originY = self.radius;
		self.game_image.originX = self.originX;
		self.game_image.originY = self.originY;
		self.game_image.angle = self.angle;
	});},
	get _move () {return __get__ (this, function (self, delta_time) {
		self.x = self.x + (self.dx * delta_time) / 1000.0;
		if (self.x < self.radius) {
			self.x = self.radius;
			self.dx = self.dx * -(1.0);
		}
		else if (self.x > self.game.canvas.width - self.radius) {
			self.x = self.game.canvas.width - self.radius;
			self.dx = self.dx * -(1.0);
		}
		self.y = self.y + (self.dy * delta_time) / 1000.0;
		if (self.y < self.radius) {
			self.y = self.radius;
			self.dy = self.dy * -(1.0);
		}
		else if (self.y > self.game.canvas.height - self.radius) {
			self.y = self.game.canvas.height - self.radius;
			self.dy = self.dy * -(1.0);
		}
	});},
	get py_update () {return __get__ (this, function (self, delta_time) {
		ImageSprite.py_update (self, delta_time);
		self.angle = self.angle + 0.4;
		self._move (delta_time);
	});}
});
export var ScrollerSprite =  __class__ ('ScrollerSprite', [DukeSprite], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, animation, speed) {
		if (typeof speed == 'undefined' || (speed != null && speed.hasOwnProperty ("__kwargtrans__"))) {;
			var speed = 20;
		};
		DukeSprite.__init__ (self, game, speed);
		self.width = 60;
		self.height = 60;
		self.radius = self.width / 2;
		animation.originX = self.radius;
		animation.originY = self.radius;
		self.animation = animation;
		self.animation.start ();
	});}
});
export var DemoScene =  __class__ ('DemoScene', [Scene], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, py_name, num_balls) {
		if (typeof num_balls == 'undefined' || (num_balls != null && num_balls.hasOwnProperty ("__kwargtrans__"))) {;
			var num_balls = 8;
		};
		Scene.__init__ (self, game, py_name);
		self.my_sound = game.load_audio ('mySound');
		for (var n = 0; n < num_balls; n++) {
			self.append (BallSprite (self.game, 100, 10));
		}
	});},
	get handle_mousedown () {return __get__ (this, function (self, event) {
		Scene.handle_mousedown (self, event);
	});},
	get ouch () {return __get__ (this, function (self) {
		console.log ('Ouch!!!');
		self.my_sound.play ();
		self.button2.enabled = !(self.button2.enabled);
		console.log ('TEST: button function :');
		var t = 4;
		var ouch_closure = function () {
			console.log (('TEST: closure: ' + t) + ' seconds later ');
		};
		var lambda_task_1 = (function __lambda__ () {
			return console.log ('TEST: lambda, two seconds in the future: ');
		});
		self.schedule (lambda_task_1, 2000);
		self.schedule (self.ouch_func, 3000);
		self.schedule (ouch_closure, 4000);
		self.schedule (OuchTask1 (self.game, self, 5000, 4));
		self.schedule (OuchTask2 (self.game, self, 6000, 2, 'Hello from the ouch function'));
	});},
	get ouch_func () {return __get__ (this, function (self, scene) {
		if (typeof scene == 'undefined' || (scene != null && scene.hasOwnProperty ("__kwargtrans__"))) {;
			var scene = null;
		};
		console.log ('TEST: function, scheduled a few seconds in the future: ' + scene);
	});}
});
export var OuchTask1 =  __class__ ('OuchTask1', [GameTask], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, gameobject, time_delay, repeat_count) {
		if (typeof time_delay == 'undefined' || (time_delay != null && time_delay.hasOwnProperty ("__kwargtrans__"))) {;
			var time_delay = 0;
		};
		if (typeof repeat_count == 'undefined' || (repeat_count != null && repeat_count.hasOwnProperty ("__kwargtrans__"))) {;
			var repeat_count = 0;
		};
		GameTask.__init__ (self, game, gameobject, null, time_delay, repeat_count);
		self.count = 0;
	});},
	get run () {return __get__ (this, function (self) {
		self.count = self.count + 1;
		var new_fill_color = (__mod__ (self.count, 2) == 1 ? 'blue' : 'yellow');
		self.gameobject.button1.fillStyle = new_fill_color;
		console.log ('TEST: simple custom GameTask ' + self.count);
	});}
});
export var OuchTask2 =  __class__ ('OuchTask2', [GameTask], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, gameobject, time_delay, repeat_count, msg) {
		if (typeof time_delay == 'undefined' || (time_delay != null && time_delay.hasOwnProperty ("__kwargtrans__"))) {;
			var time_delay = 0;
		};
		if (typeof repeat_count == 'undefined' || (repeat_count != null && repeat_count.hasOwnProperty ("__kwargtrans__"))) {;
			var repeat_count = 0;
		};
		if (typeof msg == 'undefined' || (msg != null && msg.hasOwnProperty ("__kwargtrans__"))) {;
			var msg = 'HELLO';
		};
		GameTask.__init__ (self, game, gameobject, null, time_delay, repeat_count);
		self.count = 0;
		var run_func = function () {
			self.count = self.count + 1;
			var new_fill_color = (__mod__ (self.count, 2) == 1 ? 'red' : 'white');
			self.gameobject.button2.fillStyle = new_fill_color;
			console.log ((('TEST: custom GameTask with a closure inside, : ' + self.count) + ' : ') + msg);
		};
		self.func = run_func;
	});}
});
export var DemoScene1 =  __class__ ('DemoScene1', [DemoScene], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, py_name, num_balls) {
		if (typeof num_balls == 'undefined' || (num_balls != null && num_balls.hasOwnProperty ("__kwargtrans__"))) {;
			var num_balls = 8;
		};
		DemoScene.__init__ (self, game, py_name, num_balls);
		self.button1 = self.append (Button (self.game, 50, 360, 130, 30, 'Test'));
		self.button1.fillStyle = 'yellow';
		self.button1.textStyle = '#333333';
		self.button1.callback = self.ouch;
		self.button2 = self.append (Button (self.game, 50, 420, 130, 30, 'TEST'));
		self.button2.enabled = false;
	});}
});
export var DemoScene2 =  __class__ ('DemoScene2', [DemoScene], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, py_name, num_balls) {
		if (typeof num_balls == 'undefined' || (num_balls != null && num_balls.hasOwnProperty ("__kwargtrans__"))) {;
			var num_balls = 8;
		};
		DemoScene.__init__ (self, game, py_name, num_balls);
	});},
	get _clear_screen () {return __get__ (this, function (self, ctx) {
		ctx.save ();
		ctx.globalCompositeOperation = 'copy';
		ctx.fillStyle = '#CCCCCC';
		ctx.fillRect (0, 0, self.game.canvas.width, self.game.canvas.height);
		ctx.restore ();
	});}
});
export var DemoScene3 =  __class__ ('DemoScene3', [DemoScene], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, py_name, num_balls) {
		if (typeof num_balls == 'undefined' || (num_balls != null && num_balls.hasOwnProperty ("__kwargtrans__"))) {;
			var num_balls = 8;
		};
		DemoScene.__init__ (self, game, py_name, num_balls);
		var scroller_spritesheet = game.load_spritesheet ('assets/scroller.json', 'scrollerImage');
		var animation = Animation (self.game, scroller_spritesheet.frames ());
		animation.py_name = 'scroller';
		self.append (DukeSprite (self.game, 50));
		self.append (ScrollerSprite (self.game, animation, 50));
		self.background_image = self.game.load_image ('backgroundImage');
		self.background_image.global_composition_operation = 'copy';
	});},
	get _clear_screen () {return __get__ (this, function (self, ctx) {
		DemoScene._clear_screen (self, ctx);
		self.background_image.draw (ctx);
	});}
});
export var BallsGame =  __class__ ('BallsGame', [Game], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, loop_time) {
		if (typeof loop_time == 'undefined' || (loop_time != null && loop_time.hasOwnProperty ("__kwargtrans__"))) {;
			var loop_time = 20;
		};
		Game.__init__ (self, 'Balls', loop_time);
		self.append (DemoScene (self, 'SCENE', 128));
	});}
});
export var BallsGame1 =  __class__ ('BallsGame1', [Game], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, loop_time) {
		if (typeof loop_time == 'undefined' || (loop_time != null && loop_time.hasOwnProperty ("__kwargtrans__"))) {;
			var loop_time = 20;
		};
		Game.__init__ (self, 'Balls', loop_time);
		self.scene1 = DemoScene1 (self, 'SCENE', 8);
		var btn1 = self.scene1.append (Button (self, 50, 300, 130, 30, 'Switch'));
		btn1.callback = self.hey;
		self.append (self.scene1);
		self.scene2 = DemoScene2 (self, 'SCENE2', 64);
		var btn2 = self.scene2.append (Button (self, 200, 300, 130, 30, 'Switch'));
		btn2.callback = self.hey;
		self.append (self.scene2);
		self.scene3 = DemoScene3 (self, 'SCENE3', 16);
		var btn3 = self.scene3.append (Button (self, 350, 300, 130, 30, 'Switch'));
		btn3.callback = self.hey;
		self.append (self.scene3);
		self.currentScene = self.scene1;
	});},
	get hey () {return __get__ (this, function (self) {
		console.log ('Hey!!!');
		self.currentScene = (self.currentScene == self.scene1 ? self.scene2 : (self.currentScene == self.scene2 ? self.scene3 : self.scene1));
	});}
});

//# sourceMappingURL=demo.map