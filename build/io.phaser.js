// Transcrypt'ed from Python, 2025-06-12 21:11:26
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'io.phaser';
export var Scene =  __class__ ('Scene', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, config) {
		if (typeof config == 'undefined' || (config != null && config.hasOwnProperty ("__kwargtrans__"))) {;
			var config = null;
		};
		if (config === null) {
			self.scene = new Phaser.Scene ();
		}
		else {
			self.scene = new Phaser.Scene (config);
		}
		self.scene.init = self.init;
		self.scene.preload = self.preload;
		self.scene.create = self.create;
		self.scene.update = self.update;
		self.add = self.scene.add;
		self.load = self.scene.load;
		self.physics = self.scene.physics;
		self.anims = self.scene.anims;
		self.input = self.scene.input;
	});},
	get init () {return __get__ (this, function (self) {
		// pass;
	});},
	get preload () {return __get__ (this, function (self) {
		// pass;
	});},
	get create () {return __get__ (this, function (self) {
		// pass;
	});},
	get update () {return __get__ (this, function (self) {
		// pass;
	});}
});
export var Sprite =  __class__ ('Sprite', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.sprite = new Phaser.GameObjects.Sprite (scene, x, y, texture);
		self.destroy = self.sprite.destroy;
	});},
	get move_to () {return __get__ (this, function (self, x, y, depth) {
		if (typeof depth == 'undefined' || (depth != null && depth.hasOwnProperty ("__kwargtrans__"))) {;
			var depth = null;
		};
		self.sprite.x = x;
		self.sprite.y = y;
		if (depth !== null) {
			self.sprite.depth = depth;
		}
	});}
});
export var Text =  __class__ ('Text', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, scene, x, y, text, style) {
		if (typeof style == 'undefined' || (style != null && style.hasOwnProperty ("__kwargtrans__"))) {;
			var style = null;
		};
		self.text = new Phaser.GameObjects.Text (scene, x, y, text, style);
	});},
	get setText () {return __get__ (this, function (self, text) {
		self.text.setText (text);
	});}
});
export var Game =  __class__ ('Game', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, config) {
		if (typeof config == 'undefined' || (config != null && config.hasOwnProperty ("__kwargtrans__"))) {;
			var config = null;
		};
		if (config === null) {
			self.game = new Phaser.Game ();
		}
		else {
			self.game = new Phaser.Game (config);
		}
	});}
});

//# sourceMappingURL=io.phaser.map