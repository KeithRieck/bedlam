// Transcrypt'ed from Python, 2020-07-03 14:27:14
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as phaser from './io.phaser.js';
var __name__ = '__main__';
export var GROUND_KEY = 'ground';
export var DUDE_KEY = 'dude';
export var STAR_KEY = 'star';
export var SKY_KEY = 'sky';
export var BOMB_KEY = 'bomb';
export var ScoreLabel =  __class__ ('ScoreLabel', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, scene, x, y, score) {
		if (typeof x == 'undefined' || (x != null && x.hasOwnProperty ("__kwargtrans__"))) {;
			var x = 16;
		};
		if (typeof y == 'undefined' || (y != null && y.hasOwnProperty ("__kwargtrans__"))) {;
			var y = 16;
		};
		if (typeof score == 'undefined' || (score != null && score.hasOwnProperty ("__kwargtrans__"))) {;
			var score = 0;
		};
		self.scene = scene;
		self.text = self.scene.add.text (x, y, '', dict ({'fontSize': '32px', 'fill': '#000'}));
		self.score = score;
		self.update ();
	});},
	get set_score () {return __get__ (this, function (self, s) {
		self.score = s;
		self.update ();
	});},
	get add () {return __get__ (this, function (self, s) {
		self.score = self.score + s;
		self.update ();
	});},
	get update () {return __get__ (this, function (self) {
		self.text.setText ('Score: ' + self.score);
	});}
});
export var BombSpawner =  __class__ ('BombSpawner', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, scene) {
		self.scene = scene;
		self.group = self.scene.physics.add.group ();
	});},
	get spawn () {return __get__ (this, function (self, player_x) {
		if (typeof player_x == 'undefined' || (player_x != null && player_x.hasOwnProperty ("__kwargtrans__"))) {;
			var player_x = 0;
		};
		var x = (player_x < 400 ? Phaser.Math.Between (400, 800) : Phaser.Math.Between (0, 400));
		var bomb = self.group.create (x, 16, BOMB_KEY);
		bomb.setBounce (1);
		bomb.setCollideWorldBounds (true);
		bomb.setVelocity (Phaser.Math.Between (-(200), 200), 20);
	});}
});
export var HelloWorldScene =  __class__ ('HelloWorldScene', [phaser.Scene], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.platforms = null;
		self.player = null;
		self.stars = null;
		self.cursors = null;
		self.score_label = null;
		self.bomb_spawner = null;
		self.game_over = false;
	});},
	get preload () {return __get__ (this, function (self) {
		self.load.image (SKY_KEY, 'assets/sky.png');
		self.load.image (GROUND_KEY, 'assets/platform.png');
		self.load.image (STAR_KEY, 'assets/star.png');
		self.load.image (BOMB_KEY, 'assets/bomb.png');
		self.load.spritesheet (DUDE_KEY, 'assets/dude.png', dict ({'frameWidth': 32, 'frameHeight': 48}));
	});},
	get create () {return __get__ (this, function (self) {
		self.add.image (400, 300, SKY_KEY);
		self.platforms = self.create_platforms ();
		self.player = self.create_player ();
		self.stars = self.create_stars ();
		self.physics.add.collider (self.player, self.platforms);
		self.physics.add.collider (self.stars, self.platforms);
		self.physics.add.overlap (self.player, self.stars, self.collect_star, null, self);
		self.cursors = self.input.keyboard.createCursorKeys ();
		self.score_label = ScoreLabel (self);
		self.bomb_spawner = BombSpawner (self);
		self.physics.add.collider (self.bomb_spawner.group, self.platforms);
		self.physics.add.collider (self.player, self.bomb_spawner.group, self.hit_bomb, null, self);
	});},
	get create_platforms () {return __get__ (this, function (self) {
		var platforms = self.physics.add.staticGroup ();
		platforms.create (400, 568, GROUND_KEY).setScale (2).refreshBody ();
		platforms.create (600, 400, GROUND_KEY);
		platforms.create (50, 250, GROUND_KEY);
		platforms.create (750, 220, GROUND_KEY);
		return platforms;
	});},
	get create_player () {return __get__ (this, function (self) {
		var player = self.physics.add.sprite (100, 405, DUDE_KEY);
		player.setBounce (0.2);
		player.setCollideWorldBounds (true);
		self.anims.create (dict ({'key': 'left', 'frames': self.anims.generateFrameNumbers (DUDE_KEY, dict ({'start': 0, 'end': 3})), 'frameRate': 10, 'repeat': -(1)}));
		self.anims.create (dict ({'key': 'turn', 'frames': [dict ({'key': DUDE_KEY, 'frame': 4})], 'frameRate': 20}));
		self.anims.create (dict ({'key': 'right', 'frames': self.anims.generateFrameNumbers (DUDE_KEY, dict ({'start': 5, 'end': 8})), 'frameRate': 10, 'repeat': -(1)}));
		return player;
	});},
	get create_stars () {return __get__ (this, function (self) {
		var stars = self.physics.add.group (dict ({'key': STAR_KEY, 'repeat': 11, 'setXY': dict ({'x': 12, 'y': 0, 'stepX': 70})}));
		for (var child of stars.children.entries) {
			child.setBounceY (Phaser.Math.FloatBetween (0.4, 0.8));
		}
		return stars;
	});},
	get collect_star () {return __get__ (this, function (self, player, star) {
		star.disableBody (true, true);
		self.score_label.add (10);
		if (self.stars.countActive (true) == 0) {
			for (var child of self.stars.children.entries) {
				child.enableBody (true, child.x, 0, true, true);
			}
		}
		self.bomb_spawner.spawn (self.player.x);
	});},
	get hit_bomb () {return __get__ (this, function (self) {
		self.physics.pause ();
		self.player.setTint (16711680);
		self.player.anims.play ('turn');
		self.game_over = true;
	});},
	get update () {return __get__ (this, function (self) {
		if (self.game_over) {
			return ;
		}
		if (self.cursors.left.isDown) {
			self.player.setVelocityX (-(160));
			self.player.anims.play ('left', true);
		}
		else if (self.cursors.right.isDown) {
			self.player.setVelocityX (160);
			self.player.anims.play ('right', true);
		}
		else {
			self.player.setVelocityX (0);
			self.player.anims.play ('turn');
		}
		if (self.cursors.up.isDown && self.player.body.touching.down) {
			self.player.setVelocityY (-(330));
		}
	});}
});
export var config = dict ({'type': Phaser.AUTO, 'width': 800, 'height': 600, 'physics': dict ({'default': 'arcade', 'arcade': dict ({'gravity': dict ({'y': 300}), 'debug': false})}), 'scene': [HelloWorldScene]});
export var game = new Phaser.Game (config);

//# sourceMappingURL=phaser_platformer.map