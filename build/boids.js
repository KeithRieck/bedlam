// Transcrypt'ed from Python, 2020-12-13 18:02:24
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {Ball} from './balls.js';
import {Sprite} from './bedlam.js';
import {Scene} from './bedlam.js';
import {Game} from './bedlam.js';
var __name__ = '__main__';
export var DEBUG = false;
export var PVector =  __class__ ('PVector', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, xx, yy) {
		if (typeof xx == 'undefined' || (xx != null && xx.hasOwnProperty ("__kwargtrans__"))) {;
			var xx = 0;
		};
		if (typeof yy == 'undefined' || (yy != null && yy.hasOwnProperty ("__kwargtrans__"))) {;
			var yy = 0;
		};
		self.x = xx;
		self.y = yy;
	});},
	get __str__ () {return __get__ (this, function (self) {
		return 'PVector({},{})'.format (self.x, self.y);
	});},
	get reset () {return __get__ (this, function (self, xx, yy) {
		self.x = xx;
		self.y = yy;
		return self;
	});},
	get copy () {return __get__ (this, function (self) {
		return PVector.Instance (self.x, self.y);
	});},
	get add () {return __get__ (this, function (self, v) {
		self.x = self.x + v.x;
		self.y = self.y + v.y;
		return self;
	});},
	get sub () {return __get__ (this, function (self, v) {
		self.x = self.x - v.x;
		self.y = self.y - v.y;
		return self;
	});},
	get mult () {return __get__ (this, function (self, mag) {
		self.x = self.x * mag;
		self.y = self.y * mag;
		return self;
	});},
	get div () {return __get__ (this, function (self, mag) {
		self.x = self.x / mag;
		self.y = self.y / mag;
		return self;
	});},
	get normalize () {return __get__ (this, function (self, mag) {
		if (typeof mag == 'undefined' || (mag != null && mag.hasOwnProperty ("__kwargtrans__"))) {;
			var mag = 1.0;
		};
		var d = Math.sqrt (self.x * self.x + self.y * self.y);
		if (d == 0 || mag == 0) {
			self.x = 0;
			self.y = 0;
		}
		else {
			self.x = (mag * self.x) / d;
			self.y = (mag * self.y) / d;
		}
		return self;
	});},
	get limit () {return __get__ (this, function (self, mag) {
		var d = Math.sqrt (self.x * self.x + self.y * self.y);
		if (d == 0 || mag == 0) {
			return ;
		}
		if (d > mag) {
			self.x = (mag * self.x) / d;
			self.y = (mag * self.y) / d;
		}
		return self;
	});},
	get mag () {return __get__ (this, function (self) {
		return Math.sqrt (self.x * self.x + self.y * self.y);
	});},
	get Instance () {return __getcm__ (this, function (cls, xx, yy) {
		if (cls.pool === null) {
			cls.pool = [];
			cls.pool_max_size = 10;
		}
		if (len (cls.pool) == 0) {
			return PVector (xx, yy);
		}
		else {
			var v = cls.pool.py_pop ();
			v.x = xx;
			v.y = yy;
			return v;
		}
	});},
	get Free () {return __getcm__ (this, function (cls, pvector) {
		if (len (cls.pool) < cls.pool_max_size) {
			cls.pool.append;
		}
	});}
});
export var Boid =  __class__ ('Boid', [Sprite], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, w) {
		if (typeof w == 'undefined' || (w != null && w.hasOwnProperty ("__kwargtrans__"))) {;
			var w = 10;
		};
		Sprite.__init__ (self, game, w, w);
		self.color = 'white';
		self.x = self.game.canvas.width * Math.random ();
		self.y = self.game.canvas.height * Math.random ();
		var angle = (2 * Math.PI) * Math.random ();
		self.dx = self.game.speed * Math.cos (angle);
		self.dy = self.game.speed * Math.sin (angle);
	});},
	get is_close () {return __get__ (this, function (self, sprite, dist) {
		return (self.distance (sprite) + self.width / 2) + sprite.width / 2 <= dist;
	});},
	get distance () {return __get__ (this, function (self, sprite) {
		var vx = self.x - sprite.x;
		var vy = self.y - sprite.y;
		var self_radius = (self.width + self.height) / 2;
		var sprite_radius = (sprite.width + sprite.height) / 2;
		var dist = Math.sqrt (vx * vx + vy * vy) - (self_radius + sprite_radius);
		return (dist >= 0 ? dist : 0);
	});},
	get draw () {return __get__ (this, function (self, ctx) {
		Sprite.draw (self, ctx);
		var angle = self._angle ();
		ctx.save ();
		ctx.globalCompositeOperation = 'source-over';
		if (DEBUG) {
			ctx.strokeStyle = '#808080';
			ctx.beginPath ();
			ctx.arc (self.x, self.y, self.game.cohesion_radius, 0, 2 * Math.PI);
			ctx.stroke ();
			ctx.strokeStyle = '#696969';
			ctx.beginPath ();
			ctx.arc (self.x, self.y, self.game.separation_radius + self.width / 2, 0, 2 * Math.PI);
			ctx.stroke ();
		}
		ctx.lineWidth = 2;
		ctx.strokeStyle = self.color;
		ctx.fillStyle = self.color;
		ctx.beginPath ();
		ctx.translate (self.x, self.y);
		ctx.rotate (angle);
		ctx.moveTo (-(1) * self.width, -(0.5) * self.width);
		ctx.lineTo (self.width, 0);
		ctx.lineTo (-(1) * self.width, 0.5 * self.width);
		ctx.lineTo (-(1) * self.width, -(0.5) * self.width);
		ctx.translate (-(1) * self.originX, -(1) * self.originY);
		ctx.fill ();
		ctx.stroke ();
		ctx.restore ();
	});},
	get _angle () {return __get__ (this, function (self, a) {
		if (typeof a == 'undefined' || (a != null && a.hasOwnProperty ("__kwargtrans__"))) {;
			var a = 0.0;
		};
		var angle = Math.atan2 (self.dy, self.dx) + a;
		while (angle > 2 * Math.PI) {
			var angle = angle - 2 * Math.PI;
		}
		while (angle < 0) {
			var angle = angle + 2 * Math.PI;
		}
		return angle;
	});},
	get _find () {return __get__ (this, function (self, boid, dist, clazz) {
		if (typeof clazz == 'undefined' || (clazz != null && clazz.hasOwnProperty ("__kwargtrans__"))) {;
			var clazz = null;
		};
		return self.game.currentScene.find (boid, dist, clazz);
	});},
	get py_update () {return __get__ (this, function (self, delta_time) {
		var move = PVector.Instance (self.dx, self.dy);
		var allignment = self.__calc_allignment ().mult (self.game.allignment_mult);
		var separation = self.__calc_separation ().mult (self.game.separation_mult);
		var cohesion = self.__calc_cohesion ().mult (self.game.cohesion_mult);
		var noise = self.__calc_random_noise ().mult (self.game.noise_mult);
		if (DEBUG) {
			console.log ('time={} : allign={} : avoid={} : noise={} : cohese={}'.format (delta_time, allignment.mag (), separation.mag (), noise.mag (), cohesion.mag ()));
		}
		move.add (allignment);
		move.add (separation);
		move.add (cohesion);
		move.add (noise);
		move.limit (self.game.speed);
		self.dx = move.x;
		self.dy = move.y;
		self.x = self.x + (self.dx * delta_time) / 1000.0;
		if (self.x < 0) {
			self.x = self.x + self.game.canvas.width;
		}
		else if (self.x > self.game.canvas.width) {
			self.x = self.x - self.game.canvas.width;
		}
		self.y = self.y + (self.dy * delta_time) / 1000.0;
		if (self.y < 0) {
			self.y = self.y + self.game.canvas.height;
		}
		else if (self.y > self.game.canvas.height) {
			self.y = self.y - self.game.canvas.height;
		}
		PVector.Free (move);
		PVector.Free (allignment);
		PVector.Free (separation);
		PVector.Free (noise);
	});},
	get __calc_allignment () {return __get__ (this, function (self) {
		var steer = PVector.Instance (0, 0);
		for (var sprite of self._find (self, self.game.allignment_radius, Boid)) {
			var d = self.distance (sprite);
			if (d == 0) {
				continue;
			}
			var copy = PVector.Instance (sprite.dx, sprite.dy);
			copy.normalize ();
			copy.div (d);
			steer.add (copy);
		}
		return steer;
	});},
	get __calc_separation () {return __get__ (this, function (self) {
		var steer = PVector.Instance (0, 0);
		for (var sprite of self._find (self, self.game.separation_radius, Sprite)) {
			var d = self.distance (sprite);
			if (d == 0) {
				continue;
			}
			var diff = PVector (self.x - sprite.x, self.y - sprite.y);
			diff.normalize ();
			diff.div (d);
			steer.add (diff);
		}
		return steer;
	});},
	get __calc_random_noise () {return __get__ (this, function (self) {
		return PVector.Instance (Math.random () * 2 - 1, Math.random () * 2 - 1);
	});},
	get __calc_cohesion () {return __get__ (this, function (self) {
		var steer = PVector.Instance (0, 0);
		var count = 0;
		for (var sprite of self._find (self, self.game.cohesion_radius, Boid)) {
			steer.x = steer.x + sprite.x;
			steer.y = steer.y + sprite.y;
			var count = count + 1;
		}
		if (count > 0) {
			steer.x = steer.x / count;
			steer.y = steer.y / count;
			steer.normalize (0.05);
		}
		return steer;
	});}
});
export var BoidsScene =  __class__ ('BoidsScene', [Scene], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, py_name, num_boids, w) {
		if (typeof py_name == 'undefined' || (py_name != null && py_name.hasOwnProperty ("__kwargtrans__"))) {;
			var py_name = null;
		};
		if (typeof num_boids == 'undefined' || (num_boids != null && num_boids.hasOwnProperty ("__kwargtrans__"))) {;
			var num_boids = 8;
		};
		if (typeof w == 'undefined' || (w != null && w.hasOwnProperty ("__kwargtrans__"))) {;
			var w = 10;
		};
		Scene.__init__ (self, game, py_name);
		self.color = 'black';
		for (var n = 0; n < num_boids; n++) {
			self.append (Boid (self.game, w));
		}
		for (var n = 0; n < 3; n++) {
			self.append (Ball (self.game, 30, 10, 'green'));
		}
		for (var n = 0; n < 1; n++) {
			self.append (Ball (self.game, 30, 20, 'red'));
		}
	});},
	get _clear_screen () {return __get__ (this, function (self, ctx) {
		ctx.save ();
		ctx.globalCompositeOperation = 'copy';
		ctx.fillStyle = self.color;
		ctx.fillRect (0, 0, self.game.canvas.width, self.game.canvas.height);
		ctx.restore ();
	});},
	get find () {return __get__ (this, function (self, boid, dist, clazz) {
		if (typeof clazz == 'undefined' || (clazz != null && clazz.hasOwnProperty ("__kwargtrans__"))) {;
			var clazz = null;
		};
		var sprite_list = [];
		for (var sprite of self) {
			if (clazz !== null && !(isinstance (sprite, clazz))) {
				continue;
			}
			if (sprite == boid) {
				continue;
			}
			if (boid.is_close (sprite, dist)) {
				sprite_list.append (sprite);
			}
		}
		return sprite_list;
	});}
});
export var BoidsGame =  __class__ ('BoidsGame', [Game], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, py_name, loop_time) {
		if (typeof py_name == 'undefined' || (py_name != null && py_name.hasOwnProperty ("__kwargtrans__"))) {;
			var py_name = 'Boids';
		};
		if (typeof loop_time == 'undefined' || (loop_time != null && loop_time.hasOwnProperty ("__kwargtrans__"))) {;
			var loop_time = 20;
		};
		Game.__init__ (self, py_name, loop_time);
		var sprite_width = 5;
		var global_scale = sprite_width / 10.0;
		self.speed = 100;
		self.allignment_radius = 180 * global_scale;
		self.separation_radius = 25 * global_scale;
		self.cohesion_radius = self.allignment_radius;
		self.allignment_mult = 3;
		self.separation_mult = 30;
		self.cohesion_mult = 25;
		self.noise_mult = 5;
		self.append (BoidsScene (self, 'BOIDS', 32, sprite_width));
	});},
	get set_debug () {return function (b) {
		if (b !== null && b == 'true') {
			DEBUG = true;
		}
	};}
});

//# sourceMappingURL=boids.map