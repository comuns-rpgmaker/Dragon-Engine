"use strict";
//=============================================================================
// ** RPG Maker MZ - DragonSmoothCamera.js
//=============================================================================

var DragonEngine                  = DragonEngine || {};
DragonEngine.SmoothCamera         = DragonEngine.SmoothCamera || {};
DragonEngine.SmoothCamera.VERSION = [1, 0, 1];

/*:
 * @target MZ
 * @plugindesc It provides some functions to make your game's camera smoother and more functional.
 * @author The Dragon
 * @url https://github.com/comuns-rpgmaker
 * @help 
 * Usage:
 *   Plugin will automatically apply when ON.
 *
 * About:
 *   DragonSmoothCamera.js
 *   Version 1.01
 *
 * @param slideCoefficient
 * @text Slide Coefficient
 * @desc The lower this value, the faster the camera movement.
 * @type text
 * @default 960
 * 
 * @param cameraOffset
 * @text Camera Offset
 * @desc Default camera offset relative to the current focus.
 * @type struct<Vector>
 * @default {"x": "0", "y": "0"}
 * 
 * @param dinamicCameraOffset
 * @text Dinamic Camera
 * @desc Camera offset changes dynamically according to the direction of the character in focus.
 * @type boolean
 * @default false
 * 
 * @param charDirVariableName
 * @text Char Direction Variable
 * @desc Name to the Character variable that indicates your current direction. (Advanced)
 * @parent dinamicCameraOffset
 * @type text
 * @default _direction
 * 
 * @param cameraOffsetbyDir
 * @text Camera Offset by Direction
 * @parent dinamicCameraOffset
 * @type struct<Directions>
 * @default {"1":"{\"x\": \"-60\", \"y\": \"60\"}","2":"{\"x\": \"0\", \"y\": \"60\"}","3":"{\"x\": \"60\", \"y\": \"60\"}","4":"{\"x\": \"-60\", \"y\": \"0\"}","6":"{\"x\": \"60\", \"y\": \"0\"}","7":"{\"x\": \"-60\", \"y\": \"-60\"}","8":"{\"x\": \"0\", \"y\": \"-60\"}","9":"{\"x\": \"60\", \"y\": \"-60\"}"}
 *
 * @command setsmoothCamera
 * @text Set Smooth Camera State
 * @desc Change if smooth camera system is enabled.
 *
 * @arg value
 * @text Smooth Camera Enabled?
 * @type boolean
 * @default true
 * @desc Changes the state of the entire system.
 * 
 * @command setdinamicCamera
 * @text Set Dinamic Camera State
 * @desc Change if dinamic camera is enabled.
 *
 * @arg value
 * @text Dinamic Camera Enabled?
 * @type boolean
 * @default false
 * @desc Camera offset changes dynamically according to the direction of the character in focus.
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
 * @default 960
 * @desc The lower this value, the faster the camera movement.
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

 /*~struct~Directions:
 * @param 1
 * @text ↙
 * @desc Down-left Direction
 * @type struct<Vector>
 * @default {"x": "-60", "y": "60"}
 * 
 * @param 2
 * @text ↓
 * @desc Down Direction
 * @type struct<Vector>
 * @default {"x": "0", "y": "60"}
 * 
 * @param 3
 * @text ↘
 * @desc Down-Right Direction
 * @type struct<Vector>
 * @default {"x": "60", "y": "60"}
 * 
 * @param 4
 * @text ←
 * @desc Left Direction
 * @type struct<Vector>
 * @default {"x": "-60", "y": "0"}
 * 
 * @param 6
 * @text →
 * @desc Right Direction
 * @type struct<Vector>
 * @default {"x": "60", "y": "0"}
 * 
 * @param 7
 * @text ↖
 * @desc Up-Left Direction
 * @type struct<Vector>
 * @default {"x": "-60", "y": "-60"}
 * 
 * @param 8
 * @text ↑
 * @desc Up Direction
 * @type struct<Vector>
 * @default {"x": "0", "y": "-60"}
 * 
 * @param 9
 * @text ↗
 * @desc Up-Right Direction
 * @type struct<Vector>
 * @default {"x": "60", "y": "-60"}
 */

