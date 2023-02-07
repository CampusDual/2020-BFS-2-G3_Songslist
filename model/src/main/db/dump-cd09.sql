--
-- PostgreSQL database dump
--

-- Dumped from database version 11.16 (Debian 11.16-0+deb10u1)
-- Dumped by pg_dump version 14.2

-- Started on 2023-02-07 17:56:20

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

DROP DATABASE cd09;
--
-- TOC entry 3581 (class 1262 OID 16401)
-- Name: cd09; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE cd09 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


\connect cd09

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

--
-- TOC entry 11 (class 2615 OID 205902)
-- Name: songlist; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA songlist;


SET default_tablespace = '';

--
-- TOC entry 406 (class 1259 OID 206044)
-- Name: talbum; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.talbum (
    id_album integer NOT NULL,
    name_album character varying,
    description_album text,
    img_album character varying,
    year_album date,
    id_genre integer,
    id_artist integer
);


--
-- TOC entry 405 (class 1259 OID 206042)
-- Name: talbum_id_album_seq; Type: SEQUENCE; Schema: songlist; Owner: -
--

CREATE SEQUENCE songlist.talbum_id_album_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3582 (class 0 OID 0)
-- Dependencies: 405
-- Name: talbum_id_album_seq; Type: SEQUENCE OWNED BY; Schema: songlist; Owner: -
--

ALTER SEQUENCE songlist.talbum_id_album_seq OWNED BY songlist.talbum.id_album;


--
-- TOC entry 410 (class 1259 OID 206066)
-- Name: tartist; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tartist (
    id_artist integer NOT NULL,
    name_artist character varying,
    img_artist character varying,
    description_artist text
);


--
-- TOC entry 409 (class 1259 OID 206064)
-- Name: tartist_id_artist_seq; Type: SEQUENCE; Schema: songlist; Owner: -
--

CREATE SEQUENCE songlist.tartist_id_artist_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3583 (class 0 OID 0)
-- Dependencies: 409
-- Name: tartist_id_artist_seq; Type: SEQUENCE OWNED BY; Schema: songlist; Owner: -
--

ALTER SEQUENCE songlist.tartist_id_artist_seq OWNED BY songlist.tartist.id_artist;


--
-- TOC entry 408 (class 1259 OID 206055)
-- Name: tgenre; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tgenre (
    id_genre integer NOT NULL,
    name_genre character varying
);


--
-- TOC entry 407 (class 1259 OID 206053)
-- Name: tgenre_id_genre_seq; Type: SEQUENCE; Schema: songlist; Owner: -
--

CREATE SEQUENCE songlist.tgenre_id_genre_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3584 (class 0 OID 0)
-- Dependencies: 407
-- Name: tgenre_id_genre_seq; Type: SEQUENCE OWNED BY; Schema: songlist; Owner: -
--

ALTER SEQUENCE songlist.tgenre_id_genre_seq OWNED BY songlist.tgenre.id_genre;


--
-- TOC entry 394 (class 1259 OID 205915)
-- Name: ti18n; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.ti18n (
    id_i18n integer NOT NULL,
    class_name character varying(150),
    i18n_description character varying(250)
);


--
-- TOC entry 393 (class 1259 OID 205909)
-- Name: ti18n_value; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.ti18n_value (
    id_i18n_value integer NOT NULL,
    id_i18n integer NOT NULL,
    "KEY" character varying(250),
    es_es character varying(10485760),
    en_us character varying(10485760),
    gl_es character varying(10485760)
);


--
-- TOC entry 411 (class 1259 OID 206090)
-- Name: tlists_songlist; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tlists_songlist (
    id_list_songlist integer NOT NULL,
    id_songlist integer,
    id_song integer
);


--
-- TOC entry 418 (class 1259 OID 206153)
-- Name: tlists_songlist_id_lists_songlist_seq; Type: SEQUENCE; Schema: songlist; Owner: -
--

CREATE SEQUENCE songlist.tlists_songlist_id_lists_songlist_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3585 (class 0 OID 0)
-- Dependencies: 418
-- Name: tlists_songlist_id_lists_songlist_seq; Type: SEQUENCE OWNED BY; Schema: songlist; Owner: -
--

ALTER SEQUENCE songlist.tlists_songlist_id_lists_songlist_seq OWNED BY songlist.tlists_songlist.id_list_songlist;


--
-- TOC entry 392 (class 1259 OID 205903)
-- Name: trequest_statistics; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.trequest_statistics (
    id_request_statistics integer NOT NULL,
    service_name character varying(255),
    method_name character varying(50),
    user_name character varying(50),
    execution_date date,
    execution_time integer,
    method_params character varying(5000),
    service_exception character varying(5000)
);


--
-- TOC entry 395 (class 1259 OID 205918)
-- Name: trole; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.trole (
    id_rolename integer NOT NULL,
    rolename character varying(255),
    xmlclientpermission character varying(10485760)
);


--
-- TOC entry 399 (class 1259 OID 205945)
-- Name: trole_server_permission; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.trole_server_permission (
    id_role_server_permission integer NOT NULL,
    id_rolename integer,
    id_server_permission integer
);


--
-- TOC entry 396 (class 1259 OID 205924)
-- Name: tserver_permission; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tserver_permission (
    id_server_permission integer NOT NULL,
    permission_name character varying(10485760)
);


--
-- TOC entry 397 (class 1259 OID 205930)
-- Name: tsetting; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tsetting (
    id_setting integer NOT NULL,
    setting_key character varying(10485760),
    setting_value character varying(10485760),
    setting_comment character varying(10485760)
);


--
-- TOC entry 412 (class 1259 OID 206093)
-- Name: tsong; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tsong (
    id_song integer NOT NULL,
    name_song character varying,
    description_song text
);


--
-- TOC entry 416 (class 1259 OID 206118)
-- Name: tsong_album; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tsong_album (
    song_album_id integer NOT NULL,
    id_song integer,
    id_album integer
);


--
-- TOC entry 415 (class 1259 OID 206116)
-- Name: tsong_album_song_album_id_seq; Type: SEQUENCE; Schema: songlist; Owner: -
--

CREATE SEQUENCE songlist.tsong_album_song_album_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3586 (class 0 OID 0)
-- Dependencies: 415
-- Name: tsong_album_song_album_id_seq; Type: SEQUENCE OWNED BY; Schema: songlist; Owner: -
--

ALTER SEQUENCE songlist.tsong_album_song_album_id_seq OWNED BY songlist.tsong_album.song_album_id;


--
-- TOC entry 413 (class 1259 OID 206096)
-- Name: tsong_id_song_seq; Type: SEQUENCE; Schema: songlist; Owner: -
--

CREATE SEQUENCE songlist.tsong_id_song_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3587 (class 0 OID 0)
-- Dependencies: 413
-- Name: tsong_id_song_seq; Type: SEQUENCE OWNED BY; Schema: songlist; Owner: -
--

ALTER SEQUENCE songlist.tsong_id_song_seq OWNED BY songlist.tsong.id_song;


--
-- TOC entry 414 (class 1259 OID 206113)
-- Name: tsonglist; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tsonglist (
    id_songlist integer NOT NULL,
    name_songlist character varying,
    description_songlist text,
    id_user integer
);


--
-- TOC entry 417 (class 1259 OID 206135)
-- Name: tsonglist_id_songlist_seq; Type: SEQUENCE; Schema: songlist; Owner: -
--

CREATE SEQUENCE songlist.tsonglist_id_songlist_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3588 (class 0 OID 0)
-- Dependencies: 417
-- Name: tsonglist_id_songlist_seq; Type: SEQUENCE OWNED BY; Schema: songlist; Owner: -
--

ALTER SEQUENCE songlist.tsonglist_id_songlist_seq OWNED BY songlist.tsonglist.id_songlist;


