use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Serialize, Deserialize, sqlx::Type, TS)]
#[ts(export, export_to = "../../src/models/")]
#[sqlx(type_name = "TEXT")]
pub enum TodoStatus {
    Incomplete,
    Complete,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow, TS)]
#[ts(export, export_to = "../../src/models/")]
pub struct Todo {
    pub id: u16,
    pub description: String,
    pub status: TodoStatus,
}
#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../src/models/")]
pub struct TodoForCreate {
    pub description: String,
    pub status: TodoStatus,
}