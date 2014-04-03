#pragma strict

public var checkpointTexture : Texture2D;
private var checkpointTextTimer : float;
private static final var CHECKPOINT_TEXT_DURATION : float = 1;

function Start() {
	checkpointTextTimer = -9999;
}

function OnTriggerEnter(other : Collider) {
	if(other.gameObject.tag == "Player" && other.gameObject.GetComponent(PlayerControl).lastCheckpoint != transform.position) {
		other.gameObject.GetComponent(PlayerControl).lastCheckpoint = transform.position;
		checkpointTextTimer = Time.realtimeSinceStartup;
		
		audio.Play();
	}
}

function OnGUI() {
	var timeSinceHit : float = Time.realtimeSinceStartup - checkpointTextTimer;
	if(timeSinceHit < CHECKPOINT_TEXT_DURATION) {
		var imgWidth = Screen.width / 2;
		var imgHeight = imgWidth * 0.16;
		
		GUI.color = new Color32(255, 255, 255, 255 * (1 - timeSinceHit / CHECKPOINT_TEXT_DURATION));
		GUI.DrawTexture(Rect(Screen.width / 2 - imgWidth / 2, Screen.height / 2 - imgHeight / 2, imgWidth, imgHeight), checkpointTexture);
	}
}