--
-- TOC entry 402 (class 1259 OID 206001)
-- Name: tuser; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tuser (
    nick_user character varying,
    password_user character varying,
    id_user integer NOT NULL,
    email_user character varying,
    name_user character varying,
    surname_user character varying,
    description_user text,
    db_schema character varying,
    create_date_user date,
    delete_date_user date,
    birthdate_user timestamp without time zone
);


--
-- TOC entry 401 (class 1259 OID 205999)
-- Name: tuser_id_user_seq; Type: SEQUENCE; Schema: songlist; Owner: -
--

CREATE SEQUENCE songlist.tuser_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3589 (class 0 OID 0)
-- Dependencies: 401
-- Name: tuser_id_user_seq; Type: SEQUENCE OWNED BY; Schema: songlist; Owner: -
--

ALTER SEQUENCE songlist.tuser_id_user_seq OWNED BY songlist.tuser.id_user;


--
-- TOC entry 398 (class 1259 OID 205939)
-- Name: tuser_preference; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tuser_preference (
    preference_name character varying(150),
    user_login character varying(150),
    preference_value character varying(10485760),
    id_user_preference integer NOT NULL
);


--
-- TOC entry 403 (class 1259 OID 206019)
-- Name: tuser_preference_id_user_preference_seq; Type: SEQUENCE; Schema: songlist; Owner: -
--

CREATE SEQUENCE songlist.tuser_preference_id_user_preference_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3590 (class 0 OID 0)
-- Dependencies: 403
-- Name: tuser_preference_id_user_preference_seq; Type: SEQUENCE OWNED BY; Schema: songlist; Owner: -
--

ALTER SEQUENCE songlist.tuser_preference_id_user_preference_seq OWNED BY songlist.tuser_preference.id_user_preference;


--
-- TOC entry 400 (class 1259 OID 205948)
-- Name: tuser_role; Type: TABLE; Schema: songlist; Owner: -
--

CREATE TABLE songlist.tuser_role (
    id_rolename integer,
    id_user integer,
    id_user_role integer NOT NULL
);


--
-- TOC entry 404 (class 1259 OID 206030)
-- Name: tuser_role_id_user_role_seq; Type: SEQUENCE; Schema: songlist; Owner: -
--

CREATE SEQUENCE songlist.tuser_role_id_user_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3591 (class 0 OID 0)
-- Dependencies: 404
-- Name: tuser_role_id_user_role_seq; Type: SEQUENCE OWNED BY; Schema: songlist; Owner: -
--

ALTER SEQUENCE songlist.tuser_role_id_user_role_seq OWNED BY songlist.tuser_role.id_user_role;


--
-- TOC entry 3394 (class 2604 OID 206047)
-- Name: talbum id_album; Type: DEFAULT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.talbum ALTER COLUMN id_album SET DEFAULT nextval('songlist.talbum_id_album_seq'::regclass);


--
-- TOC entry 3396 (class 2604 OID 206069)
-- Name: tartist id_artist; Type: DEFAULT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tartist ALTER COLUMN id_artist SET DEFAULT nextval('songlist.tartist_id_artist_seq'::regclass);


--
-- TOC entry 3395 (class 2604 OID 206058)
-- Name: tgenre id_genre; Type: DEFAULT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tgenre ALTER COLUMN id_genre SET DEFAULT nextval('songlist.tgenre_id_genre_seq'::regclass);


--
-- TOC entry 3397 (class 2604 OID 206155)
-- Name: tlists_songlist id_list_songlist; Type: DEFAULT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tlists_songlist ALTER COLUMN id_list_songlist SET DEFAULT nextval('songlist.tlists_songlist_id_lists_songlist_seq'::regclass);


--
-- TOC entry 3398 (class 2604 OID 206098)
-- Name: tsong id_song; Type: DEFAULT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tsong ALTER COLUMN id_song SET DEFAULT nextval('songlist.tsong_id_song_seq'::regclass);


--
-- TOC entry 3400 (class 2604 OID 206121)
-- Name: tsong_album song_album_id; Type: DEFAULT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tsong_album ALTER COLUMN song_album_id SET DEFAULT nextval('songlist.tsong_album_song_album_id_seq'::regclass);


--
-- TOC entry 3399 (class 2604 OID 206137)
-- Name: tsonglist id_songlist; Type: DEFAULT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tsonglist ALTER COLUMN id_songlist SET DEFAULT nextval('songlist.tsonglist_id_songlist_seq'::regclass);


--
-- TOC entry 3393 (class 2604 OID 206004)
-- Name: tuser id_user; Type: DEFAULT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tuser ALTER COLUMN id_user SET DEFAULT nextval('songlist.tuser_id_user_seq'::regclass);


--
-- TOC entry 3391 (class 2604 OID 206021)
-- Name: tuser_preference id_user_preference; Type: DEFAULT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tuser_preference ALTER COLUMN id_user_preference SET DEFAULT nextval('songlist.tuser_preference_id_user_preference_seq'::regclass);


--
-- TOC entry 3392 (class 2604 OID 206032)
-- Name: tuser_role id_user_role; Type: DEFAULT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tuser_role ALTER COLUMN id_user_role SET DEFAULT nextval('songlist.tuser_role_id_user_role_seq'::regclass);


--
-- TOC entry 3563 (class 0 OID 206044)
-- Dependencies: 406
-- Data for Name: talbum; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.talbum VALUES (2, 'Kill ''em All', 'Kill ''Em All is the debut studio album by American heavy metal band Metallica, released on July 25, 1983, through the independent label Megaforce Records. Metallica began by playing shows in local clubs in Los Angeles. They recorded several demos to gain attention from club owners and eventually relocated to San Francisco to secure the services of bassist Cliff Burton.', '2', '1983-07-25', 2, 2);
INSERT INTO songlist.talbum VALUES (1, 'The Bends', 'The Bends had an influence on the subsequent generation of British pop bands. In 2006, The Observer listed it as one of "the 50 albums that changed music"', '9', '1994-11-01', 1, 1);
INSERT INTO songlist.talbum VALUES (3, 'The Stone Roses', 'The Stone Roses LP was recorded between June 1988 and Febuary 1989 by the Stone Roses with producer John Leckie.', '3', '1983-07-25', 1, 3);
INSERT INTO songlist.talbum VALUES (4, 'Please Please Me', 'Please Please Me is the first studio album of The Beatles.', '4', '1963-03-22', 3, 4);
INSERT INTO songlist.talbum VALUES (5, 'With the Beatles', 'With The Beatles is the second studio album by the English rock group The Beatles. It was released on 22 November 1963 on Parlophone, and was recorded four months after the band''s debut Please Please Me.', '5', '1963-11-22', 3, 4);
INSERT INTO songlist.talbum VALUES (6, 'A Hard Day''s Night', 'A Hard Day''s Night is the third studio album by The Beatles, released on 10 July 1964 as the soundtrack to their film A Hard Day''s Night.', '6', '1964-07-10', 3, 4);
INSERT INTO songlist.talbum VALUES (7, 'Beatles for Sale', 'Beatles for Sale is The Beatles'' fourth album, released in late 1964 and produced by George Martin for Parlophone, released on mono (catalogue number PMC 1240) and stereo (PCS 3062).', '7', '1964-12-04', 3, 4);
INSERT INTO songlist.talbum VALUES (8, 'Iron Maiden', 'ron Maiden, released on April 14, 1980, is the debut album by the British rock band Iron Maiden. It was released by EMI in the UK, reaching number 4 in the UK album charts.', '8', '1980-04-14', 4, 5);
INSERT INTO songlist.talbum VALUES (9, 'Pablo Honey', 'Pablo Honey is the first studio album by English alternative rock band Radiohead, first released in early 1993. The album''s title comes from a Jerky Boys prank call skit in which the prank caller says, "Pablo, honey? Please come to Florida!" to his victim.', '1', '1993-01-25', 1, 1);
INSERT INTO songlist.talbum VALUES (10, 'England''s Newest Hit Makers', 'The Rolling Stones is the debut studio album by the English rock band of the same name, released by Decca Records in the UK on 16 April 1964. The American edition of the LP, with a slightly different track list, came out on London Records on 30 May 1964, subtitled England''s Newest Hit Makers, which later became its official title', '10', '1964-05-29', 3, 6);
INSERT INTO songlist.talbum VALUES (11, 'High Voltage', 'High Voltage is the first internationally released album by Australian hard rock band AC/DC. It contains tracks from their first two Australia-only issued albums, High Voltage and T.N.T.', '11', '1976-03-01', 3, 7);
INSERT INTO songlist.talbum VALUES (12, 'Showbiz', 'Showbiz is the debut album by English alternative rock band Muse, released on 4 October 1999 in the United Kingdom. Recorded between April and May at RAK Studios, London and Sawmills Studio, Cornwall, the album was produced by John Leckie and Paul Reeve in conjunction with the band.', '12', '1999-09-04', 1, 8);
INSERT INTO songlist.talbum VALUES (13, 'El Mar No Cesa', 'El Mar No Cesa (Spanish: The Sea Won''t Stop) is the debut album of Spanish rock band Héroes del Silencio, released on October 31 1988.[1] It went platinum quickly, and made them one of the greatest rock bands of Spain.', '13', '1988-10-31', 5, 9);


