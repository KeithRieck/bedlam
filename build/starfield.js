// Transcrypt'ed from Python, 2021-05-30 18:23:58
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {GameObject} from './bedlam.js';
import {Scene} from './bedlam.js';
import {Game} from './bedlam.js';
var __name__ = '__main__';
export var MAX_DIM = 10000;
export var ZOOM_LEVEL = 10;
export var SPEED = 500;
export var STAR_RADIUS = 200;
export var Star =  __class__ ('Star', [GameObject], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game) {
		GameObject.__init__ (self, game);
		self.x = Math.round ((Math.random () * 2) * MAX_DIM - MAX_DIM);
		self.y = Math.round ((Math.random () * 2) * MAX_DIM - MAX_DIM);
		self.z = Math.round ((Math.random () * 2) * MAX_DIM - MAX_DIM);
		var red = Math.round (Math.random () * 128 + 127);
		var green = Math.round (Math.random () * 128 + 127);
		var blue = Math.round (Math.random () * 128 + 127);
		self.color = 'rgb({},{},{}'.format (red, green, blue);
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
		if (self.z <= 0) {
			return ;
		}
		var ox = self.game.canvas.width / 2;
		var oy = self.game.canvas.height / 2;
		var sx = (self.x * ZOOM_LEVEL) / self.z;
		if (sx > ox || sx < -(1) * ox) {
			return ;
		}
		var sy = (self.y * ZOOM_LEVEL) / self.z;
		if (sx > oy || sy < -(1) * oy) {
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
	});}
});
export var MainScene =  __class__ ('MainScene', [Scene], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, py_name, num_stars) {
		if (typeof num_stars == 'undefined' || (num_stars != null && num_stars.hasOwnProperty ("__kwargtrans__"))) {;
			var num_stars = 100;
		};
		Scene.__init__ (self, game, py_name);
		self.background_color = 'rgb(0,0,0)';
		for (var n = 0; n < num_stars; n++) {
			self.append (Star (self.game));
		}
	});}
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