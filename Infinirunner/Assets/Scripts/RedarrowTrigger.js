#pragma strict
function Start () {

}

function Update () {

}
function OnTriggerEnter (other : Collider) {
  var targetScript : PlayerControl = other.gameObject.GetComponent( PlayerControl );
  if( targetScript != null ){
 	targetScript.gravityFlipped = false;
 	targetScript.clickSwitch = false;
	}
 }