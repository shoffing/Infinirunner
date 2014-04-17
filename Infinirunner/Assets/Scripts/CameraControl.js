#pragma strict

private static final var CAM_DISTANCE_Z : float = 13;
private static final var PERCENT : float = 0.25;

private var player : GameObject;
private var cam : Camera;

function Start() {
	cam = GetComponent(Camera);
	player = GameObject.FindWithTag("Player");
}

function Update() {
	// Calculate horizontal FOV, distance to player on Z axis, and then finally how much to offset along X
	var hfov = 2 * Mathf.Atan(Mathf.Tan(cam.fieldOfView * Mathf.Deg2Rad / 2) * cam.aspect);
	var camOffsetX = 2 * Mathf.Tan(hfov / 2) * CAM_DISTANCE_Z * (0.5 - PERCENT);
	
	transform.position.x = player.transform.position.x + camOffsetX;
	transform.position.y += (player.transform.position.y - transform.position.y) * 0.05;
	transform.position.z = player.transform.position.z - CAM_DISTANCE_Z;
}
