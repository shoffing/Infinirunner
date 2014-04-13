#pragma strict

function OnTriggerEnter(other : Collider) {
	if(other.gameObject.tag == "Player" && !other.gameObject.GetComponent(PlayerControl).getPlayerIsRed()) {
		other.gameObject.GetComponent(PlayerControl).killPlayer();
	}
}