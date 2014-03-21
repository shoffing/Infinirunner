using UnityEngine;
using System.Collections;

public class SlowMotion : MonoBehaviour {
	private CharacterController player; //Stuff like this is always private unless you are are manually setting it in the editor
	public float SlowAmount; //With this public you can edit it in the editor
	public float SlowRate;
	private AudioSource[] SoundSources;
	public string SlomoKey = "space";

	// Use this for initialization
	void Start () {
		player = GetComponent<CharacterController>(); //Grab the CharacterController component
		Debug.Log( player ); //Check if it worked (comment out when done...if you feel like it, whatev.)

		SoundSources = FindObjectsOfType(typeof(AudioSource)) as AudioSource[]; //Check objects for an AudioSource and add  to array
	}
	
	// Update is called once per frame
	void Update () {
		//CharacterControllers have a velocity property so let's check if we are moving
		if( Input.GetKey( SlomoKey.ToLower() ) )
		{
			Time.timeScale = Mathf.Lerp(Time.timeScale, SlowAmount, SlowRate); //TimeScale affects anything using Time.deltaTime (A lot of stuff...even particles!)
			Time.fixedDeltaTime = 0.02F * Time.timeScale; 
			//We have to do this because physics runs on its own discrete timer, 
			//50 fps by default, which setting timeScale to .5 effectively halves.
			//In short, this keeps movement from being jerky.

			foreach( AudioSource source in SoundSources )//Loop through stored AudioSources and change their pitch
			{
				source.pitch = Time.timeScale+0.3F;
			}
		}
		else
		{
			Time.timeScale = Mathf.Lerp(Time.timeScale, 1, SlowRate);
			//Time.timeScale = 1.0F; //If not moving then put it back to normal time scale
			Time.fixedDeltaTime = 0.02F * Time.timeScale; //I do this just in case but probably not needed

			foreach( AudioSource source in SoundSources ) //Loop through stored AudioSources and change their pitch
			{
				source.pitch = Time.timeScale;
			}
		}

	}
}
