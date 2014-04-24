#pragma strict

private final static var SPEED = 15;
private final static var GRAVITY = 15;

var clapSound : AudioClip;
var deathSound : AudioClip;

var playerColorRed : Material;
var playerColorBlue : Material;

private var gravityFlipped = false;
private var playerIsRed = true;
private var lastCollisionTime : float;
private var onGround : boolean;
private var deathFrames : int;

private var lastCheckpoint : Vector3;

function Start() {
	lastCheckpoint = transform.position;
	transform.Find("PlayerModel").GetComponent(MeshRenderer).material = playerColorRed;
	spawnPlayer();
}

// Player can change color with buttons, or by hitting a color changer thing?


function Update() {
	if(Input.GetButtonDown("ChangeGravity")) {
		gravityFlipped = !gravityFlipped;
		audio.PlayOneShot(clapSound);
		
		onGround = false;
    }
    
    // Color control
    if(Input.GetButtonDown("ChangeColor")) {
    	playerIsRed = !playerIsRed;
    	
    	if(playerIsRed) {
	    	transform.Find("PlayerModel").GetComponent(MeshRenderer).material = playerColorRed;
	    } else {
	    	transform.Find("PlayerModel").GetComponent(MeshRenderer).material = playerColorBlue;
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

function OnCollisionEnter(collision : Collision) {
	onGround = true;
}

function killPlayer() {
	gravityFlipped = false;
	transform.position = lastCheckpoint;
	audio.PlayOneShot(deathSound);
	
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

function setLastCheckpoint(pos : Vector3) {
	lastCheckpoint = pos;
}
