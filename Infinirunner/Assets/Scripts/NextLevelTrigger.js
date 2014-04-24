#pragma strict

public var sceneToLoad : String;

function OnTriggerEnter(other : Collider) {
	Application.LoadLevel(sceneToLoad);
}