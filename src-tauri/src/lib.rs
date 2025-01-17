mod db;
mod models;
use tauri::Manager;
use db::setup_db;

struct AppState {
    db: db::Db,
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![])
        .setup(|app|{
            tauri::async_runtime::block_on(async move {
                let db = setup_db(&app).await;
                app.manage(AppState{db});
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
