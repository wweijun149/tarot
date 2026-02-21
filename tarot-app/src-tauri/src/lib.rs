use tauri::Manager;

/// 將占卜結果儲存為 txt 檔案
#[tauri::command]
fn save_reading(content: String) -> Result<String, String> {
    // 回傳成功訊息，實際儲存交由前端的 tauri dialog API
    Ok(format!("準備儲存 {} 字元的占卜記錄", content.len()))
}

/// 取得應用程式版本
#[tauri::command]
fn get_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            // 開發模式下自動開啟 DevTools
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![save_reading, get_version])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
