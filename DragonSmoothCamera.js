"use strict";

//=============================================================================
// RPG Maker MZ - DragonSmoothCamera.js
//=============================================================================

var Imported                = Imported || {};
Imported.DragonSmoothScroll = 1.0;
var DragonEngine            = DragonEngine || {};
DragonEngine.SmoothCamera   = DragonEngine.SmoothCamera || {};

/*:
 * @target MZ
 * @plugindesc SMOOTH!!
 * @author The Dragon
 * @help DragonSmoothCamera.js
 *
 * @param slideCoefficient
 * @text Slide Coefficient
 * @desc The higher this value, the faster the camera movement.
 * @type text
 * @default 0.001953125
 * 
 * @param cameraOffset
 * @text Camera Offset
 * @desc Default camera offset relative to the current focus.
 * @type struct<Vector>
 * @default {"x": "0", "y": "0"}
 *
 * @command set 1
 * @text Set Camera Focus to Player
 * @desc Returns the focus of the camera to ther player.
 *
 * @command set 2
 * @text Set Camera Map Focus
 * @desc Changes the focus of the camera to a position on the map.
 *
 * @arg x
 * @text Focus X
 * @type text
 * @default 0
 * @desc Set the focus position x on the map.
 *
 * @arg y
 * @text Focus Y
 * @type text
 * @default 0
 * @desc Set the focus position y on the map.
 * 
 * @command set 3
 * @text Set Camera Map Focus (by Variables)
 * @desc Changes the focus of the camera to a position on the map.
 *
 * @arg x
 * @text Variable Focus X
 * @type variable
 * @default 1
 * @desc Set the focus position x on the map.
 *
 * @arg y
 * @text Variable Focus Y
 * @type variable
 * @default 1
 * @desc Set the focus position y on the map.
 * 
 * @command set 4
 * @text Set Camera Map Focus (by Variables ID's)
 * @desc Changes the focus of the camera to a position on the map.
 *
 * @arg x
 * @text Variable ID Focus X
 * @type variable
 * @default 1
 * @desc Set the focus position x on the map.
 *
 * @arg y
 * @text Variable ID Focus Y
 * @type variable
 * @default 1
 * @desc Set the focus position y on the map.
 * 
 * @command set 5
 * @text Set Camera Focus to this Event
 * @desc Changes the focus of the camera to this event.
 * 
 * @command set 6
 * @text Set Camera Focus to an Event
 * @desc Changes the focus of the camera to an valid event in the map.
 *
 * @arg id
 * @type number
 * @default 1
 * @text Event ID
 * @desc Set the focus position to the especified event.
 *
 * @command set 7
 * @text Set Camera Focus to an Event (by Variable)
 * @desc Changes the focus of the camera to an valid event in the map.
 *
 * @arg id
 * @type variable
 * @default 1
 * @text Variable Event ID
 * @desc Set the focus position to the especified event.
 * 
 * @command set 8
 * @text Set Camera Focus to an Event (by Variable ID)
 * @desc Changes the focus of the camera to an valid event in the map.
 *
 * @arg id
 * @type variable
 * @default 1
 * @text Variable ID Event ID
 * @desc Set the focus position to the especified event.
 * 
 * @command set 9
 * @text Set Camera Focus to an Character Object
 * @desc Changes the focus of the camera to an Game_Character instance.
 *
 * @arg instance
 * @type text
 * @text Instance
 * @desc Set the focus position to the especified Character Instance.
 * 
 * @command setSlideCoefficient
 * @text Set Camera Slide Coefficient
 * @desc Changes the speed of the camera.
 *
 * @arg slideCoefficient
 * @text Slide Coefficient
 * @type text
 * @default 0.001953125
 * @desc The higher this value, the faster the camera movement.
 *
 * @command setCameraOffset
 * @text Set Camera Offset
 * @desc Changes the offset of the camera relative to the focus.
 *
 * @arg x
 * @text Offset X
 * @type text
 * @default 0
 * @desc Set the Offset x of the camera.
 *
 * @arg y
 * @text Offset Y
 * @type text
 * @default 0
 * @desc Set the Offset y of the camera.
 */

 /*~struct~Vector:
 * @param x
 * @text X
 * @desc X
 * @type number
 * @default 1
 * 
 * @param y
 * @text Y
 * @desc Y
 * @type number
 * @default 1
 */

