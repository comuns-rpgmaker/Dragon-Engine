//=============================================================================
// ** RPG Maker MZ - DragonSmoothCamera.js
//=============================================================================

var SDragon                  = SDragon || {};
SDragon.SmoothCamera         = SDragon.SmoothCamera || {};
SDragon.SmoothCamera.VERSION = [1, 1, 0];

/*:
 * @target MZ
 * @plugindesc It provides some functions to make your game's camera smoother and more functional.
 * @author Jorge 'Maker' Augusto (Dragon)
 * @url https://github.com/comuns-rpgmaker
 * @help 
 * Introduction:
 *   This plugin generates a delay effect in the movement of the camera until 
 *   it stabilizes in focus. Creating a smooth effect!
 *
 * Usage:
 *   I created a lot of commands to make this plugin as user friendly as I could! 
 *   See each of them and their description to understand how to use it.
 * 
 * About:
 *   DragonSmoothCamera.js
 *   Version 1.10
 *   For support and new plugins join our discord server! https://discord.gg/Kh9XXZ2 (Comuns PLugins)
 * 
 * License:
 *   https://github.com/comuns-rpgmaker/Dragon-Engine/blob/master/LICENSE
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
 * @command setCameraFocusToPlayer
 * @text Set Camera Focus to Player
 * @desc Returns the focus of the camera to ther player.
 *
 * @command setCameraFocusToMap
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
 * @command setCameraFocusToMapByVar
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
 * @command setCameraFocusToMapByVarVar
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
 * @command setCameraFocusToCurrentEvent
 * @text Set Camera Focus to this Event
 * @desc Changes the focus of the camera to this event.
 * 
 * @command setCameraFocusToEvent
 * @text Set Camera Focus to an Event
 * @desc Changes the focus of the camera to an valid event in the map.
 *
 * @arg id
 * @type number
 * @default 1
 * @text Event ID
 * @desc Set the focus position to the especified event.
 *
 * @command setCameraFocusToEventByVar
 * @text Set Camera Focus to an Event (by Variable)
 * @desc Changes the focus of the camera to an valid event in the map.
 *
 * @arg id
 * @type variable
 * @default 1
 * @text Variable Event ID
 * @desc Set the focus position to the especified event.
 * 
 * @command setCameraFocusToEventByVarVar
 * @text Set Camera Focus to an Event (by Variable ID)
 * @desc Changes the focus of the camera to an valid event in the map.
 *
 * @arg id
 * @type variable
 * @default 1
 * @text Variable ID Event ID
 * @desc Set the focus position to the especified event.
 * 
 * @command setCameraFocusToCharInstance
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
 * @desc Camera offset changes dynamically according to the direction of the character in focus.m
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
	// ** Plugin Definitions
	//=============================================================================	
	"use strict";
	const pluginName = "DragonSmoothCamera";
	//=============================================================================
	// ** SDragon.easing
	//-----------------------------------------------------------------------------
	// --
	//=============================================================================	
	SDragon.easing = class {

		in(t, power) {
			return Math.pow(t, power);
		}

		out(t, power) {
			return 1 - Math.abs(Math.pow(t - 1, power));
		}

		inOut(t, power) {
			if (t < 0.5) {
				return this.in(t * 2, power) / 2;
			} else {
				return this.out(t * 2 - 1, power) / 2 + 0.5
			}
		}

		smoothIn(t, d, b, c, power) {
			t = (t / d).clamp(0, 1)
			return b + (c - b) * this.in(t, power);
		}

		smoothOut(t, d, b, c, power) {
			t = (t / d).clamp(0, 1)
			return b + (c - b) * this.out(t, power);
		}

		smoothInOut(t, d, b, c, power) {
			t = (t / d).clamp(0, 1)
			return b + (c - b) * this.inOut(t, power);
		}
	}
	SDragon.easing = SDragon.easing.prototype;
	//=============================================================================
	// ** PluginManager
	//-----------------------------------------------------------------------------
	// The static class that manages the plugins.
	//=============================================================================	
	Object.assign(SDragon, {
		assignPluginCommands(pluginName, obj) {
			const proto = obj.prototype;
			for (const commandName of Object.getOwnPropertyNames(proto)) {
				if (commandName === 'constructor') continue;
				const func = proto[commandName];
			    if (typeof func === "function") PluginManager.registerCommand(pluginName, commandName, func);
			}
		}
	});
	SDragon.assignPluginCommands(pluginName, class {
		//------------------------------------------------------------------------
		// * setCameraFocusToPlayer
		//------------------------------------------------------------------------
		setCameraFocusToPlayer() {
			$gamePlayer.setCameraFocus(0);
		}
		//------------------------------------------------------------------------
		// * setCameraFocusToMap
		//------------------------------------------------------------------------
		setCameraFocusToMap(args) {
			$gamePlayer.setCameraFocus(parseInt(args.x), parseInt(args.y));
		}
		//------------------------------------------------------------------------
		// * setCameraFocusToMapByVar
		//------------------------------------------------------------------------
		setCameraFocusToMapByVar(args) {
			const a = $gameVariables.value(parseInt(args.x));
			const b = $gameVariables.value(parseInt(args.y));
			$gamePlayer.setCameraFocus(a, b);
		}
		//------------------------------------------------------------------------
		// * setCameraFocusToMapByVarVar
		//------------------------------------------------------------------------
		setCameraFocusToMapByVarVar(args) {
			const a = $gameVariables.value($gameVariables.value(parseInt(args.x)));
			const b = $gameVariables.value($gameVariables.value(parseInt(args.y)));
			$gamePlayer.setCameraFocus(a, b);
		}
		//------------------------------------------------------------------------
		// * setCameraFocusToCurrentEvent
		//------------------------------------------------------------------------
		setCameraFocusToCurrentEvent() {
			$gamePlayer.setCameraFocus($gameMap._interpreter._eventId);
		}
		//------------------------------------------------------------------------
		// * setCameraFocusToEvent
		//------------------------------------------------------------------------
		setCameraFocusToEvent(args) {
			const id = parseInt(args.id);
			$gamePlayer.setCameraFocus(id === 0 ? $gameMap._interpreter._eventId : id);
		}
		//------------------------------------------------------------------------
		// * setCameraFocusToEventByVar
		//------------------------------------------------------------------------
		setCameraFocusToEventByVar(args) {
			const id = $gameVariables.value(parseInt(args.id));
			$gamePlayer.setCameraFocus(id === 0 ? $gameMap._interpreter._eventId : id);
		}
		//------------------------------------------------------------------------
		// * setCameraFocusToEventByVarVar
		//------------------------------------------------------------------------
		setCameraFocusToEventByVarVar(args) {
			const id = $gameVariables.value($gameVariables.value(parseInt(args.id)));
			$gamePlayer.setCameraFocus(id === 0 ? $gameMap._interpreter._eventId : id);
		}
		//------------------------------------------------------------------------
		// * setCameraFocusToCharInstance
		//------------------------------------------------------------------------
		setCameraFocusToCharInstance(args) {
			$gamePlayer.setCameraFocus(eval(args.instance));
		}
		//------------------------------------------------------------------------
		// * setSlideCoefficient
		//------------------------------------------------------------------------
		setSlideCoefficient(args) {
			SDragon.SmoothCamera.slideCoefficient = parseFloat(args.slideCoefficient);
		}
		//------------------------------------------------------------------------
		// * setCameraOffset
		//------------------------------------------------------------------------
		setCameraOffset(args) {
			$gamePlayer.setCameraOffset(parseInt(args.x), parseInt(args.y));
		}
		//------------------------------------------------------------------------
		// * setdinamicCamera
		//------------------------------------------------------------------------
		setdinamicCamera(args) {
			SDragon.SmoothCamera.dinamicCameraOffset = JSON.parse(args.value);
		}
		//------------------------------------------------------------------------
		// * setsmoothCamera
		//------------------------------------------------------------------------
		setsmoothCamera(args) {
			SDragon.SmoothCamera.enabled = JSON.parse(args.value);
		}
	});
	SDragon.SmoothCamera.params = PluginManager.parameters(pluginName);
	Object.assign(SDragon.SmoothCamera, {
		enabled             : true,
		charDirVariableName : SDragon.SmoothCamera.params['charDirVariableName'],
		cameraOffset        : JSON.parse(SDragon.SmoothCamera.params['cameraOffset']),
		dinamicCameraOffset : JSON.parse(SDragon.SmoothCamera.params['dinamicCameraOffset']),
		slideCoefficient    : parseFloat(SDragon.SmoothCamera.params['slideCoefficient']),
		cameraOffsetbyDir   : Object.fromEntries(Object.entries(JSON.parse(SDragon.SmoothCamera.params['cameraOffsetbyDir'])).map(([k, v]) => [k, 
						      Object.fromEntries(Object.entries(JSON.parse(v)).map(([k, v]) => [k, parseInt(v)]))])),
		tempCharacterObject : null
	});
	//=============================================================================
	// ** Game_Map
	//-----------------------------------------------------------------------------
	// The game object class for a map. It contains scrolling and passage
	// determination functions.
	//=============================================================================

	const 
	alias_Game_Map_initialize    = Game_Map.prototype.initialize,
	alias_Game_Map_setupScroll   = Game_Map.prototype.setupScroll,
	alias_Game_Map_setDisplayPos = Game_Map.prototype.setDisplayPos;

	Object.assign(Game_Map.prototype, {
		//------------------------------------------------------------------------
		// * initialize
		// - Aliased function
		//------------------------------------------------------------------------
		initialize() {
			this._pixelDisplay = new PIXI.Point();
			this._restDisplayX = 0;
			this._restDisplayY = 0;
			alias_Game_Map_initialize.call(this, ...arguments);
		},
		//------------------------------------------------------------------------
		// * setupScroll
		// - Aliased function
		//------------------------------------------------------------------------
		setupScroll() {
			this._restDisplayX = 0;
			this._restDisplayY = 0;
			alias_Game_Map_setupScroll.call(this, ...arguments);
		},
		//------------------------------------------------------------------------
		// * setDisplayPos
		// - Aliased function
		//------------------------------------------------------------------------
		setDisplayPos() {
			alias_Game_Map_setDisplayPos.call(this, ...arguments);
			this._pixelDisplay.set(
				Math.floor(this._displayX * this.tileWidth()),
				Math.floor(this._displayY * this.tileHeight()),
			);
		},
		//------------------------------------------------------------------------
		// * scrollDown
		// - Overwrite function
		//------------------------------------------------------------------------
		scrollDown(distance) {
			const th 		  = this.tileHeight(),
				  pixelHeight = this.height() * th,
				  tempDist    = distance * th;
			let   pixelDist   = Math.floor(tempDist);
			this._restDisplayY += (tempDist - pixelDist);
			if (this._restDisplayY >= 1) {
				pixelDist += 1; this._restDisplayY -= 1;
			}
			if (this.isLoopVertical()) {
				this._pixelDisplay.y = (this._pixelDisplay.y + pixelDist) % pixelHeight;
				this._displayY = (this._pixelDisplay.y / th);
				if (this._parallaxLoopY) this._parallaxY += (pixelDist / th);
			} else if (pixelHeight >= Graphics.height) {
				const lastDisplayY = this._pixelDisplay.y;
				this._pixelDisplay.y = Math.min(lastDisplayY + pixelDist, pixelHeight - Graphics.height);
				this._displayY = (this._pixelDisplay.y / th);
				this._parallaxY += (this._pixelDisplay.y - lastDisplayY) / th;
			}
		},
		//------------------------------------------------------------------------
		// * scrollLeft
		// - Overwrite function
		//------------------------------------------------------------------------
		scrollLeft(distance) {
			const tw 		 = this.tileWidth(),
				  pixelWidth = this.width() * tw,
				  tempDist   = distance * tw;
			let   pixelDist  = Math.floor(tempDist);
			this._restDisplayX -= (tempDist - pixelDist);
			if (this._restDisplayX <= -1) {
				pixelDist += 1; this._restDisplayX += 1;
			}
			if (this.isLoopHorizontal()) {
				this._pixelDisplay.x = (this._pixelDisplay.x + pixelWidth - pixelDist) % pixelWidth;
				this._displayX = (this._pixelDisplay.x / tw);
				if (this._parallaxLoopX) this._parallaxX -= (pixelDist / tw);
			} else if (pixelWidth >= Graphics.width) {
				const lastDisplayX = this._pixelDisplay.x;
				this._pixelDisplay.x = Math.max(lastDisplayX - pixelDist, 0);
				this._displayX = (this._pixelDisplay.x / tw);
				this._parallaxX += (this._pixelDisplay.x - lastDisplayX) / tw;
			}
		},
		//------------------------------------------------------------------------
		// * scrollRight
		// - Overwrite function
		//------------------------------------------------------------------------
		scrollRight(distance) {
			const tw 		 = this.tileWidth(),
				  pixelWidth = this.width() * tw,
				  tempDist   = distance * tw;
			let   pixelDist  = Math.floor(tempDist);
			this._restDisplayX += (tempDist - pixelDist);
			if (this._restDisplayX >= 1) {
				pixelDist += 1; this._restDisplayX -= 1;
			}
			if (this.isLoopHorizontal()) {
				this._pixelDisplay.x = (this._pixelDisplay.x + pixelDist) % pixelWidth;
				this._displayX = (this._pixelDisplay.x / tw);
				if (this._parallaxLoopX) this._parallaxX += (pixelDist / tw);
			} else if (pixelWidth >= Graphics.width) {
				const lastDisplayX = this._pixelDisplay.x;
				this._pixelDisplay.x = Math.min(lastDisplayX + pixelDist, pixelWidth - Graphics.width);
				this._displayX = (this._pixelDisplay.x / tw);
				this._parallaxX += (this._pixelDisplay.x - lastDisplayX) / tw;
			}
		},
		//------------------------------------------------------------------------
		// * scrollUp
		// - Overwrite function
		//------------------------------------------------------------------------
		scrollUp(distance) {
			const th 		  = this.tileHeight(),
				  pixelHeight = this.height() * th,
				  tempDist    = distance * th;
			let   pixelDist   = Math.floor(tempDist);
			this._restDisplayY -= (tempDist - pixelDist);
			if (this._restDisplayY <= -1) {
				pixelDist += 1; this._restDisplayY += 1;
			}
			if (this.isLoopVertical()) {
				this._pixelDisplay.y = (this._pixelDisplay.y + pixelHeight - pixelDist) % pixelHeight;
				this._displayY = (this._pixelDisplay.y / th);
				if (this._parallaxLoopY) this._parallaxY -= (pixelDist / th);
			} else if (pixelHeight >= Graphics.height) {
				const lastDisplayY = this._pixelDisplay.y;
				this._pixelDisplay.y = Math.max(lastDisplayY - pixelDist, 0);
				this._displayY = (this._pixelDisplay.y / th);
				this._parallaxY += (this._pixelDisplay.y - lastDisplayY) / th;
			}
		},
		//------------------------------------------------------------------------
		// * adjustPixelX
		// - New function
		//------------------------------------------------------------------------
		adjustPixelX(x) {
			const displayX   = this._pixelDisplay.x,
			      pixelWidth = this.width() * this.tileWidth();
			if (this.isLoopHorizontal() && x < displayX - (pixelWidth - Graphics.width) / 2) 
			      return x - displayX + pixelWidth;
			else  return x - displayX;
		},
		//------------------------------------------------------------------------
		// * adjustPixelY
		// - New function
		//------------------------------------------------------------------------
		adjustPixelY(y) {
			const displayY    = this._pixelDisplay.y,
			      pixelHeight = this.height() * this.tileHeight();
			if (this.isLoopVertical() && y < displayY - (pixelHeight - Graphics.height) / 2)
				 return y - displayY + pixelHeight;
			else return y - displayY;
		},
		//------------------------------------------------------------------------
		// * pixelDisplay
		// - New function
		//------------------------------------------------------------------------
		pixelDisplay() {
			return this._pixelDisplay;
		},
	});
	//=============================================================================
	// ** Game_CharacterBase
	//-----------------------------------------------------------------------------
	// The superclass of Game_Character. It handles basic information, such as
    // coordinates and images, shared by all characters.
	//=============================================================================

	Object.assign(Game_CharacterBase.prototype, {
		//------------------------------------------------------------------------
		// * screenX
		// - Overwrite function
		//------------------------------------------------------------------------
		screenX() {
			const tw = $gameMap.tileWidth();
			return Math.floor($gameMap.adjustPixelX(this._realX * tw) + tw / 2);
		},
		//------------------------------------------------------------------------
		// * screenY
		// - Overwrite function
		//------------------------------------------------------------------------
		screenY() {
			const th = $gameMap.tileHeight();
			return Math.floor($gameMap.adjustPixelY(this._realY * th) + th - this.shiftY() - this.jumpHeight());
		},
	});
	//=============================================================================
	// ** Game_Player
	//-----------------------------------------------------------------------------
	// The game object class for the player. It contains event starting
	// determinants and map scrolling functions.
	//=============================================================================

	const 
	alias_Game_Player_initMembers  = Game_Player.prototype.initMembers,
	alias_Game_Player_updateScroll = Game_Player.prototype.updateScroll;

	Object.assign(Game_Player.prototype, {
		//------------------------------------------------------------------------
		// * initMembers
		// - Aliased function
		//------------------------------------------------------------------------
		initMembers() {
			alias_Game_Player_initMembers.call(this, ...arguments)
			SDragon.SmoothCamera.tempCharacterObject  = this;
			this._cameraOffset = {
				x: parseInt(SDragon.SmoothCamera.cameraOffset.x),
				y: parseInt(SDragon.SmoothCamera.cameraOffset.y)
			};
		},
		//------------------------------------------------------------------------
		// * updateScroll
		// - Aliased function
		//------------------------------------------------------------------------
		updateScroll() {
			if (!SDragon.SmoothCamera.enabled) return alias_Game_Player_updateScroll.call(this, ...arguments);
			const 
			focus = this.cameraFocus(),
		        dX    = (focus.x - Graphics.width  / 2) / SDragon.SmoothCamera.slideCoefficient,
		        dY    = (focus.y - Graphics.height / 2) / SDragon.SmoothCamera.slideCoefficient;
			if      (dX >  0) $gameMap.scrollRight(dX);
			else if (dX != 0) $gameMap.scrollLeft(-dX);
			if      (dY >  0) $gameMap.scrollDown(dY);
			else if (dY != 0) $gameMap.scrollUp(-dY);
		},
		//------------------------------------------------------------------------
		// * cameraFocus
		// - New function
		//------------------------------------------------------------------------
		cameraFocus() {
			const vec = {x: 0, y: 0};
			if (SDragon.SmoothCamera.tempCharacterObject instanceof Game_CharacterBase) {
				vec.x = SDragon.SmoothCamera.tempCharacterObject.screenX();
				vec.y = SDragon.SmoothCamera.tempCharacterObject.screenY();
			} else {
				const tw = $gameMap.tileWidth();
				const th = $gameMap.tileHeight();
				vec.x = $gameMap.adjustX(SDragon.SmoothCamera.tempCharacterObject.x) * tw + tw / 2;
				vec.y = $gameMap.adjustY(SDragon.SmoothCamera.tempCharacterObject.y) * th + th;
			}
			if (SDragon.SmoothCamera.tempCharacterObject instanceof Game_CharacterBase && SDragon.SmoothCamera.dinamicCameraOffset) {
				const dirVec = SDragon.SmoothCamera.cameraOffsetbyDir[SDragon.SmoothCamera.tempCharacterObject[SDragon.SmoothCamera.charDirVariableName]];
				vec.x += dirVec.x;
				vec.y += dirVec.y;
			} else {
				vec.x += this._cameraOffset.x;
				vec.y += this._cameraOffset.y;
			}
			return vec;
		},
		//------------------------------------------------------------------------
		// * setCameraFocus
		// - New function
		//------------------------------------------------------------------------
		setCameraFocus(...args) {
			if (args.length === 2) {
				SDragon.SmoothCamera.tempCharacterObject = {x: args[0], y: args[1]};
			} else {
				const value = args[0];
				if (typeof value === "number") {
					this.setCameraFocus(value <= 0 ? this : $gameMap.event(value));
				} else if (value instanceof Game_CharacterBase) {
					SDragon.SmoothCamera.tempCharacterObject = value;
				}
			}
		},
		//------------------------------------------------------------------------
		// * setCameraOffset
		// - New function
		//------------------------------------------------------------------------
		setCameraOffset(x, y) {
			this._cameraOffset.x = x;
			this._cameraOffset.y = y;
		},
	});
	//=============================================================================
	// ** Spriteset_Map
	//-----------------------------------------------------------------------------
	// The set of sprites on the map screen.
	//=============================================================================

	Object.assign(Spriteset_Map.prototype, {
		//------------------------------------------------------------------------
		// * updateTilemap
		// - Overwrite function
		//------------------------------------------------------------------------
		updateTilemap() {
			const mapDisplay = $gameMap.pixelDisplay();
			this._tilemap.origin.set(mapDisplay.x, mapDisplay.y);
		},
	});
	//=============================================================================
	// ** DataManager
	//-----------------------------------------------------------------------------
	// The static class that manages the database and game objects.
	//=============================================================================
	
	const 
	JorgeNaoQuisArrumar_extractSaveContents = DataManager.extractSaveContents;

    Object.assign(DataManager, {
		//------------------------------------------------------------------------
		// * extractSaveContents
		// - Alias function
		//------------------------------------------------------------------------
		extractSaveContents() {
			JorgeNaoQuisArrumar_extractSaveContents.call(this, ...arguments);
			SDragon.SmoothCamera.tempCharacterObject = $gamePlayer; 
		},
	});
})();
