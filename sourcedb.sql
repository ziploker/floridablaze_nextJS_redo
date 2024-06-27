--
-- PostgreSQL database dump
--

-- Dumped from database version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: stories; Type: TABLE; Schema: public; Owner: ziploker
--

CREATE TABLE public.stories (
    title character varying(80),
    keywords character varying(80),
    body text,
    url character varying(80),
    date character varying(80),
    topic character varying(80),
    slug character varying(80),
    author_nick character varying(80),
    author_avatar character varying(80),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    avatar_url character varying(80),
    nick character varying(80),
    auth_token character varying(80),
    number_of_comments integer DEFAULT 0,
    usercreatedautomatically boolean DEFAULT false,
    first_name character varying(80),
    last_name character varying(80),
    reset_password_token character varying(80),
    reset_password_sent_at timestamp with time zone
);


ALTER TABLE public.stories OWNER TO ziploker;

--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: ziploker
--

COPY public.stories (title, keywords, body, url, date, topic, slug, author_nick, author_avatar, created_at, updated_at, avatar_url, nick, auth_token, number_of_comments, usercreatedautomatically, first_name, last_name, reset_password_token, reset_password_sent_at) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