(() => {
	
	//-----------------------------------------------------------------------------
	// PluginManager
	//
	// The static class that manages the plugins.

	const pluginName = "DragonSmoothCamera";
	
	DragonEngine.SmoothCamera.params           = PluginManager.parameters(pluginName);
	DragonEngine.SmoothCamera.cameraOffset     = JSON.parse(DragonEngine.SmoothCamera.params['cameraOffset']);
	DragonEngine.SmoothCamera.slideCoefficient = parseFloat(DragonEngine.SmoothCamera.params['slideCoefficient']);


	PluginManager.registerCommand(pluginName, "set 1", args => {
		$gamePlayer.setCameraFocus(0);
	});

	PluginManager.registerCommand(pluginName, "set 2", args => {
		$gamePlayer.setCameraFocus(parseInt(args.x), parseInt(args.y));
	});

	PluginManager.registerCommand(pluginName, "set 3", args => {
		const a = $gameVariables.value(parseInt(args.x));
		const b = $gameVariables.value(parseInt(args.y));
		$gamePlayer.setCameraFocus(a, b);
	});

	PluginManager.registerCommand(pluginName, "set 4", args => {
		const a = $gameVariables.value($gameVariables.value(parseInt(args.x)));
		const b = $gameVariables.value($gameVariables.value(parseInt(args.y)));
		$gamePlayer.setCameraFocus(a, b);
	});

	PluginManager.registerCommand(pluginName, "set 5", args => {
		$gamePlayer.setCameraFocus($gameMap._interpreter._eventId);
	});

	PluginManager.registerCommand(pluginName, "set 6", args => {
		const id = parseInt(args.id);
		$gamePlayer.setCameraFocus(id === 0 ? $gameMap._interpreter._eventId : id);
	});

	PluginManager.registerCommand(pluginName, "set 7", args => {
		const id = $gameVariables.value(parseInt(args.id));
		$gamePlayer.setCameraFocus(id === 0 ? $gameMap._interpreter._eventId : id);
	});

	PluginManager.registerCommand(pluginName, "set 8", args => {
		const id = $gameVariables.value($gameVariables.value(parseInt(args.id)));
		$gamePlayer.setCameraFocus(id === 0 ? $gameMap._interpreter._eventId : id);
	});

	PluginManager.registerCommand(pluginName, "set 9", args => {
		$gamePlayer.setCameraFocus(eval(args.instance));
	});

	PluginManager.registerCommand(pluginName, "setSlideCoefficient", args => {
		DragonEngine.SmoothCamera.slideCoefficient = parseFloat(args.slideCoefficient);
	});

	PluginManager.registerCommand(pluginName, "setCameraOffset", args => {
		$gamePlayer.setCameraOffset(parseInt(args.x), parseInt(args.y));
	});

	//-----------------------------------------------------------------------------
	// Game_Map
	//
	// The game object class for a map. It contains scrolling and passage
	// determination functions.

    const _Game_Map_initialize = Game_Map.prototype.initialize;
	Game_Map.prototype.initialize = function() {
		this._restDisplayX = 0;
		this._restDisplayY = 0;
		_Game_Map_initialize.call(this);
	}

	const _Game_Map_setupScroll = Game_Map.prototype.setupScroll;
	Game_Map.prototype.setupScroll = function() {
		this._restDisplayX = 0;
		this._restDisplayY = 0;
		_Game_Map_setupScroll.call(this);
	}

	Game_Map.prototype.snapToGrid = function(a, b) {
		if (typeof a === Vector2) {
			if (typeof b === Vector2) {
				a.x = this.snapToGrid(a.x, b.x);
				a.y = this.snapToGrid(a.y, b.y);
			} else {
				a.x = this.snapToGrid(a.x, b);
				a.y = this.snapToGrid(a.y, b);
			}
			return a;
		} else {
			return Math.floor(a * b) / b;
		}
	}

    const _Game_Map_scrollDown = Game_Map.prototype.scrollDown;
	Game_Map.prototype.scrollDown = function(distance) {
		const tempDist = distance;
		const tileH = this.tileHeight();
		const inverseTileH = 1 / tileH;
		distance = this.snapToGrid(distance, tileH);
		this._restDisplayY += tempDist - distance;
		if (this._restDisplayY >= inverseTileH) {
			distance += inverseTileH;
			this._restDisplayY -= inverseTileH;
		}
		_Game_Map_scrollDown.call(this, distance);
		this._displayY = this.snapToGrid(this._displayY, tileH);
	}

	const _Game_Map_scrollLeft = Game_Map.prototype.scrollLeft;
	Game_Map.prototype.scrollLeft = function(distance) {
		const tempDist = distance;
		const tileW = this.tileWidth();
		const inversetileW = 1 / tileW;
		distance = this.snapToGrid(distance, tileW);
		this._restDisplayX -= tempDist - distance;
		if (this._restDisplayX <= -inversetileW) {
			distance += inversetileW;
			this._restDisplayX += inversetileW;
		}
		_Game_Map_scrollLeft.call(this, distance);
		this._displayX = this.snapToGrid(this._displayX, tileW);
	}

	const _Game_Map_scrollRight = Game_Map.prototype.scrollRight;
	Game_Map.prototype.scrollRight = function(distance) {
		const tempDist = distance;
		const tileW = this.tileWidth();
		const inversetileW = 1 / tileW;
		distance = this.snapToGrid(distance, tileW);
		this._restDisplayX += tempDist - distance;
		if (this._restDisplayX >= inversetileW) {
			distance += inversetileW;
			this._restDisplayX -= inversetileW;
		}
		_Game_Map_scrollRight.call(this, distance);
		this._displayX = this.snapToGrid(this._displayX, tileW);
	}

    const _Game_Map_scrollUp = Game_Map.prototype.scrollUp;
	Game_Map.prototype.scrollUp = function(distance) {
		const tempDist = distance;
		const tileH = this.tileHeight();
		const inverseTileH = 1 / tileH;
		distance = this.snapToGrid(distance, tileH);
		this._restDisplayY -= tempDist - distance;
		if (this._restDisplayY <= -inverseTileH) {
			distance += inverseTileH;
			this._restDisplayY += inverseTileH;
		}
		_Game_Map_scrollUp.call(this, distance);
		this._displayY = this.snapToGrid(this._displayY, tileH);
	}

	//-----------------------------------------------------------------------------
	// Game_Player
	//
	// The game object class for the player. It contains event starting
	// determinants and map scrolling functions.

	const _Game_PlayerinitMembers = Game_Player.prototype.initMembers
	Game_Player.prototype.initMembers = function() {
		_Game_PlayerinitMembers.call(this);
		this._cameraFocus  = this;
		this._cameraOffset = new Vector2(
			parseInt(DragonEngine.SmoothCamera.cameraOffset.x),
			parseInt(DragonEngine.SmoothCamera.cameraOffset.y)
		);
	}

	Game_Player.prototype.updateScroll = function(...args) {
		const focus = this.cameraFocus();
		const dX    = (focus.x - Graphics.width  / 2) * DragonEngine.SmoothCamera.slideCoefficient;
		const dY    = (focus.y - Graphics.height / 2) * DragonEngine.SmoothCamera.slideCoefficient;
		if (dX > 0) {
			$gameMap.scrollRight(dX);
		} else if (dX != 0) {
			$gameMap.scrollLeft(-dX);
		}
		if (dY > 0) {
			$gameMap.scrollDown(dY);
		}  else if (dY != 0) {
			$gameMap.scrollUp(-dY);
		}
	};

	Game_Player.prototype.cameraFocus = function() {
		const vec = new Vector2();
		if (this._cameraFocus instanceof Vector2) {
			const tw = $gameMap.tileWidth();
			const th = $gameMap.tileHeight();
			vec.set(
				$gameMap.adjustX(this._cameraFocus.x) * tw + tw / 2,
				$gameMap.adjustY(this._cameraFocus.y) * th + th
			);
		} else if (this._cameraFocus instanceof Game_CharacterBase) {
			vec.set(this._cameraFocus.screenX(), this._cameraFocus.screenY());
		}
		return vec.add(this._cameraOffset);
	}

	Game_Player.prototype.setCameraFocus = function(...args) {
		if (args.length === 2) {
			this._cameraFocus = new Vector2(...args);
		} else {
			const value = args[0];
			if (typeof value === "number") {
				this.setCameraFocus(value <= 0 ? this : $gameMap.event(value));
			} else if (value instanceof Game_CharacterBase) {
				this._cameraFocus = value;
			}
		}
	}

	Game_Player.prototype.setCameraOffset = function(x, y) {
		this._cameraOffset.set(x, y);
	}
})();
