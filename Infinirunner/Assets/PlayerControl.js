#pragma strict

private final static var SPEED = 50;
private final static var GRAVITY = 14;

private var gravityFlipped = false;

function Update() {
	if(Input.GetKeyDown("w")) gravityFlipped = true;
	if(Input.GetKeyDown("s")) gravityFlipped = false;
	
	rigidbody.velocity.x = SPEED;
	rigidbody.velocity.y = gravityFlipped ? GRAVITY : -GRAVITY;
}