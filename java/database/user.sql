-- ********************************************************************************
-- This script creates the database users and grants them the necessary permissions
-- ********************************************************************************

CREATE USER moodboard_owner
WITH PASSWORD 'moodboard';

GRANT ALL
ON ALL TABLES IN SCHEMA public
TO moodboard_owner;

GRANT ALL
ON ALL SEQUENCES IN SCHEMA public
TO moodboard_owner;

CREATE USER moodboard_appuser
WITH PASSWORD 'moodboard';

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO moodboard_appuser;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO moodboard_appuser;
