--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

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
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    login character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    age integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    uid uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (login, password, age, "isDeleted", uid) FROM stdin;
newAFTE8	11ttt11	18	t	8ba4d330-4b85-11ea-96c6-77dcf2da7198
new	new22	43	t	3f41e950-4b81-11ea-a5cb-bb453bf0c1d7
newond	new22	43	t	5eaad5e0-4b81-11ea-b30e-a128051b9b10
asdasd	1111	128	t	54c9141a-3bd9-452f-a13f-cec1d76d0e00
user77412.29829202208	aaaa6a	128	t	06773ea0-4d97-11ea-b3ac-d7c85e4d6b87
neAFTE8	11ttt11	18	t	22151ff0-50f9-11ea-ba23-d11987b699ac
nAFTE8	11ttt11	18	t	2f7b7400-50f9-11ea-ba23-d11987b699ac
nAFTffllllggE8	11ttt11	120	t	31543630-50fa-11ea-9727-31bc0fac42ef
neggAFTE8	11ttt11	18	t	2750ffc0-50f9-11ea-ba23-d11987b699ac
seefffee	11a11	128	t	57236080-4c12-11ea-8f67-5552a1c568cc
seefrsse	11a11	128	f	cc8c1a20-4cca-11ea-9e37-cb31c6c059a6
seeffrsse	11a11	128	f	06a01d10-4ccb-11ea-a6e8-c3c5823428f5
newAFTRE8	11a11	128	f	e127c220-4ccc-11ea-96b4-6311861633f9
user7700.273983632799	aaaa6a	128	f	ad5d8110-4c12-11ea-8ebb-e9b845a36b98
nFTffllllggE8	11ttt	120	f	899e7210-50fa-11ea-8084-d9ce81ab3c2d
user42419.5076815207	aaaa6a	128	t	9ecf6c40-4cca-11ea-a90b-571e311fe4f1
\.


--
-- Name: users login; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT login UNIQUE (login);


--
-- Name: users uid; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uid PRIMARY KEY (uid);


--
-- Name: login_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX login_index ON public.users USING btree (login varchar_ops);


--
-- PostgreSQL database dump complete
--

