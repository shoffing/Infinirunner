#pragma strict

private final static var SPEED = 20;
private final static var GRAVITY = 14;

var Clap : AudioClip;

private var gravityFlipped = false;
private var clickSwitch: boolean = false;

function Update() {
	if(Input.GetButtonDown ("Fire1")){
        clickSwitch = !clickSwitch;
 
        if (clickSwitch){
        	gravityFlipped = true;
            print("Up");
            audio.PlayOneShot(Clap);
        } else {
        	gravityFlipped = false;
            print("Down");
            audio.PlayOneShot(Clap);
        }
    }
    //if(Input.GetKeyDown("r")) Application.LoadLevel("Level1");
    if(Input.GetKeyDown("r")) transform.position = Vector3(-90,3,0);
	//if(Input.GetKeyDown("w")) gravityFlipped = true;
	//if(Input.GetKeyDown("s")) gravityFlipped = false;
	
	rigidbody.velocity.x = SPEED;
	rigidbody.velocity.y = gravityFlipped ? GRAVITY : -GRAVITY;
}