--
-- TOC entry 3567 (class 0 OID 206066)
-- Dependencies: 410
-- Data for Name: tartist; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tartist VALUES (1, 'Radiohead', '1', 'Radiohead is a English rock band formed in Abingdon, Oxfordshire, in 1985. The band consists of Thom Yorke (vocals, guitar, piano, keyboards); brothers Jonny Greenwood (lead guitar, keyboards, other instruments) and Colin Greenwood (bass); Ed O''Brien (guitar, backing vocals); and Philip Selway (drums, percussion)');
INSERT INTO songlist.tartist VALUES (2, 'Metallica', '2', 'formed in 1981 in Los Angeles by vocalist/guitarist James Hetfield and drummer Lars Ulrich, and has been based in San Francisco for most of its career. The band''s fast tempos, instrumentals and aggressive musicianship made them one of the founding "big four" bands of thrash metal, alongside Megadeth, Anthrax and Slayer.');
INSERT INTO songlist.tartist VALUES (3, 'The Stone Roses', '3', 'The Stone Roses were an English rock band formed in Manchester in 1983. One of the pioneering groups of the Madchester movement in the late 1980s and early 1990s, the band''s classic and most prominent lineup consisted of vocalist Ian Brown, guitarist John Squire, bassist Mani and drummer Reni. The band released their debut album, The Stone Roses, in 1989');
INSERT INTO songlist.tartist VALUES (4, 'The Beatles', '4', 'The Beatles were an English rock band formed in Liverpool in 1960. With the line-up comprising of John Lennon, Paul McCartney, George Harrison and Ringo Starr, they are regarded as one of the most influential bands of all time. The group was integral to the development of 1960s counterculture and popular music''s recognition as an art form. ');
INSERT INTO songlist.tartist VALUES (5, 'Iron Maiden', '5', 'Iron Maiden is an English heavy metal band formed in Leyton, East London, in 1975 by bassist and primary songwriter Steve Harris. While fluid in the early years of the band, the lineup for most of the band''s history has consisted of Harris, lead vocalist Bruce Dickinson, drummer Nicko McBrain, and guitarists Dave Murray, Adrian Smith and Janick Gers.');
INSERT INTO songlist.tartist VALUES (6, 'The Rolling Stones', '6', 'The Rolling Stones are an English rock band formed in London in 1962. Active for six decades, they are one of the most popular and enduring bands of the rock era. In the early 1960s, the Rolling Stones pioneered the gritty, rhythmically driven sound that came to define hard rock. ');
INSERT INTO songlist.tartist VALUES (7, 'AC/DC', '7', 'AC/DC are an Australian rock band formed in Sydney in 1973 by Scottish-born brothers Malcolm and Angus Young. Their music has been variously described as hard rock, blues rock, and heavy metal, but the band calls it simply "rock and roll". AC/DC underwent several line-up changes before releasing their first album, 1975''s High Voltage. ');
INSERT INTO songlist.tartist VALUES (8, 'Muse', '8', 'Muse is an English rock band from Teignmouth, Devon, formed in 1994. The band consists of Matt Bellamy (lead vocals, guitar, keyboards), Chris Wolstenholme (bass guitar, backing vocals), and Dominic Howard (drums). They released their debut album, Showbiz, in 1999, showcasing Bellamy''s falsetto and a melancholic alternative rock style.');
INSERT INTO songlist.tartist VALUES (9, 'Héroes del Silencio', '9', 'Héroes del Silencio (sometimes referred to as just Héroes) were a Spanish rock band from Zaragoza, Aragon, Spain formed by Juan Valdivia in 1987. In the 1990s they experienced success around Spain and the Americas, and various European countries including Germany, Belgium, Switzerland, France and Portugal becoming a successful Spanish group and icons in the history of the Rock en Español scene. ');


--
-- TOC entry 3565 (class 0 OID 206055)
-- Dependencies: 408
-- Data for Name: tgenre; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tgenre VALUES (1, 'Alternative Rock');
INSERT INTO songlist.tgenre VALUES (2, 'Trash Metal');
INSERT INTO songlist.tgenre VALUES (3, 'Rock');
INSERT INTO songlist.tgenre VALUES (4, 'Heavy Metal');
INSERT INTO songlist.tgenre VALUES (5, 'Spanish Rock');


--
-- TOC entry 3551 (class 0 OID 205915)
-- Dependencies: 394
-- Data for Name: ti18n; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.ti18n VALUES (0, 'i18n.bundle', 'Resource bundle in database');


--
-- TOC entry 3550 (class 0 OID 205909)
-- Dependencies: 393
-- Data for Name: ti18n_value; Type: TABLE DATA; Schema: songlist; Owner: -
--



--
-- TOC entry 3568 (class 0 OID 206090)
-- Dependencies: 411
-- Data for Name: tlists_songlist; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tlists_songlist VALUES (4, 6, 119);
INSERT INTO songlist.tlists_songlist VALUES (5, 6, 123);
INSERT INTO songlist.tlists_songlist VALUES (6, 6, 116);
INSERT INTO songlist.tlists_songlist VALUES (7, 6, 16);
INSERT INTO songlist.tlists_songlist VALUES (8, 6, 15);
INSERT INTO songlist.tlists_songlist VALUES (9, 6, 105);
INSERT INTO songlist.tlists_songlist VALUES (10, 6, 95);
INSERT INTO songlist.tlists_songlist VALUES (11, 6, 2);
INSERT INTO songlist.tlists_songlist VALUES (12, 6, 82);
INSERT INTO songlist.tlists_songlist VALUES (13, 6, 24);
INSERT INTO songlist.tlists_songlist VALUES (14, 6, 47);
INSERT INTO songlist.tlists_songlist VALUES (15, 6, 50);
INSERT INTO songlist.tlists_songlist VALUES (16, 6, 75);
INSERT INTO songlist.tlists_songlist VALUES (17, 6, 152);


--
-- TOC entry 3549 (class 0 OID 205903)
-- Dependencies: 392
-- Data for Name: trequest_statistics; Type: TABLE DATA; Schema: songlist; Owner: -
--



--
-- TOC entry 3552 (class 0 OID 205918)
-- Dependencies: 395
-- Data for Name: trole; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.trole VALUES (0, 'admin', '<?xml version="1.0" encoding="UTF-8"?><security></security>');


--
-- TOC entry 3556 (class 0 OID 205945)
-- Dependencies: 399
-- Data for Name: trole_server_permission; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.trole_server_permission VALUES (0, 0, 0);


