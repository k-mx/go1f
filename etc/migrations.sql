-- 1 up

CREATE TABLE users (
  id SERIAL,
  name TEXT,
  email CITEXT,
  CONSTRAINT user_name_length CHECK (length(name) <= 32),

  -- This requirement is a willful violation of RFC 5322, which defines a syntax for e-mail
  -- addresses that is simultaneously too strict (before the "@" character), too vague (after the
  -- "@" character), and too lax (allowing comments, whitespace characters, and quoted strings in
  -- manners unfamiliar to most users) to be of practical use here.
  --
  -- The following JavaScript- and Perl-compatible regular expression is an implementation of the
  -- above definition.
  CONSTRAINT email_check
    CHECK ( email ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' ),
  UNIQUE(name),
  UNIQUE(email)
);

-- 1 down

DROP TABLE users;
