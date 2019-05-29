-- 1 up

-- FIXME add IS NOT NULL to columns
CREATE TABLE users (
    id           SERIAL,
    name         TEXT,
    login        TEXT,
    avatar_url   TEXT,
    email        CITEXT,
    access_token TEXT,
    CONSTRAINT user_name_length       CHECK (length(name)         <= 39),
    CONSTRAINT user_login_length      CHECK (length(login)        <= 39),
    CONSTRAINT user_avatar_url_length CHECK (length(avatar_url)   <= 256),
    CONSTRAINT access_token_length    CHECK (length(access_token) <= 40),

    -- This requirement is a willful violation of RFC 5322, which defines a syntax for e-mail
    -- addresses that is simultaneously too strict (before the "@" character), too vague (after the
    -- "@" character), and too lax (allowing comments, whitespace characters, and quoted strings in
    -- manners unfamiliar to most users) to be of practical use here.
    --
    -- The following JavaScript- and Perl-compatible regular expression is an implementation of the
    -- above definition.
    CONSTRAINT email_check
      CHECK ( email ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' ),
    UNIQUE(login),
    UNIQUE(email)
);

COMMENT ON COLUMN users.access_token IS 'access token for github OAuth';
COMMENT ON COLUMN users.name         IS 'name from github';
COMMENT ON COLUMN users.login        IS 'login from github';
COMMENT ON COLUMN users.avatar_url   IS 'avatar_url from github';

-- 1 down

DROP TABLE users;
