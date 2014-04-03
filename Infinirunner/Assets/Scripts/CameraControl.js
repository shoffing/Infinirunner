#pragma strict

var player : GameObject;

function Update() {
	transform.position.x = player.transform.position.x;
	transform.position.y += (player.transform.position.y - transform.position.y) * 0.05;
}