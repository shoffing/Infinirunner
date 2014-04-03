#pragma strict

function Start() {
	// Randomly rotate spikes for visual effect
	transform.Find("SpikesRedModel").transform.localRotation.y += Random.value * 360;
}

function OnTriggerEnter(other : Collider) {
	if(other.gameObject.tag == "Player") {
		other.gameObject.GetComponent(PlayerControl).killPlayer();
	}
}