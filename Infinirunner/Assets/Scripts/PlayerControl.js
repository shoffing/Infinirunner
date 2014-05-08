#pragma strict

private final static var SPEED = 12;
private final static var GRAVITY = 12;

var clapSound : AudioClip;
var deathSound : AudioClip;

var playerColorRed : Material;
var playerColorBlue : Material;

private var gravityFlipped = false;
private var playerRotationX = 0;
private var playerIsRed = true;
private var lastCollisionTime : float;
private var onGround : boolean;
private var deathFrames : int;

private var lastCheckpoint : Vector3;

// MENU
private var isPause = false;
private var PauseMenu : Rect = Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 200);

// HUD
var INFO_BOX_TEXTURE : Texture;
private var deathsSinceLastCheckpoint : int;
private var totalDeaths : int;


function Start() {
	deathsSinceLastCheckpoint = 0;
	totalDeaths = 0;
	
	isPause = false;
	lastCheckpoint = transform.position;
   	
   	var meshRenderers = GetComponentsInChildren(MeshRenderer);
	for(var curMR : MeshRenderer in meshRenderers) {
		var curMaterials = curMR.materials;
		for(var i = 0; i < curMaterials.Length; i++) {
			curMaterials[i] = playerColorRed;
		}
		curMR.materials = curMaterials;
    }
    
    // Set animation speed
    transform.Find("PlayerModel").GetComponent(Animation)["Run"].speed = 3f;
    
	spawnPlayer();
}

// Player can change color with buttons, or by hitting a color changer thing?

function Update() {
    if(Input.GetKeyDown(KeyCode.Escape)) {
		isPause = !isPause;
	}
	
	if(isPause) {
		Time.timeScale = 0;
	} else {
		Time.timeScale = 1;
	
		if(Input.GetButtonDown("ChangeGravity")) {
			gravityFlipped = !gravityFlipped;
			audio.PlayOneShot(clapSound);
			
			onGround = false;
	    }
	    
	    // Rotation interpolation proclamation
	    var targetRotX = gravityFlipped ? 180 : 0;
	    playerRotationX += (targetRotX - playerRotationX) * 0.1;
	    
	   	transform.rotation = Quaternion.Euler(playerRotationX, 0, 0);
	    
	    
	    // Color control
	    if(Input.GetButtonDown("ChangeColor")) {
	    	playerIsRed = !playerIsRed;
	    	
	    	var meshRenderers = GetComponentsInChildren(MeshRenderer);
	    	for(var curMR : MeshRenderer in meshRenderers) {
	    		var curMaterials = curMR.materials;
	    		for(var i = 0; i < curMaterials.Length; i++) {
			    	if(playerIsRed) {
				    	curMaterials[i] = playerColorRed;
				    } else {
				    	curMaterials[i] = playerColorBlue;
				    }
				}
				curMR.materials = curMaterials;
		    }
	    }
	    
	    // Face-to-wall interaction algorithm
	    if(Mathf.Abs(rigidbody.velocity.x) < 2) {
	    	deathFrames++;
	    	if(deathFrames >= 3) {
	    		killPlayer();
	    	}
	    } else {
	    	deathFrames = 0;
	    }
		
		rigidbody.velocity.x = SPEED;
		
		// Raytraces to find empty space
		if(!Physics.Raycast(transform.position + Vector3(0, 0, 0.45), Vector3(1, gravityFlipped ? 1 : -1, 0).normalized, 0.7)) {
			onGround = false;
		}
		
		Debug.DrawLine(transform.position + Vector3(0, 0, 0.45), transform.position + Vector3(0.45, 0, 0.45) + Vector3(0, gravityFlipped ? 1 : -1, 0) * 0.7, Color.red);
		
		if(!onGround) {
			rigidbody.velocity.y = gravityFlipped ? GRAVITY : -GRAVITY;
		} else {
			rigidbody.velocity.y = gravityFlipped ? GRAVITY * 0.1 : -GRAVITY * 0.1;
		}
	}
}

function OnCollisionEnter(collision : Collision) {
	onGround = true;
}

function killPlayer() {
	transform.position = lastCheckpoint;
	audio.PlayOneShot(deathSound);
	
	deathsSinceLastCheckpoint++;
	totalDeaths++;
	
	spawnPlayer();
}

function spawnPlayer() {
	transform.Find("ParticlesSpawn").GetComponent(ParticleSystem).Play();
	rigidbody.velocity.x = SPEED;
}

// #GETTERS

function getLastCheckpoint() {
	return lastCheckpoint;
}

function getPlayerIsRed() {
	return playerIsRed;
}

function getDeathsSinceLastCheckpoint() {
	return deathsSinceLastCheckpoint;
}

function setLastCheckpoint(pos : Vector3) {
	deathsSinceLastCheckpoint = 0;
	lastCheckpoint = pos;
}

function OnGUI() {
	// Draw death counters
	GUI.DrawTexture(Rect(0, 0, 500, 100 * (500/600f)), INFO_BOX_TEXTURE, ScaleMode.StretchToFill, true, 0);
	
	var labelStyle = GUI.skin.GetStyle("Label");
	labelStyle.alignment = TextAnchor.UpperLeft;
	labelStyle.fontSize = 18;
	labelStyle.richText = true;
	GUI.Label(Rect(35, 10, 500, 100 * (500/600f)), "<color='#FFF'>Total Deaths: <b>" + totalDeaths + "</b></color>", labelStyle);
	GUI.Label(Rect(35, 40, 500, 100 * (500/600f)), "<color='#FFF'>Deaths since last checkpoint: <b>" + deathsSinceLastCheckpoint + "</b></color>", labelStyle);
	
	// Pause menu
	if(isPause) {
		GUI.Window(0, PauseMenu, PauseMenuFunc, "Pause Menu");
	}
}

function DrawQuad(position : Rect, color : Color) {
	var texture : Texture2D = new Texture2D(1, 1);
	texture.SetPixel(0, 0, color);
	texture.Apply();
	GUI.skin.box.normal.background = texture;
	GUI.Box(position, GUIContent.none);
}

function PauseMenuFunc() {
	if(GUILayout.Button("Main Menu")) {
		isPause = false;
		Time.timeScale = 1;
		Application.LoadLevel("MainMenu");
	}
	if(GUILayout.Button("Restart")) {
		isPause = false;
		Time.timeScale = 1;
		Application.LoadLevel(Application.loadedLevel);
	}
	if(GUILayout.Button("Quit")) {
		Application.Quit();
	}
}