--
-- TOC entry 3553 (class 0 OID 205924)
-- Dependencies: 396
-- Data for Name: tserver_permission; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tserver_permission VALUES (0, 'com.ontimize.jee.common.services.user.IUserInformationService/getUserInformation');


--
-- TOC entry 3554 (class 0 OID 205930)
-- Dependencies: 397
-- Data for Name: tsetting; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tsetting VALUES (0, 'mail_host', 'smtp.gmail.com', 'Host del servidor');
INSERT INTO songlist.tsetting VALUES (1, 'mail_port', '587', 'Puerto del servidor de email');
INSERT INTO songlist.tsetting VALUES (2, 'mail_protocol', 'smtp', 'Protocolo de env\u00edo de mails');
INSERT INTO songlist.tsetting VALUES (3, 'mail_user', 'mi.mail@example.com', 'Usuario para el env\u00edo de mails');
INSERT INTO songlist.tsetting VALUES (4, 'mail_password', 'mis_credenciales', 'Password del servidor de mail');
INSERT INTO songlist.tsetting VALUES (5, 'mail_encoding', 'UTF-8', 'Codificaci\u00f3n de mails');
INSERT INTO songlist.tsetting VALUES (6, 'mail_properties', 'mail.smtp.auth:true;mail.smtp.starttls.enable:true;', 'Propiedades de mails');
INSERT INTO songlist.tsetting VALUES (7, 'report_folder', 'C:/applications/ontimize-boot-app/reports', 'Carpeta de las plantillas de report');


