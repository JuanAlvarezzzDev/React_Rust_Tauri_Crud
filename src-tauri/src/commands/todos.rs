use crate::models::todo::Todo;
use crate::store::AppState;
use futures::TryStreamExt;
use tauri::State;

#[tauri::command]
pub async fn get_todos(state: State<'_, AppState>) -> Result<Vec<Todo>, String> {
    let db = &state.db;
    let todos: Vec<Todo> = sqlx
        ::query_as::<_, Todo>("SELECT * FROM todos")
        .fetch(db)
        .try_collect().await
        .map_err(|e| format!("Failed to get todos: {}", e))?;
    Ok(todos)
}

#[tauri::command]
pub async fn update_todo(state: State<'_, AppState>, todo: Todo) -> Result<(), String> {
    let db = &state.db;
    sqlx
        ::query("INSERT OR REPLACE INTO todos (id, description, status) VALUES (?1, ?2, ?3)")
        .bind(todo.id)
        .bind(todo.description)
        .bind(todo.status)
        .execute(db).await
        .map_err(|e| format!("Could not update or insert todo: {}", e))?;
    Ok(())
}

#[tauri::command]
pub async fn delete_todo(state: State<'_, AppState>, id: u16) -> Result<(), String> {
    let db = &state.db;
    sqlx
        ::query("DELETE FROM todos WHERE id = ?1")
        .bind(id)
        .execute(db).await
        .map_err(|e| format!("Could not delete todo: {}", e))?;
    Ok(())
}
