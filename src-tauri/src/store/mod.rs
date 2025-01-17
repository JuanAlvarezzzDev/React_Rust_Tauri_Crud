use crate::db;

pub struct AppState {
    pub(crate) db: db::Db,
}
