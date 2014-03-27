#pragma strict

private final static var SPEED = 20;
private final static var GRAVITY = 14;

var clapSound : AudioClip;

private var gravityFlipped = false;
private var lastCollisionTime : float;

function Update() {
	if(Input.GetButtonDown("Fire1") || Input.GetKeyDown("space")) {
		gravityFlipped = !gravityFlipped;
		audio.PlayOneShot(clapSound);
		
		onGround = false;
    }
	
	rigidbody.velocity.x = SPEED;
	
	if(!onGround) {
		rigidbody.velocity.y = gravityFlipped ? GRAVITY : -GRAVITY;
	}
}


function OnCollisionEnter(collision : Collision) {
	for (var contact : ContactPoint in collision.contacts) {
		// Reset when we hit a wall
		if(contact.normal == Vector3(-1, 0, 0)) {
			Application.LoadLevel(Application.loadedLevel);
		}
	}
}

function OnCollisionExit(collision : Collision) {
	onGround = false;
}