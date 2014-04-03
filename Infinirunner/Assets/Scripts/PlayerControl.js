#pragma strict

private final static var SPEED = 20;
private final static var GRAVITY = 14;

var clapSound : AudioClip;
var deathSound : AudioClip;

private var gravityFlipped = false;
private var lastCollisionTime : float;
private var onGround : boolean;

public var lastCheckpoint : Vector3;

function Start() {
	lastCheckpoint = transform.position;
}

function Update() {
	if(Input.GetButtonDown("Fire1") || Input.GetKeyDown("space")) {
		gravityFlipped = !gravityFlipped;
		audio.PlayOneShot(clapSound);
		
		onGround = false;
    }
	
	rigidbody.velocity.x = SPEED;
	
	// Raytraces to find empty space
	if(!Physics.Raycast(transform.position + Vector3(0, 0, 0.45), Vector3(0, gravityFlipped ? 1 : -1, 0), 0.7)) {
		onGround = false;
	}
	
	// Debug.DrawLine(transform.position + Vector3(0, 0, 0.45), transform.position + Vector3(0, 0, 0.45) + Vector3(0, gravityFlipped ? 1 : -1, 0) * 0.7, Color.red);
	
	if(!onGround) {
		rigidbody.velocity.y = gravityFlipped ? GRAVITY : -GRAVITY;
	} else {
		rigidbody.velocity.y = gravityFlipped ? GRAVITY * 0.1 : -GRAVITY * 0.1;
	}
}

function OnCollisionEnter(collision : Collision) {
	for (var contact : ContactPoint in collision.contacts) {
		// Reset when we hit a wall
		if(contact.normal == Vector3(-1, 0, 0)) {
			killPlayer();
		}
	}
	
	onGround = true;
}

function killPlayer() {
	gravityFlipped = false;
	transform.position = lastCheckpoint;
	
	audio.PlayOneShot(deathSound);
}