--
-- TOC entry 3569 (class 0 OID 206093)
-- Dependencies: 412
-- Data for Name: tsong; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tsong VALUES (1, 'You', NULL);
INSERT INTO songlist.tsong VALUES (2, 'Creep', NULL);
INSERT INTO songlist.tsong VALUES (3, 'How Do You?', NULL);
INSERT INTO songlist.tsong VALUES (4, 'Stop Whispering', NULL);
INSERT INTO songlist.tsong VALUES (5, 'Thinking About You', NULL);
INSERT INTO songlist.tsong VALUES (6, 'Anyone Can Play Guitar', NULL);
INSERT INTO songlist.tsong VALUES (7, 'Ripcord', NULL);
INSERT INTO songlist.tsong VALUES (8, 'Vegetable', NULL);
INSERT INTO songlist.tsong VALUES (9, 'Prove Yourself', NULL);
INSERT INTO songlist.tsong VALUES (10, 'I Can''t', NULL);
INSERT INTO songlist.tsong VALUES (11, 'Lurgee', NULL);
INSERT INTO songlist.tsong VALUES (12, 'Blow Out', NULL);
INSERT INTO songlist.tsong VALUES (13, 'Prowler', NULL);
INSERT INTO songlist.tsong VALUES (14, 'Remember Tomorrow', NULL);
INSERT INTO songlist.tsong VALUES (15, 'Running Free', NULL);
INSERT INTO songlist.tsong VALUES (16, 'Phantom of the Opera', NULL);
INSERT INTO songlist.tsong VALUES (17, 'Transylvania', NULL);
INSERT INTO songlist.tsong VALUES (18, 'Strange World', NULL);
INSERT INTO songlist.tsong VALUES (19, 'Charlotte the Harlot', NULL);
INSERT INTO songlist.tsong VALUES (20, 'Iron Maiden', NULL);
INSERT INTO songlist.tsong VALUES (21, 'No Reply', NULL);
INSERT INTO songlist.tsong VALUES (22, 'I''m a Loser', NULL);
INSERT INTO songlist.tsong VALUES (23, 'Baby''s in Black', NULL);
INSERT INTO songlist.tsong VALUES (24, 'Rock and Roll Music', NULL);
INSERT INTO songlist.tsong VALUES (25, 'I''ll Follow the Sun', NULL);
INSERT INTO songlist.tsong VALUES (26, 'Mr. Moonlight', NULL);
INSERT INTO songlist.tsong VALUES (27, 'Medley: Kansas City / Hey-Hey-Hey-Hey!', NULL);
INSERT INTO songlist.tsong VALUES (28, 'Eight Days a Week', NULL);
INSERT INTO songlist.tsong VALUES (29, 'Words of Love', NULL);
INSERT INTO songlist.tsong VALUES (30, 'Honey Don''t', NULL);
INSERT INTO songlist.tsong VALUES (31, 'Every Little Thing', NULL);
INSERT INTO songlist.tsong VALUES (32, 'I Don''t Want to Spoil the Party', NULL);
INSERT INTO songlist.tsong VALUES (33, 'What You''re Doing', NULL);
INSERT INTO songlist.tsong VALUES (34, 'Everybody''s Trying to Be My Baby', NULL);
INSERT INTO songlist.tsong VALUES (35, 'A Hard Day''s Night', NULL);
INSERT INTO songlist.tsong VALUES (36, 'I Should Have Known Better', NULL);
INSERT INTO songlist.tsong VALUES (37, 'If I Fell', NULL);
INSERT INTO songlist.tsong VALUES (38, 'I''m Happy Just to Dance with You', NULL);
INSERT INTO songlist.tsong VALUES (39, 'And I Love Her', NULL);
INSERT INTO songlist.tsong VALUES (40, 'Tell Me Why', NULL);
INSERT INTO songlist.tsong VALUES (41, 'Can''t Buy Me Love', NULL);
INSERT INTO songlist.tsong VALUES (42, 'Any Time at All', NULL);
INSERT INTO songlist.tsong VALUES (43, 'I''ll Cry Instead', NULL);
INSERT INTO songlist.tsong VALUES (44, 'Things We Said Today', NULL);
INSERT INTO songlist.tsong VALUES (45, 'When I Get Home', NULL);
INSERT INTO songlist.tsong VALUES (46, 'You Can''t Do That', NULL);
INSERT INTO songlist.tsong VALUES (47, 'I''ll Be Back', NULL);
INSERT INTO songlist.tsong VALUES (48, 'It Won''t Be Long', NULL);
INSERT INTO songlist.tsong VALUES (49, 'All I''ve Got to Do', NULL);
INSERT INTO songlist.tsong VALUES (50, 'All My Loving', NULL);
INSERT INTO songlist.tsong VALUES (51, 'Don''t Bother Me', NULL);
INSERT INTO songlist.tsong VALUES (52, 'Little Child', NULL);
INSERT INTO songlist.tsong VALUES (53, 'Till There Was You', NULL);
INSERT INTO songlist.tsong VALUES (54, 'Please Mister Postman', NULL);
INSERT INTO songlist.tsong VALUES (55, 'Roll Over Beethoven', NULL);
INSERT INTO songlist.tsong VALUES (56, 'Hold Me Tight', NULL);
INSERT INTO songlist.tsong VALUES (57, 'You Really Got a Hold on Me', NULL);
INSERT INTO songlist.tsong VALUES (58, 'I Wanna Be Your Man', NULL);
INSERT INTO songlist.tsong VALUES (59, 'Devil in Her Heart', NULL);
INSERT INTO songlist.tsong VALUES (60, 'Not a Second Time', NULL);
INSERT INTO songlist.tsong VALUES (61, 'Money (That''s What I Want)', NULL);
INSERT INTO songlist.tsong VALUES (62, 'I Saw Her Standing There', NULL);
INSERT INTO songlist.tsong VALUES (63, 'Misery', NULL);
INSERT INTO songlist.tsong VALUES (64, 'Anna (Go to Him)', NULL);
INSERT INTO songlist.tsong VALUES (65, 'Chains', NULL);
INSERT INTO songlist.tsong VALUES (66, 'Boys', NULL);
INSERT INTO songlist.tsong VALUES (67, 'Ask Me Why', NULL);
INSERT INTO songlist.tsong VALUES (68, 'Please Please Me', NULL);
INSERT INTO songlist.tsong VALUES (69, 'Love Me Do', NULL);
INSERT INTO songlist.tsong VALUES (70, 'P.S. I Love You', NULL);
INSERT INTO songlist.tsong VALUES (71, 'Baby It''s You', NULL);
INSERT INTO songlist.tsong VALUES (72, 'Do You Want to Know a Secret', NULL);
INSERT INTO songlist.tsong VALUES (73, 'A Taste of Honey', NULL);
INSERT INTO songlist.tsong VALUES (74, 'There''s a Place', NULL);
INSERT INTO songlist.tsong VALUES (75, 'Twist and Shout', NULL);
INSERT INTO songlist.tsong VALUES (76, 'I Wanna Be Adored', NULL);
INSERT INTO songlist.tsong VALUES (77, 'she bangs the drums (john leckie original mix)', NULL);
INSERT INTO songlist.tsong VALUES (78, 'waterfall (2nd mix)', NULL);
INSERT INTO songlist.tsong VALUES (79, 'Bye Bye Bad Man', NULL);
INSERT INTO songlist.tsong VALUES (80, 'Mersey Paradise', NULL);
INSERT INTO songlist.tsong VALUES (81, 'This Is the One', NULL);
INSERT INTO songlist.tsong VALUES (82, 'Shoot You Down', NULL);
INSERT INTO songlist.tsong VALUES (83, 'Made of Stone', NULL);
INSERT INTO songlist.tsong VALUES (84, 'Sugar Spun Sister', NULL);
INSERT INTO songlist.tsong VALUES (85, 'Don''t Stop', NULL);
INSERT INTO songlist.tsong VALUES (86, 'Planet Telex', NULL);
INSERT INTO songlist.tsong VALUES (87, 'The Bends', NULL);
INSERT INTO songlist.tsong VALUES (88, 'High and Dry', NULL);
INSERT INTO songlist.tsong VALUES (89, 'Fake Plastic Trees', NULL);
INSERT INTO songlist.tsong VALUES (90, 'Bones', NULL);
INSERT INTO songlist.tsong VALUES (91, '(Nice Dream)', NULL);
INSERT INTO songlist.tsong VALUES (92, 'Just', NULL);
INSERT INTO songlist.tsong VALUES (93, 'My Iron Lung', NULL);
INSERT INTO songlist.tsong VALUES (94, 'Bullet Proof..I Wish I Was', NULL);
INSERT INTO songlist.tsong VALUES (95, 'Black Star', NULL);
INSERT INTO songlist.tsong VALUES (96, 'Sulk', NULL);
INSERT INTO songlist.tsong VALUES (97, 'Hit the Lights', NULL);
INSERT INTO songlist.tsong VALUES (98, 'The Four Horsemen', NULL);
INSERT INTO songlist.tsong VALUES (99, 'Motorbreath', NULL);
INSERT INTO songlist.tsong VALUES (100, 'Jump in the Fire', NULL);
INSERT INTO songlist.tsong VALUES (101, '(Anesthesia) Pulling Teeth', NULL);
INSERT INTO songlist.tsong VALUES (102, 'Whiplash', NULL);
INSERT INTO songlist.tsong VALUES (103, 'Phantom Lord', NULL);
INSERT INTO songlist.tsong VALUES (104, 'No Remorse', NULL);
INSERT INTO songlist.tsong VALUES (105, 'Seek & Destroy', NULL);
INSERT INTO songlist.tsong VALUES (106, 'Metal Militia', NULL);
INSERT INTO songlist.tsong VALUES (107, 'Not Fade Away', NULL);
INSERT INTO songlist.tsong VALUES (108, 'Route 66', NULL);
INSERT INTO songlist.tsong VALUES (109, 'I Just Want to Make Love to You', NULL);
INSERT INTO songlist.tsong VALUES (110, 'Honest I Do', NULL);
INSERT INTO songlist.tsong VALUES (111, 'Now I''ve Got A Witness', NULL);
INSERT INTO songlist.tsong VALUES (112, 'Little By Little', NULL);
INSERT INTO songlist.tsong VALUES (113, 'I''m A King Bee', NULL);
INSERT INTO songlist.tsong VALUES (114, 'Carol', NULL);
INSERT INTO songlist.tsong VALUES (115, 'Tell Me', NULL);
INSERT INTO songlist.tsong VALUES (116, 'Can I Get a Witness', NULL);
INSERT INTO songlist.tsong VALUES (117, 'You Can Make It If You Try', NULL);
INSERT INTO songlist.tsong VALUES (118, 'Walking The Dog', NULL);
INSERT INTO songlist.tsong VALUES (119, 'It''s a Long Way to the Top (If You Wanna Rock ''N'' Roll)', NULL);
INSERT INTO songlist.tsong VALUES (120, 'The Rock ''N'' Roll Singer', NULL);
INSERT INTO songlist.tsong VALUES (121, 'The Jack', NULL);
INSERT INTO songlist.tsong VALUES (122, 'Live Wire', NULL);
INSERT INTO songlist.tsong VALUES (123, 'T.N.T.', NULL);
INSERT INTO songlist.tsong VALUES (124, 'Can I Sit Next to You Girl', NULL);
INSERT INTO songlist.tsong VALUES (125, 'Little Lover', NULL);
INSERT INTO songlist.tsong VALUES (126, 'She''s Got Balls', NULL);
INSERT INTO songlist.tsong VALUES (127, 'High Voltage', NULL);
INSERT INTO songlist.tsong VALUES (128, 'Sunburn', NULL);
INSERT INTO songlist.tsong VALUES (129, 'Muscle Museum', NULL);
INSERT INTO songlist.tsong VALUES (130, 'Fillip', NULL);
INSERT INTO songlist.tsong VALUES (131, 'Falling Down', NULL);
INSERT INTO songlist.tsong VALUES (132, 'Cave', NULL);
INSERT INTO songlist.tsong VALUES (133, 'Showbiz', NULL);
INSERT INTO songlist.tsong VALUES (134, 'Unintended', NULL);
INSERT INTO songlist.tsong VALUES (135, 'Uno', NULL);
INSERT INTO songlist.tsong VALUES (136, 'Sober', NULL);
INSERT INTO songlist.tsong VALUES (137, 'Escape', NULL);
INSERT INTO songlist.tsong VALUES (138, 'Overdue', NULL);
INSERT INTO songlist.tsong VALUES (139, 'Hate This & I''ll Love You', NULL);
INSERT INTO songlist.tsong VALUES (140, 'Mar Adentro', NULL);
INSERT INTO songlist.tsong VALUES (141, 'Hace Tiempo', NULL);
INSERT INTO songlist.tsong VALUES (142, 'Fuente Esperanza', NULL);
INSERT INTO songlist.tsong VALUES (143, 'No Más Lágrimas', NULL);
INSERT INTO songlist.tsong VALUES (144, 'Olvidado', NULL);
INSERT INTO songlist.tsong VALUES (145, 'La Lluvia Gris', NULL);
INSERT INTO songlist.tsong VALUES (146, 'Flor Venenosa', NULL);
INSERT INTO songlist.tsong VALUES (147, 'Agosto', NULL);
INSERT INTO songlist.tsong VALUES (148, 'El Estanque', NULL);
INSERT INTO songlist.tsong VALUES (149, 'La Visión De Vuestras Almas', NULL);
INSERT INTO songlist.tsong VALUES (150, 'La Isla De Las Iguanas', NULL);
INSERT INTO songlist.tsong VALUES (151, '...16', NULL);
INSERT INTO songlist.tsong VALUES (152, 'Héroe De Leyenda', NULL);


