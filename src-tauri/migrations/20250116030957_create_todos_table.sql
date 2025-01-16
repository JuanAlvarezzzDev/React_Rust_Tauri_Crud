-- Add migration script here
CREATE TABLE todos (
    id INTEGER PRIMARY KEY,
    description TEXT,
    status VARCHAR(30)
);