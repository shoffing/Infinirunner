#pragma strict

// JavaScript
private var MainMenu : Rect = Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 200);

function OnGUI() {
	GUI.Window(0, MainMenu, MainMenuFunc, "Infinirunner");
}

function MainMenuFunc() {
	if(GUILayout.Button("Start Game")) {
		Application.LoadLevel("level1");
	}
	if(GUILayout.Button("Quit")) {
		Application.Quit();
	}
}