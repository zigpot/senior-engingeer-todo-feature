--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)

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
-- Name: doctor_patient; Type: TABLE; Schema: public; Owner: todo_user
--

CREATE TABLE public.doctor_patient (
    doctor_id integer NOT NULL,
    patient_id integer NOT NULL
);


ALTER TABLE public.doctor_patient OWNER TO todo_user;

--
-- Name: patients; Type: TABLE; Schema: public; Owner: todo_user
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.patients OWNER TO todo_user;

--
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: todo_user
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.patients_id_seq OWNER TO todo_user;

--
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: todo_user
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- Name: resources; Type: TABLE; Schema: public; Owner: todo_user
--

CREATE TABLE public.resources (
    id integer NOT NULL,
    todo_id integer,
    resource_link text NOT NULL
);


ALTER TABLE public.resources OWNER TO todo_user;

--
-- Name: resources_id_seq; Type: SEQUENCE; Schema: public; Owner: todo_user
--

CREATE SEQUENCE public.resources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.resources_id_seq OWNER TO todo_user;

--
-- Name: resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: todo_user
--

ALTER SEQUENCE public.resources_id_seq OWNED BY public.resources.id;


--
-- Name: todo_assignments; Type: TABLE; Schema: public; Owner: todo_user
--

CREATE TABLE public.todo_assignments (
    todo_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.todo_assignments OWNER TO todo_user;

--
-- Name: todos; Type: TABLE; Schema: public; Owner: todo_user
--

CREATE TABLE public.todos (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    deadline timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    completed boolean DEFAULT false
);


ALTER TABLE public.todos OWNER TO todo_user;

--
-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: todo_user
--

CREATE SEQUENCE public.todos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.todos_id_seq OWNER TO todo_user;

--
-- Name: todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: todo_user
--

ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: todo_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    doctor_number character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['Doctor'::character varying, 'Nurse'::character varying, 'Secretary'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO todo_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: todo_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO todo_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: todo_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- Name: resources id; Type: DEFAULT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.resources ALTER COLUMN id SET DEFAULT nextval('public.resources_id_seq'::regclass);


--
-- Name: todos id; Type: DEFAULT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: doctor_patient doctor_patient_pkey; Type: CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.doctor_patient
    ADD CONSTRAINT doctor_patient_pkey PRIMARY KEY (doctor_id, patient_id);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);


--
-- Name: todo_assignments todo_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.todo_assignments
    ADD CONSTRAINT todo_assignments_pkey PRIMARY KEY (todo_id, user_id);


--
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


--
-- Name: users users_doctor_number_key; Type: CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_doctor_number_key UNIQUE (doctor_number);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: doctor_patient doctor_patient_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.doctor_patient
    ADD CONSTRAINT doctor_patient_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: doctor_patient doctor_patient_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.doctor_patient
    ADD CONSTRAINT doctor_patient_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;


--
-- Name: resources resources_todo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_todo_id_fkey FOREIGN KEY (todo_id) REFERENCES public.todos(id) ON DELETE CASCADE;


--
-- Name: todo_assignments todo_assignments_todo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.todo_assignments
    ADD CONSTRAINT todo_assignments_todo_id_fkey FOREIGN KEY (todo_id) REFERENCES public.todos(id) ON DELETE CASCADE;


--
-- Name: todo_assignments todo_assignments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: todo_user
--

ALTER TABLE ONLY public.todo_assignments
    ADD CONSTRAINT todo_assignments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO todo_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: todo_user
--

ALTER DEFAULT PRIVILEGES FOR ROLE todo_user IN SCHEMA public GRANT ALL ON SEQUENCES TO todo_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO todo_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: todo_user
--

ALTER DEFAULT PRIVILEGES FOR ROLE todo_user IN SCHEMA public GRANT ALL ON TABLES TO todo_user;


--
-- PostgreSQL database dump complete
--

