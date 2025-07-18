CREATE TABLE users (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(300) NOT NULL,
    password character varying(200) NOT NULL,
    token character varying(200)
);

CREATE TABLE notes (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    category_id bigint NOT NULL,
    title character varying(70) NOT NULL,
    created date NOT NULL,
    link text NOT NULL,
    content text NOT NULL
);

CREATE TABLE category (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    category character varying(70) NOT NULL
);