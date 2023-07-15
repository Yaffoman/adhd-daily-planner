// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_do_not_disturb])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn set_do_not_disturb(enabled: bool) {
    let script = if enabled {
        "do shell script \"defaults -currentHost write com.apple.notificationcenterui doNotDisturb -boolean true && killall NotificationCenter\" with administrator privileges"
    } else {
        "do shell script \"defaults -currentHost write com.apple.notificationcenterui doNotDisturb -boolean false && killall NotificationCenter\" with administrator privileges"
    };

    let output = Command::new("osascript")
        .arg("-e")
        .arg(script)
        .output()
        .expect("Failed to execute AppleScript");

    // Print the output if any
    if !output.stdout.is_empty() {
        println!("{}", String::from_utf8(output.stdout).unwrap());
    }

    // Print the error if any
    if !output.stderr.is_empty() {
        eprintln!("{}", String::from_utf8(output.stderr).unwrap());
    }
}