(() => {
	//=============================================================================
	// ** PluginManager
	//-----------------------------------------------------------------------------
	// The static class that manages the plugins.
	//=============================================================================	
	const pluginName = "DragonSmoothCamera";
	
	DragonEngine.SmoothCamera.params              = PluginManager.parameters(pluginName);
	DragonEngine.SmoothCamera.enabled             = true;
	DragonEngine.SmoothCamera.cameraOffset        = JSON.parse(DragonEngine.SmoothCamera.params['cameraOffset']);
	DragonEngine.SmoothCamera.slideCoefficient    = parseFloat(DragonEngine.SmoothCamera.params['slideCoefficient']);
	DragonEngine.SmoothCamera.cameraOffsetbyDir   = Object.fromEntries(Object.entries(JSON.parse(DragonEngine.SmoothCamera.params['cameraOffsetbyDir'])).map(([k, v]) => [k, 
                                                    Object.fromEntries(Object.entries(JSON.parse(v)).map(([k, v]) => [k, parseInt(v)]))]));
	DragonEngine.SmoothCamera.dinamicCameraOffset = JSON.parse(DragonEngine.SmoothCamera.params['dinamicCameraOffset']);
	DragonEngine.SmoothCamera.charDirVariableName = DragonEngine.SmoothCamera.params['charDirVariableName'];
	//------------------------------------------------------------------------
	// * set 1
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "set 1", args => {
		$gamePlayer.setCameraFocus(0);
	});
	//------------------------------------------------------------------------
	// * set 2
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "set 2", args => {
		$gamePlayer.setCameraFocus(parseInt(args.x), parseInt(args.y));
	});
	//------------------------------------------------------------------------
	// * set 3
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "set 3", args => {
		const a = $gameVariables.value(parseInt(args.x));
		const b = $gameVariables.value(parseInt(args.y));
		$gamePlayer.setCameraFocus(a, b);
	});
	//------------------------------------------------------------------------
	// * set 4
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "set 4", args => {
		const a = $gameVariables.value($gameVariables.value(parseInt(args.x)));
		const b = $gameVariables.value($gameVariables.value(parseInt(args.y)));
		$gamePlayer.setCameraFocus(a, b);
	});
	//------------------------------------------------------------------------
	// * set 5
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "set 5", args => {
		$gamePlayer.setCameraFocus($gameMap._interpreter._eventId);
	});
	//------------------------------------------------------------------------
	// * set 6
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "set 6", args => {
		const id = parseInt(args.id);
		$gamePlayer.setCameraFocus(id === 0 ? $gameMap._interpreter._eventId : id);
	});
	//------------------------------------------------------------------------
	// * set 7
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "set 7", args => {
		const id = $gameVariables.value(parseInt(args.id));
		$gamePlayer.setCameraFocus(id === 0 ? $gameMap._interpreter._eventId : id);
	});
	//------------------------------------------------------------------------
	// * set 8
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "set 8", args => {
		const id = $gameVariables.value($gameVariables.value(parseInt(args.id)));
		$gamePlayer.setCameraFocus(id === 0 ? $gameMap._interpreter._eventId : id);
	});
	//------------------------------------------------------------------------
	// * set 9
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "set 9", args => {
		$gamePlayer.setCameraFocus(eval(args.instance));
	});
	//------------------------------------------------------------------------
	// * setSlideCoefficient
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "setSlideCoefficient", args => {
		DragonEngine.SmoothCamera.slideCoefficient = parseFloat(args.slideCoefficient);
	});
	//------------------------------------------------------------------------
	// * setCameraOffset
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "setCameraOffset", args => {
		$gamePlayer.setCameraOffset(parseInt(args.x), parseInt(args.y));
	});
	//------------------------------------------------------------------------
	// * setdinamicCamera
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "setdinamicCamera", args => {
		DragonEngine.SmoothCamera.dinamicCameraOffset = JSON.parse(args.value);
	});
	//------------------------------------------------------------------------
	// * setsmoothCamera
	// - New Event Command
	//------------------------------------------------------------------------
	PluginManager.registerCommand(pluginName, "setsmoothCamera", args => {
		DragonEngine.SmoothCamera.enabled = JSON.parse(args.value);
	});
	//=============================================================================
	// ** Game_Map
	//-----------------------------------------------------------------------------
	// The game object class for a map. It contains scrolling and passage
	// determination functions.
	//=============================================================================
	//------------------------------------------------------------------------
	// * initialize
	// - Aliased function
	//------------------------------------------------------------------------
    const _Game_Map_initialize = Game_Map.prototype.initialize;
	Game_Map.prototype.initialize = function() {
		this._restDisplayX = 0;
		this._restDisplayY = 0;
		_Game_Map_initialize.call(this);
	}
	//------------------------------------------------------------------------
	// * setupScroll
	// - Aliased function
	//------------------------------------------------------------------------
	const _Game_Map_setupScroll = Game_Map.prototype.setupScroll;
	Game_Map.prototype.setupScroll = function() {
		this._restDisplayX = 0;
		this._restDisplayY = 0;
		_Game_Map_setupScroll.call(this);
	}
	//------------------------------------------------------------------------
	// * scrollDown
	// - Aliased function
	//------------------------------------------------------------------------
    const _Game_Map_scrollDown = Game_Map.prototype.scrollDown;
	Game_Map.prototype.scrollDown = function(distance) {
		const tileH = this.tileHeight();
		const tempDist = distance * tileH;
		distance = Math.floor(tempDist);
		this._restDisplayY += tempDist - distance;
		if (this._restDisplayY >= 1) {
			distance += 1;
			this._restDisplayY -= 1;
		}
		_Game_Map_scrollDown.call(this, distance / tileH);
	}
	//------------------------------------------------------------------------
	// * scrollLeft
	// - Aliased function
	//------------------------------------------------------------------------
	const _Game_Map_scrollLeft = Game_Map.prototype.scrollLeft;
	Game_Map.prototype.scrollLeft = function(distance) {
		const tileW = this.tileWidth();
		const tempDist = distance * tileW;
		distance = Math.floor(tempDist);
		this._restDisplayX -= tempDist - distance;
		if (this._restDisplayX <= -1) {
			distance += 1;
			this._restDisplayX += 1;
		}
		_Game_Map_scrollLeft.call(this, distance / tileW);
	}
	//------------------------------------------------------------------------
	// * scrollRight
	// - Aliased function
	//------------------------------------------------------------------------
	const _Game_Map_scrollRight = Game_Map.prototype.scrollRight;
	Game_Map.prototype.scrollRight = function(distance) {
		const tileW = this.tileWidth();
		const tempDist = distance * tileW;
		distance = Math.floor(tempDist);
		this._restDisplayX += tempDist - distance;
		if (this._restDisplayX >= 1) {
			distance += 1;
			this._restDisplayX -= 1;
		}
		_Game_Map_scrollRight.call(this, distance / tileW);
	}
	//------------------------------------------------------------------------
	// * scrollUp
	// - Aliased function
	//------------------------------------------------------------------------
    const _Game_Map_scrollUp = Game_Map.prototype.scrollUp;
	Game_Map.prototype.scrollUp = function(distance) {
		const tileH = this.tileHeight();
		const tempDist = distance * tileH;
		distance = Math.floor(tempDist);
		this._restDisplayY -= tempDist - distance;
		if (this._restDisplayY <= -1) {
			distance += 1;
			this._restDisplayY += 1;
		}
        _Game_Map_scrollUp.call(this, distance / tileH);
	}
	//=============================================================================
	// ** Game_Player
	//-----------------------------------------------------------------------------
	// The game object class for the player. It contains event starting
	// determinants and map scrolling functions.
	//=============================================================================
	//------------------------------------------------------------------------
	// * initMembers
	// - Aliased function
	//------------------------------------------------------------------------
	const _Game_PlayerinitMembers = Game_Player.prototype.initMembers;
	Game_Player.prototype.initMembers = function() {
		_Game_PlayerinitMembers.call(this);
		this._cameraFocus  = this;
		this._cameraOffset = {
			x: parseInt(DragonEngine.SmoothCamera.cameraOffset.x),
			y: parseInt(DragonEngine.SmoothCamera.cameraOffset.y)
		};
	}
	//------------------------------------------------------------------------
	// * updateScroll
	// - Aliased function
	//------------------------------------------------------------------------
	const _Game_PlayerupdateScroll = Game_Player.prototype.updateScroll;
	Game_Player.prototype.updateScroll = function(...args) {
		if (!DragonEngine.SmoothCamera.enabled) return _Game_PlayerupdateScroll.call(this, ...args);
		const focus = this.cameraFocus();
		const dX    = (focus.x - Graphics.width  / 2) / DragonEngine.SmoothCamera.slideCoefficient;
		const dY    = (focus.y - Graphics.height / 2) / DragonEngine.SmoothCamera.slideCoefficient;
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
	//------------------------------------------------------------------------
	// * cameraFocus
	// - New function
	//------------------------------------------------------------------------
	Game_Player.prototype.cameraFocus = function() {
		const vec = {x: 0, y: 0};
		if (this._cameraFocus instanceof Game_CharacterBase) {
			vec.x = this._cameraFocus.screenX();
			vec.y = this._cameraFocus.screenY();
		} else {
			const tw = $gameMap.tileWidth();
			const th = $gameMap.tileHeight();
			vec.x = $gameMap.adjustX(this._cameraFocus.x) * tw + tw / 2;
			vec.y = $gameMap.adjustY(this._cameraFocus.y) * th + th;
		}
		if (this._cameraFocus instanceof Game_CharacterBase && DragonEngine.SmoothCamera.dinamicCameraOffset) {
			const dirVec = DragonEngine.SmoothCamera.cameraOffsetbyDir[this._cameraFocus[DragonEngine.SmoothCamera.charDirVariableName]];
			vec.x += dirVec.x;
			vec.y += dirVec.y;
		} else {
			vec.x += this._cameraOffset.x;
			vec.y += this._cameraOffset.y;
		}
		return vec;
	}
	//------------------------------------------------------------------------
	// * setCameraFocus
	// - New function
	//------------------------------------------------------------------------
	Game_Player.prototype.setCameraFocus = function(...args) {
		if (args.length === 2) {
			this._cameraFocus = {x: args[0], y: args[1]};
		} else {
			const value = args[0];
			if (typeof value === "number") {
				this.setCameraFocus(value <= 0 ? this : $gameMap.event(value));
			} else if (value instanceof Game_CharacterBase) {
				this._cameraFocus = value;
			}
		}
	}
	//------------------------------------------------------------------------
	// * setCameraOffset
	// - New function
	//------------------------------------------------------------------------
	Game_Player.prototype.setCameraOffset = function(x, y) {
		this._cameraOffset.x = x;
		this._cameraOffset.y = y;
	}
})();
