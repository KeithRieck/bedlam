// Transcrypt'ed from Python, 2021-05-30 18:23:54
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {Sprite} from './bedlam.js';
import {Scene} from './bedlam.js';
import {Game} from './bedlam.js';
var __name__ = 'balls';
export var Ball =  __class__ ('Ball', [Sprite], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, speed, radius, color) {
		if (typeof speed == 'undefined' || (speed != null && speed.hasOwnProperty ("__kwargtrans__"))) {;
			var speed = 40;
		};
		if (typeof radius == 'undefined' || (radius != null && radius.hasOwnProperty ("__kwargtrans__"))) {;
			var radius = 10;
		};
		if (typeof color == 'undefined' || (color != null && color.hasOwnProperty ("__kwargtrans__"))) {;
			var color = 'black';
		};
		Sprite.__init__ (self, game, radius, radius);
		self.x = self.game.canvas.width * Math.random ();
		self.y = self.game.canvas.height * Math.random ();
		var angle = (2 * Math.PI) * Math.random ();
		self.dx = speed * Math.cos (angle);
		self.dy = speed * Math.sin (angle);
		self.radius = radius;
		self.color = color;
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
		Sprite.draw (self, ctx);
		ctx.save ();
		ctx.globalCompositeOperation = 'source-over';
		ctx.strokeStyle = self.color;
		ctx.lineWidth = 3;
		ctx.beginPath ();
		ctx.arc (self.x, self.y, self.radius, 0, 2 * Math.PI);
		ctx.stroke ();
		ctx.restore ();
	});}
});
export var MainScene =  __class__ ('MainScene', [Scene], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, py_name, num_balls) {
		if (typeof num_balls == 'undefined' || (num_balls != null && num_balls.hasOwnProperty ("__kwargtrans__"))) {;
			var num_balls = 8;
		};
		Scene.__init__ (self, game, py_name);
		for (var n = 0; n < num_balls; n++) {
			self.append (Ball (self.game, 100, 10));
		}
	});}
});
export var BallsGame =  __class__ ('BallsGame', [Game], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, loop_time) {
		if (typeof loop_time == 'undefined' || (loop_time != null && loop_time.hasOwnProperty ("__kwargtrans__"))) {;
			var loop_time = 20;
		};
		Game.__init__ (self, 'Balls', loop_time);
		self.append (MainScene (self, 'SCENE', 128));
	});}
});

//# sourceMappingURL=balls.map