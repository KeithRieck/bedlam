// Transcrypt'ed from Python, 2021-05-31 16:48:47
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {GameObject} from './bedlam.js';
import {Scene} from './bedlam.js';
import {Game} from './bedlam.js';
var __name__ = '__main__';
export var MAX_DIM = 10000;
export var ZOOM_LEVEL = 50;
export var SPEED = 1500;
export var A_SPEED = 2.0;
export var STAR_RADIUS = 200;
export var Star =  __class__ ('Star', [GameObject], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game) {
		GameObject.__init__ (self, game);
		self.x = self.rand (-(MAX_DIM), MAX_DIM);
		self.y = self.rand (-(MAX_DIM), MAX_DIM);
		self.z = self.rand (-(MAX_DIM), MAX_DIM);
		self.color = 'rgb({},{},{}'.format (self.rand (127, 255), self.rand (127, 255), self.rand (127, 255));
	});},
	get py_update () {return __get__ (this, function (self, delta_time) {
		var move_dist = Math.max ((SPEED * delta_time) / 1000, 1);
		self.z = self.z - move_dist;
		if (self.z < -(1) * MAX_DIM) {
			self.z = self.z + 2 * MAX_DIM;
		}
	});},
	get draw () {return __get__ (this, function (self, ctx) {
		GameObject.draw (self, ctx);
		var ox = self.game.canvas.width / 2;
		var oy = self.game.canvas.height / 2;
		var sx = (self.x * ZOOM_LEVEL) / self.z;
		var sy = (self.y * ZOOM_LEVEL) / self.z;
		if (self.z <= 0 || sx > ox || sx < -(ox) || sx > oy || sy < -(oy)) {
			return ;
		}
		var radius = (2 * (ZOOM_LEVEL * STAR_RADIUS)) / (ZOOM_LEVEL + self.z);
		ctx.save ();
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = self.color;
		if (radius < 1) {
			ctx.fillRect (sx + ox, sy + oy, 2, 2);
		}
		else {
			ctx.beginPath ();
			ctx.arc (sx + ox, sy + oy, radius, 0, 2 * Math.PI);
			ctx.fill ();
		}
		ctx.restore ();
	});},
	get rand () {return function (min_val, max_val) {
		return Math.round (Math.random () * (max_val - min_val) + min_val);
	};}
});
export var MainScene =  __class__ ('MainScene', [Scene], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, py_name, num_stars) {
		if (typeof num_stars == 'undefined' || (num_stars != null && num_stars.hasOwnProperty ("__kwargtrans__"))) {;
			var num_stars = 100;
		};
		Scene.__init__ (self, game, py_name);
		self.background_color = 'rgb(0,0,0)';
		self.key = null;
		for (var n = 0; n < num_stars; n++) {
			self.append (Star (self.game));
		}
	});},
	get handle_keydown () {return __get__ (this, function (self, event) {
		Scene.handle_keydown (self, event);
		if (event.key == 'a' || event.key == 'ArrowLeft') {
			self.key = 'LEFT';
		}
		else if (event.key == 'd' || event.key == 'ArrowRight') {
			self.key = 'RIGHT';
		}
		else if (event.key == 'w' || event.key == 'ArrowUp') {
			self.key = 'UP';
		}
		else if (event.key == 's' || event.key == 'ArrowDown') {
			self.key = 'DOWN';
		}
	});},
	get py_update () {return __get__ (this, function (self, delta_time) {
		Scene.py_update (self, delta_time);
		if (self.key !== null) {
			var delta_angle = (delta_time / 1000.0) * A_SPEED;
			for (var star of self) {
				if (self.key == 'LEFT') {
					var __left0__ = self.rotate (star.x, star.z, -(delta_angle));
					star.x = __left0__ [0];
					star.z = __left0__ [1];
				}
				else if (self.key == 'RIGHT') {
					var __left0__ = self.rotate (star.x, star.z, delta_angle);
					star.x = __left0__ [0];
					star.z = __left0__ [1];
				}
				else if (self.key == 'UP') {
					var __left0__ = self.rotate (star.y, star.z, -(delta_angle));
					star.y = __left0__ [0];
					star.z = __left0__ [1];
				}
				else if (self.key == 'DOWN') {
					var __left0__ = self.rotate (star.y, star.z, delta_angle);
					star.y = __left0__ [0];
					star.z = __left0__ [1];
				}
			}
		}
		self.key = null;
	});},
	get rotate () {return function (x, y, delta_angle) {
		var angle = Math.atan2 (y, x) + delta_angle;
		var r = Math.sqrt (x * x + y * y);
		return tuple ([r * Math.cos (angle), r * Math.sin (angle)]);
	};}
});
export var MainGame =  __class__ ('MainGame', [Game], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, loop_time) {
		if (typeof loop_time == 'undefined' || (loop_time != null && loop_time.hasOwnProperty ("__kwargtrans__"))) {;
			var loop_time = 20;
		};
		Game.__init__ (self, 'Starfield', loop_time);
		self.append (MainScene (self, 'SCENE', 128));
	});}
});

//# sourceMappingURL=starfield.map