--
-- TOC entry 3573 (class 0 OID 206118)
-- Dependencies: 416
-- Data for Name: tsong_album; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tsong_album VALUES (1, 1, 9);
INSERT INTO songlist.tsong_album VALUES (2, 2, 9);
INSERT INTO songlist.tsong_album VALUES (3, 3, 9);
INSERT INTO songlist.tsong_album VALUES (4, 4, 9);
INSERT INTO songlist.tsong_album VALUES (5, 5, 9);
INSERT INTO songlist.tsong_album VALUES (6, 6, 9);
INSERT INTO songlist.tsong_album VALUES (7, 7, 9);
INSERT INTO songlist.tsong_album VALUES (8, 8, 9);
INSERT INTO songlist.tsong_album VALUES (9, 9, 9);
INSERT INTO songlist.tsong_album VALUES (10, 10, 9);
INSERT INTO songlist.tsong_album VALUES (11, 11, 9);
INSERT INTO songlist.tsong_album VALUES (12, 12, 9);
INSERT INTO songlist.tsong_album VALUES (13, 13, 8);
INSERT INTO songlist.tsong_album VALUES (14, 14, 8);
INSERT INTO songlist.tsong_album VALUES (15, 15, 8);
INSERT INTO songlist.tsong_album VALUES (16, 16, 8);
INSERT INTO songlist.tsong_album VALUES (17, 17, 8);
INSERT INTO songlist.tsong_album VALUES (18, 18, 8);
INSERT INTO songlist.tsong_album VALUES (19, 19, 8);
INSERT INTO songlist.tsong_album VALUES (20, 20, 8);
INSERT INTO songlist.tsong_album VALUES (21, 21, 7);
INSERT INTO songlist.tsong_album VALUES (22, 22, 7);
INSERT INTO songlist.tsong_album VALUES (23, 23, 7);
INSERT INTO songlist.tsong_album VALUES (24, 24, 7);
INSERT INTO songlist.tsong_album VALUES (25, 25, 7);
INSERT INTO songlist.tsong_album VALUES (26, 26, 7);
INSERT INTO songlist.tsong_album VALUES (27, 27, 7);
INSERT INTO songlist.tsong_album VALUES (28, 28, 7);
INSERT INTO songlist.tsong_album VALUES (29, 29, 7);
INSERT INTO songlist.tsong_album VALUES (30, 30, 7);
INSERT INTO songlist.tsong_album VALUES (31, 31, 7);
INSERT INTO songlist.tsong_album VALUES (32, 32, 7);
INSERT INTO songlist.tsong_album VALUES (33, 33, 7);
INSERT INTO songlist.tsong_album VALUES (34, 34, 7);
INSERT INTO songlist.tsong_album VALUES (35, 35, 6);
INSERT INTO songlist.tsong_album VALUES (36, 36, 6);
INSERT INTO songlist.tsong_album VALUES (37, 37, 6);
INSERT INTO songlist.tsong_album VALUES (38, 38, 6);
INSERT INTO songlist.tsong_album VALUES (39, 39, 6);
INSERT INTO songlist.tsong_album VALUES (40, 40, 6);
INSERT INTO songlist.tsong_album VALUES (41, 41, 6);
INSERT INTO songlist.tsong_album VALUES (42, 42, 6);
INSERT INTO songlist.tsong_album VALUES (43, 43, 6);
INSERT INTO songlist.tsong_album VALUES (44, 44, 6);
INSERT INTO songlist.tsong_album VALUES (45, 45, 6);
INSERT INTO songlist.tsong_album VALUES (46, 46, 6);
INSERT INTO songlist.tsong_album VALUES (47, 47, 6);
INSERT INTO songlist.tsong_album VALUES (48, 48, 5);
INSERT INTO songlist.tsong_album VALUES (49, 49, 5);
INSERT INTO songlist.tsong_album VALUES (50, 50, 5);
INSERT INTO songlist.tsong_album VALUES (51, 51, 5);
INSERT INTO songlist.tsong_album VALUES (52, 52, 5);
INSERT INTO songlist.tsong_album VALUES (53, 53, 5);
INSERT INTO songlist.tsong_album VALUES (54, 54, 5);
INSERT INTO songlist.tsong_album VALUES (55, 55, 5);
INSERT INTO songlist.tsong_album VALUES (56, 56, 5);
INSERT INTO songlist.tsong_album VALUES (57, 57, 5);
INSERT INTO songlist.tsong_album VALUES (58, 58, 5);
INSERT INTO songlist.tsong_album VALUES (59, 59, 5);
INSERT INTO songlist.tsong_album VALUES (60, 60, 5);
INSERT INTO songlist.tsong_album VALUES (61, 61, 5);
INSERT INTO songlist.tsong_album VALUES (62, 62, 4);
INSERT INTO songlist.tsong_album VALUES (63, 63, 4);
INSERT INTO songlist.tsong_album VALUES (64, 64, 4);
INSERT INTO songlist.tsong_album VALUES (65, 65, 4);
INSERT INTO songlist.tsong_album VALUES (66, 66, 4);
INSERT INTO songlist.tsong_album VALUES (67, 67, 4);
INSERT INTO songlist.tsong_album VALUES (68, 68, 4);
INSERT INTO songlist.tsong_album VALUES (69, 69, 4);
INSERT INTO songlist.tsong_album VALUES (70, 70, 4);
INSERT INTO songlist.tsong_album VALUES (71, 71, 4);
INSERT INTO songlist.tsong_album VALUES (72, 72, 4);
INSERT INTO songlist.tsong_album VALUES (73, 73, 4);
INSERT INTO songlist.tsong_album VALUES (74, 74, 4);
INSERT INTO songlist.tsong_album VALUES (75, 75, 4);
INSERT INTO songlist.tsong_album VALUES (76, 76, 3);
INSERT INTO songlist.tsong_album VALUES (77, 77, 3);
INSERT INTO songlist.tsong_album VALUES (78, 78, 3);
INSERT INTO songlist.tsong_album VALUES (79, 79, 3);
INSERT INTO songlist.tsong_album VALUES (80, 80, 3);
INSERT INTO songlist.tsong_album VALUES (81, 81, 3);
INSERT INTO songlist.tsong_album VALUES (82, 82, 3);
INSERT INTO songlist.tsong_album VALUES (83, 83, 3);
INSERT INTO songlist.tsong_album VALUES (84, 84, 3);
INSERT INTO songlist.tsong_album VALUES (85, 85, 3);
INSERT INTO songlist.tsong_album VALUES (86, 86, 1);
INSERT INTO songlist.tsong_album VALUES (87, 87, 1);
INSERT INTO songlist.tsong_album VALUES (88, 88, 1);
INSERT INTO songlist.tsong_album VALUES (89, 89, 1);
INSERT INTO songlist.tsong_album VALUES (90, 90, 1);
INSERT INTO songlist.tsong_album VALUES (91, 91, 1);
INSERT INTO songlist.tsong_album VALUES (92, 92, 1);
INSERT INTO songlist.tsong_album VALUES (93, 93, 1);
INSERT INTO songlist.tsong_album VALUES (94, 94, 1);
INSERT INTO songlist.tsong_album VALUES (95, 95, 1);
INSERT INTO songlist.tsong_album VALUES (96, 96, 1);
INSERT INTO songlist.tsong_album VALUES (97, 97, 2);
INSERT INTO songlist.tsong_album VALUES (98, 98, 2);
INSERT INTO songlist.tsong_album VALUES (99, 99, 2);
INSERT INTO songlist.tsong_album VALUES (100, 100, 2);
INSERT INTO songlist.tsong_album VALUES (101, 101, 2);
INSERT INTO songlist.tsong_album VALUES (102, 102, 2);
INSERT INTO songlist.tsong_album VALUES (103, 103, 2);
INSERT INTO songlist.tsong_album VALUES (104, 104, 2);
INSERT INTO songlist.tsong_album VALUES (105, 105, 2);
INSERT INTO songlist.tsong_album VALUES (106, 106, 2);
INSERT INTO songlist.tsong_album VALUES (107, 107, 10);
INSERT INTO songlist.tsong_album VALUES (108, 108, 10);
INSERT INTO songlist.tsong_album VALUES (109, 109, 10);
INSERT INTO songlist.tsong_album VALUES (110, 110, 10);
INSERT INTO songlist.tsong_album VALUES (111, 111, 10);
INSERT INTO songlist.tsong_album VALUES (112, 112, 10);
INSERT INTO songlist.tsong_album VALUES (113, 113, 10);
INSERT INTO songlist.tsong_album VALUES (114, 114, 10);
INSERT INTO songlist.tsong_album VALUES (115, 115, 10);
INSERT INTO songlist.tsong_album VALUES (116, 116, 10);
INSERT INTO songlist.tsong_album VALUES (117, 117, 10);
INSERT INTO songlist.tsong_album VALUES (118, 118, 10);
INSERT INTO songlist.tsong_album VALUES (119, 119, 11);
INSERT INTO songlist.tsong_album VALUES (120, 120, 11);
INSERT INTO songlist.tsong_album VALUES (121, 121, 11);
INSERT INTO songlist.tsong_album VALUES (122, 122, 11);
INSERT INTO songlist.tsong_album VALUES (123, 123, 11);
INSERT INTO songlist.tsong_album VALUES (124, 124, 11);
INSERT INTO songlist.tsong_album VALUES (125, 125, 11);
INSERT INTO songlist.tsong_album VALUES (126, 126, 11);
INSERT INTO songlist.tsong_album VALUES (127, 127, 11);
INSERT INTO songlist.tsong_album VALUES (128, 128, 12);
INSERT INTO songlist.tsong_album VALUES (129, 129, 12);
INSERT INTO songlist.tsong_album VALUES (130, 130, 12);
INSERT INTO songlist.tsong_album VALUES (131, 131, 12);
INSERT INTO songlist.tsong_album VALUES (132, 132, 12);
INSERT INTO songlist.tsong_album VALUES (133, 133, 12);
INSERT INTO songlist.tsong_album VALUES (134, 134, 12);
INSERT INTO songlist.tsong_album VALUES (135, 135, 12);
INSERT INTO songlist.tsong_album VALUES (136, 136, 12);
INSERT INTO songlist.tsong_album VALUES (137, 137, 12);
INSERT INTO songlist.tsong_album VALUES (138, 138, 12);
INSERT INTO songlist.tsong_album VALUES (139, 139, 12);
INSERT INTO songlist.tsong_album VALUES (140, 140, 13);
INSERT INTO songlist.tsong_album VALUES (141, 141, 13);
INSERT INTO songlist.tsong_album VALUES (142, 142, 13);
INSERT INTO songlist.tsong_album VALUES (143, 143, 13);
INSERT INTO songlist.tsong_album VALUES (144, 144, 13);
INSERT INTO songlist.tsong_album VALUES (145, 145, 13);
INSERT INTO songlist.tsong_album VALUES (146, 146, 13);
INSERT INTO songlist.tsong_album VALUES (147, 147, 13);
INSERT INTO songlist.tsong_album VALUES (148, 148, 13);
INSERT INTO songlist.tsong_album VALUES (149, 149, 13);
INSERT INTO songlist.tsong_album VALUES (150, 150, 13);
INSERT INTO songlist.tsong_album VALUES (151, 151, 13);
INSERT INTO songlist.tsong_album VALUES (152, 152, 13);


