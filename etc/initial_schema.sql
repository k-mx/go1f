\set db  'go1f_db'
\set usr 'go1f'

DROP DATABASE IF EXISTS :db;
DROP ROLE     IF EXISTS :usr;

-- set password later
CREATE USER go1f WITH PASSWORD NULL;
CREATE DATABASE :db OWNER :usr;

REVOKE CREATE ON SCHEMA public FROM PUBLIC;