--
-- TOC entry 3571 (class 0 OID 206113)
-- Dependencies: 414
-- Data for Name: tsonglist; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tsonglist VALUES (6, 'Go rock!', 'My favourites rock songs of all time', 18);


--
-- TOC entry 3559 (class 0 OID 206001)
-- Dependencies: 402
-- Data for Name: tuser; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tuser VALUES ('demo', 'demouser', 18, 'demo@demo.com', 'Demo', 'Demo', NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 3555 (class 0 OID 205939)
-- Dependencies: 398
-- Data for Name: tuser_preference; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tuser_preference VALUES ('user_preference', 'demo', 'Iw0KI1R1ZSBNYXkgMTYgMTI6NTc6MDYgQ0VTVCAyMDE3DQpkZW1vX2FwcF9zdGF0dXNfYmFyX3Zpc2libGU9eWVzDQpkZW1vX2FkanVzdF90cmVlX3NwYWNlPXRydWUNCmRlbW9fYXBwX3dpbmRvd19zdGF0ZT0wDQpkZW1vX3RhYmxlX2NvbmZfc29ydF9maWx0ZXJfZm9ybUN1c3RvbWVyLnhtbF9DdXN0b21lclNlcnZpY2UuY3VzdG9tZXJfVEVTVD1udWxsO251bGw7U1VSTkFNRVw9OThcOjF8SURcPTc1XDoyfE5BTUVcPTk5XDozfENVU1RPTUVSVFlQRUlEXD0wXDo0fENVU1RPTUVSSURcPTEyNVw6NXxBRERSRVNTXD0xMjNcOjZ8UEhPTkVcPTEyMVw6N3xTVEFSVERBVEVcPTEzNlw6OHxMT05HSVRVREVcPTExNlw6OXxMQVRJVFVERVw9MTEzXDoxMHxFTUFJTFw9MTcwXDoxMnw7QkFTRTY0ck8wQUJYTnlBQk5xWVhaaExuVjBhV3d1U0dGemFIUmhZbXhsRTdzUEpTRks1TGdEQUFKR0FBcHNiMkZrUm1GamRHOXlTUUFKZEdoeVpYTm9iMnhrZUhBL1FBQUFBQUFBQ0hjSUFBQUFDd0FBQUFCNA0KZGVtb190YWJsZV9jb25mX3NvcnRfZmlsdGVyX2NvbmZpZ3VyYXRpb25zX2Zvcm1DdXN0b21lci54bWxfQ3VzdG9tZXJTZXJ2aWNlLmN1c3RvbWVyPVRFU1QNCmRlbW9fdGFibGVfY29udHJvbF9wYW5lbF9mb3JtQWNjb3VudHMtZGV0YWlsLnhtbF9Nb3ZlbWVudFNlcnZpY2UubW92ZW1lbnQ9Z3JvdXB0YWJsZWtleTtkZWZhdWx0Y2hhcnRidXR0b247ZXhjZWxleHBvcnRidXR0b247c3Vtcm93YnV0dG9uO2NhbGN1bGVkY29sc2J1dHRvbjtwcmludGluZ2J1dHRvbjtmaWx0ZXJzYXZlYnV0dG9uO3Zpc2libGVjb2xzYnV0dG9uO2h0bWxleHBvcnRidXR0b247Y29weWJ1dHRvbjtncm91cHRhYmxla2V5O2luc2VydGJ1dHRvbjtyZWZyZXNoYnV0dG9uDQpkZW1vX2Zvcm1CcmFuY2hlcy1kZXRhaWwueG1sPTg4MDs1MDU7LTExNTA7MzY5DQpkZW1vX2RldGFpbF9kaWFsb2dfc2l6ZV9wb3NpdGlvbl9mb3JtQ3VzdG9tZXIueG1sX0N1c3RvbWVyU2VydmljZS5jdXN0b21lcj03NDk7MzUwOy0xOTA1OzM5MQ0KZGVtb19hcHBfdG9vbGJhcl9sb2NhdGlvbj1Ob3J0aA0KZGVtb19hcHBfd2luZG93X3Bvc2l0aW9uPS0xNTgwOzExDQpkZW1vX2FwcF93aW5kb3dfc2l6ZT0xNTg0OzEwNDQNCmRlbW9fZm9ybUVtcGxveWVlcy1kZXRhaWwueG1sPTExMTY7NzM5OzYxMDsxOTUNCmRlbW9fZm9ybUFjY291bnRzLWRldGFpbC54bWw9OTE1OzUwMDstMTE1MDszNjkNCg==', 6);


--
-- TOC entry 3557 (class 0 OID 205948)
-- Dependencies: 400
-- Data for Name: tuser_role; Type: TABLE DATA; Schema: songlist; Owner: -
--

INSERT INTO songlist.tuser_role VALUES (0, 18, 6);


--
-- TOC entry 3592 (class 0 OID 0)
-- Dependencies: 405
-- Name: talbum_id_album_seq; Type: SEQUENCE SET; Schema: songlist; Owner: -
--

SELECT pg_catalog.setval('songlist.talbum_id_album_seq', 13, true);


--
-- TOC entry 3593 (class 0 OID 0)
-- Dependencies: 409
-- Name: tartist_id_artist_seq; Type: SEQUENCE SET; Schema: songlist; Owner: -
--

SELECT pg_catalog.setval('songlist.tartist_id_artist_seq', 9, true);


--
-- TOC entry 3594 (class 0 OID 0)
-- Dependencies: 407
-- Name: tgenre_id_genre_seq; Type: SEQUENCE SET; Schema: songlist; Owner: -
--

SELECT pg_catalog.setval('songlist.tgenre_id_genre_seq', 5, true);


--
-- TOC entry 3595 (class 0 OID 0)
-- Dependencies: 418
-- Name: tlists_songlist_id_lists_songlist_seq; Type: SEQUENCE SET; Schema: songlist; Owner: -
--

SELECT pg_catalog.setval('songlist.tlists_songlist_id_lists_songlist_seq', 17, true);


--
-- TOC entry 3596 (class 0 OID 0)
-- Dependencies: 415
-- Name: tsong_album_song_album_id_seq; Type: SEQUENCE SET; Schema: songlist; Owner: -
--

SELECT pg_catalog.setval('songlist.tsong_album_song_album_id_seq', 152, true);


--
-- TOC entry 3597 (class 0 OID 0)
-- Dependencies: 413
-- Name: tsong_id_song_seq; Type: SEQUENCE SET; Schema: songlist; Owner: -
--

SELECT pg_catalog.setval('songlist.tsong_id_song_seq', 152, true);


--
-- TOC entry 3598 (class 0 OID 0)
-- Dependencies: 417
-- Name: tsonglist_id_songlist_seq; Type: SEQUENCE SET; Schema: songlist; Owner: -
--

SELECT pg_catalog.setval('songlist.tsonglist_id_songlist_seq', 6, true);


--
-- TOC entry 3599 (class 0 OID 0)
-- Dependencies: 401
-- Name: tuser_id_user_seq; Type: SEQUENCE SET; Schema: songlist; Owner: -
--

SELECT pg_catalog.setval('songlist.tuser_id_user_seq', 18, true);


--
-- TOC entry 3600 (class 0 OID 0)
-- Dependencies: 403
-- Name: tuser_preference_id_user_preference_seq; Type: SEQUENCE SET; Schema: songlist; Owner: -
--

SELECT pg_catalog.setval('songlist.tuser_preference_id_user_preference_seq', 6, true);


--
-- TOC entry 3601 (class 0 OID 0)
-- Dependencies: 404
-- Name: tuser_role_id_user_role_seq; Type: SEQUENCE SET; Schema: songlist; Owner: -
--

SELECT pg_catalog.setval('songlist.tuser_role_id_user_role_seq', 6, true);


--
-- TOC entry 3408 (class 2606 OID 206052)
-- Name: talbum talbum_pk; Type: CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.talbum
    ADD CONSTRAINT talbum_pk PRIMARY KEY (id_album);


--
-- TOC entry 3412 (class 2606 OID 206074)
-- Name: tartist tartist_pk; Type: CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tartist
    ADD CONSTRAINT tartist_pk PRIMARY KEY (id_artist);


--
-- TOC entry 3410 (class 2606 OID 206063)
-- Name: tgenre tgenre_pk; Type: CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tgenre
    ADD CONSTRAINT tgenre_pk PRIMARY KEY (id_genre);


--
-- TOC entry 3414 (class 2606 OID 206160)
-- Name: tlists_songlist tlists_songlist_pk; Type: CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tlists_songlist
    ADD CONSTRAINT tlists_songlist_pk PRIMARY KEY (id_list_songlist);


--
-- TOC entry 3420 (class 2606 OID 206123)
-- Name: tsong_album tsong_album_pk; Type: CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tsong_album
    ADD CONSTRAINT tsong_album_pk PRIMARY KEY (song_album_id);


--
-- TOC entry 3416 (class 2606 OID 206107)
-- Name: tsong tsong_pk; Type: CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tsong
    ADD CONSTRAINT tsong_pk PRIMARY KEY (id_song);


--
-- TOC entry 3418 (class 2606 OID 206142)
-- Name: tsonglist tsonglist_pk; Type: CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tsonglist
    ADD CONSTRAINT tsonglist_pk PRIMARY KEY (id_songlist);


--
-- TOC entry 3406 (class 2606 OID 206147)
-- Name: tuser tuser_pk; Type: CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tuser
    ADD CONSTRAINT tuser_pk PRIMARY KEY (id_user);


--
-- TOC entry 3402 (class 2606 OID 206029)
-- Name: tuser_preference tuser_preference_pk; Type: CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tuser_preference
    ADD CONSTRAINT tuser_preference_pk PRIMARY KEY (id_user_preference);


--
-- TOC entry 3404 (class 2606 OID 206037)
-- Name: tuser_role tuser_role_pk; Type: CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tuser_role
    ADD CONSTRAINT tuser_role_pk PRIMARY KEY (id_user_role);


--
-- TOC entry 3421 (class 2606 OID 206075)
-- Name: talbum talbum_fk; Type: FK CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.talbum
    ADD CONSTRAINT talbum_fk FOREIGN KEY (id_genre) REFERENCES songlist.tgenre(id_genre);


--
-- TOC entry 3422 (class 2606 OID 206085)
-- Name: talbum talbum_fk_2; Type: FK CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.talbum
    ADD CONSTRAINT talbum_fk_2 FOREIGN KEY (id_artist) REFERENCES songlist.tartist(id_artist);


--
-- TOC entry 3423 (class 2606 OID 206171)
-- Name: tlists_songlist tlists_songlist_fk; Type: FK CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tlists_songlist
    ADD CONSTRAINT tlists_songlist_fk FOREIGN KEY (id_songlist) REFERENCES songlist.tsonglist(id_songlist) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3424 (class 2606 OID 206166)
-- Name: tlists_songlist tlists_songlist_fk_1; Type: FK CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tlists_songlist
    ADD CONSTRAINT tlists_songlist_fk_1 FOREIGN KEY (id_song) REFERENCES songlist.tsong(id_song);


--
-- TOC entry 3426 (class 2606 OID 206124)
-- Name: tsong_album tsong_album_fk; Type: FK CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tsong_album
    ADD CONSTRAINT tsong_album_fk FOREIGN KEY (id_song) REFERENCES songlist.tsong(id_song);


--
-- TOC entry 3427 (class 2606 OID 206129)
-- Name: tsong_album tsong_album_fk_1; Type: FK CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tsong_album
    ADD CONSTRAINT tsong_album_fk_1 FOREIGN KEY (id_album) REFERENCES songlist.talbum(id_album);


--
-- TOC entry 3425 (class 2606 OID 206148)
-- Name: tsonglist tsonglist_fk; Type: FK CONSTRAINT; Schema: songlist; Owner: -
--

ALTER TABLE ONLY songlist.tsonglist
    ADD CONSTRAINT tsonglist_fk FOREIGN KEY (id_user) REFERENCES songlist.tuser(id_user);


-- Completed on 2023-02-07 17:56:24

--
-- PostgreSQL database dump complete
--

