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
-- Data for Name: doctor_patient; Type: TABLE DATA; Schema: public; Owner: todo_user
--

COPY public.doctor_patient (doctor_id, patient_id) FROM stdin;
\.


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: todo_user
--

COPY public.patients (id, name, created_at) FROM stdin;
1	John Doe	2025-01-03 11:22:15.670162
2	Jane Roe	2025-01-03 11:22:15.670162
3	Ana Petrova	2025-01-03 15:02:41.118167
4	Chloe Marie Parker	2025-01-03 15:02:41.118167
5	Gustavo Henrique Rocha	2025-01-03 15:02:41.118167
6	Seán Ó Conchúir	2025-01-03 15:02:41.118167
7	Victoria Anne Taylor	2025-01-03 15:02:41.118167
8	Ethan Adams	2025-01-03 15:02:41.118167
9	Rahul Desai	2025-01-03 15:02:41.118167
10	Ayumi Suzuki	2025-01-03 15:02:41.118167
11	Aarav Devraj Patel	2025-01-03 15:02:41.118167
12	Dimitrios Christodoulou	2025-01-03 15:02:41.118167
13	Daniel Thomas Moore	2025-01-03 15:02:41.118167
14	Ryan Park	2025-01-03 15:02:41.118167
15	Yulia Alexandrovna Morozova	2025-01-03 15:02:41.118167
16	Pedro Alejandro López	2025-01-03 15:02:41.118167
17	David Joseph Taylor	2025-01-03 15:02:41.118167
18	Grace Allen	2025-01-03 15:02:41.118167
19	Mia Martinez	2025-01-03 15:02:41.118167
20	Thierry Alain Lambert	2025-01-03 15:02:41.118167
21	Rosa González-Campos	2025-01-03 15:02:41.118167
22	Lily Ho	2025-01-03 15:02:41.118167
23	Charles-Michael Lewis	2025-01-03 15:02:41.118167
24	Magdalena Kowalczyk	2025-01-03 15:02:41.118167
25	Jack Carter	2025-01-03 15:02:41.118167
26	Asma Perveen Rashid	2025-01-03 15:02:41.118167
27	Juanita María Reyes	2025-01-03 15:02:41.118167
28	Taro Ishida	2025-01-03 15:02:41.118167
29	Isabella Ito	2025-01-03 15:02:41.118167
30	Maria Luiza Costa	2025-01-03 15:02:41.118167
31	Gennady Ivanov	2025-01-03 15:02:41.118167
32	Alexandros Papadopoulos	2025-01-03 15:02:41.118167
33	Camila Martínez-Juárez	2025-01-03 15:02:41.118167
34	Chloe Walker	2025-01-03 15:02:41.118167
35	Elizabeth Grace Wright	2025-01-03 15:02:41.118167
36	Zinaida Aleksandrovna Khokhlova	2025-01-03 15:02:41.118167
37	René-Georges Dumas	2025-01-03 15:02:41.118167
38	Nicole Renee Mitchell	2025-01-03 15:02:41.118167
39	Daniel Zhao	2025-01-03 15:02:41.118167
40	Roman Dmitrievich Melnikov	2025-01-03 15:02:41.118167
41	Linda Mae White	2025-01-03 15:02:41.118167
42	Dmitry Sergeevich Ivanov	2025-01-03 15:02:41.118167
43	Ava Lim	2025-01-03 15:02:41.118167
44	Noah Lee	2025-01-03 15:02:41.118167
45	Kelechi Emmanuel Okoro	2025-01-03 15:02:41.118167
46	Aryan Gupta	2025-01-03 15:02:41.118167
47	Hanae Sato	2025-01-03 15:02:41.118167
48	Zhang Lei	2025-01-03 15:02:41.118167
49	Sana Saeed Ali	2025-01-03 15:02:41.118167
50	Henry Carter	2025-01-03 15:02:41.118167
51	Bilal Ahmed Qureshi	2025-01-03 15:02:41.118167
52	Sophia Park	2025-01-03 15:02:41.118167
53	Francesco Giuseppe Ricci	2025-01-03 15:02:41.118167
54	Benjamin Charles Taylor	2025-01-03 15:02:41.118167
55	James Anderson	2025-01-03 15:02:41.118167
56	Isabel Castro	2025-01-03 15:02:41.118167
57	Yuto Watanabe	2025-01-03 15:02:41.118167
58	Aaron Michael Thompson	2025-01-03 15:02:41.118167
59	Carmen Lucia García	2025-01-03 15:02:41.118167
60	Mariana Oliveira	2025-01-03 15:02:41.118167
61	Alejandro Hernández-González	2025-01-03 15:02:41.118167
62	Olivia Harris	2025-01-03 15:02:41.118167
63	Viktor Konstantinovich Romanov	2025-01-03 15:02:41.118167
64	Youssef Hossam Al-Mahdi	2025-01-03 15:02:41.118167
65	Santiago Jiménez	2025-01-03 15:02:41.118167
66	Owen Hall	2025-01-03 15:02:41.118167
67	Aine Walsh	2025-01-03 15:02:41.118167
68	Ciarán Ó Briain	2025-01-03 15:02:41.118167
69	Rahim Sohail Qadir	2025-01-03 15:02:41.118167
70	Valentina Ponomareva	2025-01-03 15:02:41.118167
71	Scarlett Green	2025-01-03 15:02:41.118167
72	Matteo Giovanni Russo	2025-01-03 15:02:41.118167
73	Kenji Matsumoto	2025-01-03 15:02:41.118167
74	Farhan Akbar-Fadhilah	2025-01-03 15:02:41.118167
75	Renata González	2025-01-03 15:02:41.118167
76	Hassan Ali-Farooq	2025-01-03 15:02:41.118167
77	Jelena Dimitrova	2025-01-03 15:02:41.118167
78	Ava Claire Lewis	2025-01-03 15:02:41.118167
79	Viktor Andreevich Kiselev	2025-01-03 15:02:41.118167
80	Olamide Kehinde Ibraheem	2025-01-03 15:02:41.118167
81	Lucas Mori	2025-01-03 15:02:41.118167
82	Alan Thomas Brown	2025-01-03 15:02:41.118167
83	John Doe	2025-01-03 15:02:41.118167
84	Katherine Ann Kelly	2025-01-03 15:02:41.118167
85	Linda Sue Robinson	2025-01-03 15:02:41.118167
86	Alexander Joseph Harris	2025-01-03 15:02:41.118167
87	Maria Alekseevna Smirnova	2025-01-03 15:02:41.118167
88	Suthida Charoenkit	2025-01-03 15:02:41.118167
89	Neha G. Agarwal	2025-01-03 15:02:41.118167
90	Alice-Pauline Deschamps	2025-01-03 15:02:41.118167
91	Karen Elizabeth King	2025-01-03 15:02:41.118167
92	Ali Ahmed Al-Hashimi	2025-01-03 15:02:41.118167
93	Samuel Adams	2025-01-03 15:02:41.118167
94	Niamh Fitzgerald	2025-01-03 15:02:41.118167
95	John Doe	2025-01-03 15:02:41.118167
96	Sophia Ho	2025-01-03 15:02:41.118167
97	Nikolai Volkoff	2025-01-03 15:02:41.118167
98	Olumide Adebayo	2025-01-03 15:02:41.118167
99	Luka Vuković	2025-01-03 15:02:41.118167
100	Thomas Andrew Walker	2025-01-03 15:02:41.118167
101	Marie-Claire Lefevre	2025-01-03 15:02:41.118167
102	María José Gómez	2025-01-03 15:02:41.118167
103	Ivan Ivić	2025-01-03 15:02:41.118167
104	Valeria Soto	2025-01-03 15:02:41.118167
105	Sandeep Mukesh Dutt	2025-01-03 15:02:41.118167
106	Chen Xia	2025-01-03 15:02:41.118167
107	Alexander Yao	2025-01-03 15:02:41.118167
108	Vera Aleksandrovna Belova	2025-01-03 15:02:41.118167
109	Harper Green	2025-01-03 15:02:41.118167
110	Kenji Tanaka	2025-01-03 15:02:41.118167
111	Sophia Elizabeth Lee	2025-01-03 15:02:41.118167
112	Emily King	2025-01-03 15:02:41.118167
113	Michael John Lee Jr.	2025-01-03 15:02:41.118167
114	Zoe Roberts	2025-01-03 15:02:41.118167
115	Patricia Jean Robinson	2025-01-03 15:02:41.118167
116	Renjiro Fujimoto	2025-01-03 15:02:41.118167
117	Dian Amalia Putri	2025-01-03 15:02:41.118167
118	Yasmin R. Jaber	2025-01-03 15:02:41.118167
119	Harper Feng	2025-01-03 15:02:41.118167
120	Artem Alexandrovich Sorokin	2025-01-03 15:02:41.118167
121	Marco Antonio Ferrari	2025-01-03 15:02:41.118167
122	Maria Luisa Garcia	2025-01-03 15:02:41.118167
123	Olivia Grace Turner	2025-01-03 15:02:41.118167
124	Ali Akbar Iqbal	2025-01-03 15:02:41.118167
125	Sofia Chernovova	2025-01-03 15:02:41.118167
126	David Alan Garcia	2025-01-03 15:02:41.118167
127	Mia Catherine Young	2025-01-03 15:02:41.118167
128	Francisco Javier Ortiz	2025-01-03 15:02:41.118167
129	Sofia Martínez Pérez	2025-01-03 15:02:41.118167
130	Ashley Nicole Moore	2025-01-03 15:02:41.118167
131	Ria Ananda Pratiwi	2025-01-03 15:02:41.118167
132	Maja Božić	2025-01-03 15:02:41.118167
133	Emily Dawn Kelly	2025-01-03 15:02:41.118167
134	Ivana Vasiljević	2025-01-03 15:02:41.118167
135	Luke Christopher Allen	2025-01-03 15:02:41.118167
136	Brian Austin Johnson	2025-01-03 15:02:41.118167
137	Zhang Xiu	2025-01-03 15:02:41.118167
138	Noor-Anwar Jamil	2025-01-03 15:02:41.118167
139	Charles Alan Wright	2025-01-03 15:02:41.118167
140	Natalia Vladimirovna Petrova	2025-01-03 15:02:41.118167
141	Elena Yurievna Shapovalova	2025-01-03 15:02:41.118167
142	Jack Martinez	2025-01-03 15:02:41.118167
143	Svetlana Romanovna Egorova	2025-01-03 15:02:41.118167
144	Cian Murphy	2025-01-03 15:02:41.118167
145	Mariam El-Amin	2025-01-03 15:02:41.118167
146	Sarah Elizabeth Turner	2025-01-03 15:02:41.118167
147	Tamara Petrova	2025-01-03 15:02:41.118167
148	Chloe Baker	2025-01-03 15:02:41.118167
149	Noah Taylor	2025-01-03 15:02:41.118167
150	Antoine Bernard Dupont	2025-01-03 15:02:41.118167
151	Rahul Bhupinder Rajput	2025-01-03 15:02:41.118167
152	Gabriel Pierre Lefevre	2025-01-03 15:02:41.118167
153	Ivan Andreevich Popov	2025-01-03 15:02:41.118167
154	Dalia S. Zidan	2025-01-03 15:02:41.118167
155	Mei Kobayashi	2025-01-03 15:02:41.118167
156	Tomasz Aleksander Wojciechowski	2025-01-03 15:02:41.118167
157	Chiamaka Nneka Okafor	2025-01-03 15:02:41.118167
158	Lily Thompson	2025-01-03 15:02:41.118167
159	Aditi N. Chawla	2025-01-03 15:02:41.118167
160	Ava Huang	2025-01-03 15:02:41.118167
161	Christopher-Matthew King	2025-01-03 15:02:41.118167
162	Katerina Vasilaki	2025-01-03 15:02:41.118167
163	Kevin Mark Stewart	2025-01-03 15:02:41.118167
164	Lily May Scott	2025-01-03 15:02:41.118167
165	Mark Allen Clark	2025-01-03 15:02:41.118167
166	Noor Mohammad Al-Khatib	2025-01-03 15:02:41.118167
167	Javier Esteban Ruiz	2025-01-03 15:02:41.118167
168	Emiliano Cruz-Salazar	2025-01-03 15:02:41.118167
169	Andrea Romano	2025-01-03 15:02:41.118167
170	Juan Diego Pérez-Serrano	2025-01-03 15:02:41.118167
171	Chloé Renée Martin	2025-01-03 15:02:41.118167
172	Olivia Jackson	2025-01-03 15:02:41.118167
173	Rodrigo Vicente Silva	2025-01-03 15:02:41.118167
174	Zara Hussain	2025-01-03 15:02:41.118167
175	Isabel González-Navarro	2025-01-03 15:02:41.118167
176	Liam Perez	2025-01-03 15:02:41.118167
177	Sophia Li	2025-01-03 15:02:41.118167
178	Mei Lin	2025-01-03 15:02:41.118167
179	Guo Ming	2025-01-03 15:02:41.118167
180	Jacob Timothy Lee	2025-01-03 15:02:41.118167
181	Alexander Scott	2025-01-03 15:02:41.118167
182	Logan Nelson	2025-01-03 15:02:41.118167
183	Raden Ayu Puspita Sari	2025-01-03 15:02:41.118167
184	Arkady Igorevich Petrov	2025-01-03 15:02:41.118167
185	Tiffany Marie Green	2025-01-03 15:02:41.118167
186	Theo Chen	2025-01-03 15:02:41.118167
187	Laila Ayoub	2025-01-03 15:02:41.118167
188	William Henry Martin	2025-01-03 15:02:41.118167
189	Benjamin Moore	2025-01-03 15:02:41.118167
190	Samuel Hall	2025-01-03 15:02:41.118167
191	Oluwatobiloba Ayodeji Adeola	2025-01-03 15:02:41.118167
192	Dmitry Shulgin	2025-01-03 15:02:41.118167
193	Sophia Elizabeth Davis	2025-01-03 15:02:41.118167
194	Ashley Nicole Adams	2025-01-03 15:02:41.118167
195	Agnieszka Zofia Zielińska	2025-01-03 15:02:41.118167
196	Gabriela Sánchez	2025-01-03 15:02:41.118167
197	Konstantin Ivanov	2025-01-03 15:02:41.118167
198	Zhou Wei	2025-01-03 15:02:41.118167
199	Fatima Zahra Al-Mansour	2025-01-03 15:02:41.118167
200	Alexander Allen	2025-01-03 15:02:41.118167
201	Mason Davis	2025-01-03 15:02:41.118167
202	Dragana Ilić	2025-01-03 15:02:41.118167
203	Sofia Rossi	2025-01-03 15:02:41.118167
204	Chaiyut Srisuk	2025-01-03 15:02:41.118167
205	Zhang Wei	2025-01-03 15:02:41.118167
206	Olivia Brown	2025-01-03 15:02:41.118167
207	Bojana Tadić	2025-01-03 15:02:41.118167
208	Fadi Nabil Al-Din	2025-01-03 15:02:41.118167
209	Gabriel Durand	2025-01-03 15:02:41.118167
210	Hana Kimura	2025-01-03 15:02:41.118167
211	Charlotte Taylor	2025-01-03 15:02:41.118167
212	Catherine Marie Williams	2025-01-03 15:02:41.118167
213	Rafael Costa Almeida	2025-01-03 15:02:41.118167
214	Zaid Jamil Al-Basha	2025-01-03 15:02:41.118167
215	Ethan Young	2025-01-03 15:02:41.118167
216	Nurul Hidayah Sari	2025-01-03 15:02:41.118167
217	Kittisak Jirawut	2025-01-03 15:02:41.118167
218	Valentina Rodríguez-Corona	2025-01-03 15:02:41.118167
219	Maya Sharma	2025-01-03 15:02:41.118167
220	Mahnoor Javed-Bhatti	2025-01-03 15:02:41.118167
221	Grace Wright	2025-01-03 15:02:41.118167
222	Megan Marie Mitchell	2025-01-03 15:02:41.118167
223	Olivia Marie Brown	2025-01-03 15:02:41.118167
224	Kiran-Singh Bhagat	2025-01-03 15:02:41.118167
225	James Michael Brown	2025-01-03 15:02:41.118167
226	Ana Clara Martins	2025-01-03 15:02:41.118167
227	Ava Nelson	2025-01-03 15:02:41.118167
228	Giovanni Bianchi	2025-01-03 15:02:41.118167
229	Carlos Eduardo Machado	2025-01-03 15:02:41.118167
230	David Johnson	2025-01-03 15:02:41.118167
231	Marina Kolar	2025-01-03 15:02:41.118167
232	Phailin N. Anusorn	2025-01-03 15:02:41.118167
233	Gabriel Pérez-Bautista	2025-01-03 15:02:41.118167
234	Olga Sergeevna Vasilieva	2025-01-03 15:02:41.118167
235	Emma Johnson	2025-01-03 15:02:41.118167
236	Victoria Hill	2025-01-03 15:02:41.118167
237	Daria Evgenievna Frolova	2025-01-03 15:02:41.118167
238	Samira Aisha Rahman	2025-01-03 15:02:41.118167
239	Harper Lewis	2025-01-03 15:02:41.118167
240	Hannah Michelle Moore	2025-01-03 15:02:41.118167
241	Amaka Uzochi Nwosu	2025-01-03 15:02:41.118167
242	Tariq El-Muhammad	2025-01-03 15:02:41.118167
243	Milica Novak	2025-01-03 15:02:41.118167
244	Sara Louise Robinson	2025-01-03 15:02:41.118167
245	John Paul Harrison	2025-01-03 15:02:41.118167
246	Arjun Patel	2025-01-03 15:02:41.118167
247	Grace Evelyn Martinez	2025-01-03 15:02:41.118167
248	Charlotte Anne Robinson	2025-01-03 15:02:41.118167
249	Amelia Wright	2025-01-03 15:02:41.118167
250	Steven Douglas White	2025-01-03 15:02:41.118167
251	Muhammad Usman Raza	2025-01-03 15:02:41.118167
252	Iwan Setiawan-Dewi	2025-01-03 15:02:41.118167
253	Kirill Mikhailovich Shevchenko	2025-01-03 15:02:41.118167
254	Adam Lewandowski	2025-01-03 15:02:41.118167
255	Xu Jing	2025-01-03 15:02:41.118167
256	Vuković Stefan	2025-01-03 15:02:41.118167
257	Daichi Nakamura	2025-01-03 15:02:41.118167
258	Piotr Wojciechowski	2025-01-03 15:02:41.118167
259	Konstantin Yurievich Ivanov	2025-01-03 15:02:41.118167
260	Hugo Michel Dufresne	2025-01-03 15:02:41.118167
261	César Augusto Mendoza	2025-01-03 15:02:41.118167
262	Lyudmila Mikhailovna Karpova	2025-01-03 15:02:41.118167
263	Abigail Grace White	2025-01-03 15:02:41.118167
264	François-Xavier Gauthier	2025-01-03 15:02:41.118167
265	Paula Gómez-Ortiz	2025-01-03 15:02:41.118167
266	Ewa Mazur	2025-01-03 15:02:41.118167
267	James Rodriguez	2025-01-03 15:02:41.118167
268	Marko Kovačević	2025-01-03 15:02:41.118167
269	Harrison Luke Green	2025-01-03 15:02:41.118167
270	Daichi Yamamoto	2025-01-03 15:02:41.118167
271	Noah Mitchell	2025-01-03 15:02:41.118167
272	Rina Lee	2025-01-03 15:02:41.118167
273	Henry Tran	2025-01-03 15:02:41.118167
274	Michael James Harris	2025-01-03 15:02:41.118167
275	Jakub Piotr Wiśniewski	2025-01-03 15:02:41.118167
276	Robert Lee Smith	2025-01-03 15:02:41.118167
277	Khaled Mustafa Al-Rashid	2025-01-03 15:02:41.118167
278	Jessica Marie Thomas	2025-01-03 15:02:41.118167
279	Rachel Anne Cooper	2025-01-03 15:02:41.118167
280	Praewphan Boonwong	2025-01-03 15:02:41.118167
281	Li Xian	2025-01-03 15:02:41.118167
282	Konstantin Zaharov	2025-01-03 15:02:41.118167
283	Deborah Lee Taylor	2025-01-03 15:02:41.118167
284	Lauren Ann Campbell	2025-01-03 15:02:41.118167
285	Andrés Manuel Vargas	2025-01-03 15:02:41.118167
286	Mariana Ramos	2025-01-03 15:02:41.118167
287	Teresa Jiménez	2025-01-03 15:02:41.118167
288	Susan Marie Hall	2025-01-03 15:02:41.118167
289	Camille Bernard	2025-01-03 15:02:41.118167
290	Mary Ann Johnson	2025-01-03 15:02:41.118167
291	Aditya Krishnan Reddy	2025-01-03 15:02:41.118167
292	Alexander Moore	2025-01-03 15:02:41.118167
293	Sarah Ann Coleman	2025-01-03 15:02:41.118167
294	Conor Lynch	2025-01-03 15:02:41.118167
295	Siobhán Ní Mháille	2025-01-03 15:02:41.118167
296	Michael Brown	2025-01-03 15:02:41.118167
297	Isabela Rodrigues-Pereira	2025-01-03 15:02:41.118167
298	Andrej Nikolov	2025-01-03 15:02:41.118167
299	James Edward Brown	2025-01-03 15:02:41.118167
300	Francisco Javier Salazar	2025-01-03 15:02:41.118167
301	Sophie Laurent-Dupuis	2025-01-03 15:02:41.118167
302	Ekaterina Olegovna Ivanova	2025-01-03 15:02:41.118167
303	Dragana Kovačević	2025-01-03 15:02:41.118167
304	Gabriel Evans	2025-01-03 15:02:41.118167
305	Kai Chen	2025-01-03 15:02:41.118167
306	Gabriella Ferrara	2025-01-03 15:02:41.118167
307	Alexander Ivanovich Petrov	2025-01-03 15:02:41.118167
308	Thiago Oliveira-Ribeiro	2025-01-03 15:02:41.118167
309	Olivia Kim	2025-01-03 15:02:41.118167
310	Agnieszka Zielińska	2025-01-03 15:02:41.118167
311	Priya R. Sharma	2025-01-03 15:02:41.118167
312	Daria Frolova	2025-01-03 15:02:41.118167
313	Paola Fernández	2025-01-03 15:02:41.118167
314	Samuel Lee Adams	2025-01-03 15:02:41.118167
315	Magdalena-Katarzyna Kowalczyk	2025-01-03 15:02:41.118167
316	Brian Michael Gonzalez	2025-01-03 15:02:41.118167
317	José Luis Castillo	2025-01-03 15:02:41.118167
318	Alexey Viktorovich Zakharov	2025-01-03 15:02:41.118167
319	Jovan Živković	2025-01-03 15:02:41.118167
320	Emily Grace Adams	2025-01-03 15:02:41.118167
321	Nadia Samir Fayed	2025-01-03 15:02:41.118167
322	Chen Li	2025-01-03 15:02:41.118167
323	Yegor Romanov	2025-01-03 15:02:41.118167
324	Amelia Huang	2025-01-03 15:02:41.118167
325	Christopher Michael Young	2025-01-03 15:02:41.118167
326	Amina Bint Abdulaziz	2025-01-03 15:02:41.118167
327	Kabir Alok Joshi	2025-01-03 15:02:41.118167
328	Diego Alejandro López	2025-01-03 15:02:41.118167
329	Svetlana Egorova	2025-01-03 15:02:41.118167
330	Clara Isabel González	2025-01-03 15:02:41.118167
331	Samuel Isaac Cooper	2025-01-03 15:02:41.118167
332	Viktor Romanov	2025-01-03 15:02:41.118167
333	Giorgos Theodorou	2025-01-03 15:02:41.118167
334	Stéphane Bernard-Roch	2025-01-03 15:02:41.118167
335	Lucien Noël Lefevre	2025-01-03 15:02:41.118167
336	Adam Łukasz Lewandowski	2025-01-03 15:02:41.118167
337	Benjamin Joseph Parker	2025-01-03 15:02:41.118167
338	Leonardo Martínez	2025-01-03 15:02:41.118167
339	Max Lee	2025-01-03 15:02:41.118167
340	Ksenia Baranova	2025-01-03 15:02:41.118167
341	Fatima Z. Malik	2025-01-03 15:02:41.118167
342	Greg Thomas Taylor	2025-01-03 15:02:41.118167
343	Meher R. Chaudhry	2025-01-03 15:02:41.118167
344	Hassan-Mohammad Tariq	2025-01-03 15:02:41.118167
345	Rami Ziad Al-Saadi	2025-01-03 15:02:41.118167
346	Benjamin Cho	2025-01-03 15:02:41.118167
347	João Pedro Silva	2025-01-03 15:02:41.118167
348	Ryan Sato	2025-01-03 15:02:41.118167
349	Alan Richard Ellis	2025-01-03 15:02:41.118167
350	Vera Belova	2025-01-03 15:02:41.118167
351	Rosa María Silva	2025-01-03 15:02:41.118167
352	Ioannis Konstantinou	2025-01-03 15:02:41.118167
353	Li Wei	2025-01-03 15:02:41.118167
354	Megan Claire Johnson	2025-01-03 15:02:41.118167
355	Madison Claire Anderson	2025-01-03 15:02:41.118167
356	Mariana Isabel García	2025-01-03 15:02:41.118167
357	Christina Marie Watson	2025-01-03 15:02:41.118167
358	Saoirse O'Brien	2025-01-03 15:02:41.118167
359	Chloe Roberts	2025-01-03 15:02:41.118167
360	Brian Patrick Brown	2025-01-03 15:02:41.118167
361	Aleksandar Petrović	2025-01-03 15:02:41.118167
362	Jakub Wiśniewski	2025-01-03 15:02:41.118167
363	Valentina Pavlovna Ponomareva	2025-01-03 15:02:41.118167
364	Grigory Morozov	2025-01-03 15:02:41.118167
365	Samuel Edward Anderson	2025-01-03 15:02:41.118167
366	Mia Wilson	2025-01-03 15:02:41.118167
367	Wang Xiu	2025-01-03 15:02:41.118167
368	Anton Pavlovich Zaitsev	2025-01-03 15:02:41.118167
370	Lucas Martinez	2025-01-03 15:02:41.118167
371	Brian Douglas Brown	2025-01-03 15:02:41.118167
372	Carlos Alberto Rivera	2025-01-03 15:02:41.118167
373	Li Hua	2025-01-03 15:02:41.118167
374	Nathaniel Paul Cooper	2025-01-03 15:02:41.118167
375	Ricardo Eduardo Sánchez	2025-01-03 15:02:41.118167
376	Robert Wilson	2025-01-03 15:02:41.118167
377	Polina Tkachenko	2025-01-03 15:02:41.118167
378	Maya-Swati Bansal	2025-01-03 15:02:41.118167
379	Taufik Hidayat-Jayadi	2025-01-03 15:02:41.118167
380	Seamus Brennan	2025-01-03 15:02:41.118167
381	Emma Tan	2025-01-03 15:02:41.118167
382	Ekaterina Ivanova	2025-01-03 15:02:41.118167
383	Karolina Ewa Kwiatkowska	2025-01-03 15:02:41.118167
384	Iván Morales-Pérez	2025-01-03 15:02:41.118167
385	Chen Ying	2025-01-03 15:02:41.118167
386	Isabella Wright	2025-01-03 15:02:41.118167
387	Salma Ibrahim Khalil	2025-01-03 15:02:41.118167
388	Ethan Wong	2025-01-03 15:02:41.118167
389	Isabella Hill	2025-01-03 15:02:41.118167
390	Christopher Brian Lee	2025-01-03 15:02:41.118167
391	Anastasia Dmitrievna Kolesnikova	2025-01-03 15:02:41.118167
392	Kaito Suzuki	2025-01-03 15:02:41.118167
393	Arturo García-Martínez	2025-01-03 15:02:41.118167
394	Miguel Ángel Morales	2025-01-03 15:02:41.118167
395	Charlotte Scott	2025-01-03 15:02:41.118167
396	Diya Aarti Rao	2025-01-03 15:02:41.118167
369	Alessandra Cortez	2025-01-03 15:02:41.118167
397	Adebimpe Oluwaseun Akinyemi	2025-01-03 15:02:41.118167
398	Lucas Tan	2025-01-03 15:02:41.118167
399	Eka Yuliana Putri	2025-01-03 15:02:41.118167
400	Wang Jun	2025-01-03 15:02:41.118167
401	Nikola Marković	2025-01-03 15:02:41.118167
402	Viktor Kiselev	2025-01-03 15:02:41.118167
403	Aliya Naeem Sheikh	2025-01-03 15:02:41.118167
404	Daniel Taylor	2025-01-03 15:02:41.118167
405	Alina Mikhailovna Sidorova	2025-01-03 15:02:41.118167
406	Hira Jameela Bhatti	2025-01-03 15:02:41.118167
407	James Evans	2025-01-03 15:02:41.118167
408	Amber Lynn Harris	2025-01-03 15:02:41.118167
409	Sophie Perez	2025-01-03 15:02:41.118167
410	Kimberly Jo Thompson	2025-01-03 15:02:41.118167
411	William Aaron Phillips	2025-01-03 15:02:41.118167
412	Rohan Amit Nair	2025-01-03 15:02:41.118167
413	Grace Lewis	2025-01-03 15:02:41.118167
414	M. Fahmi Abdurrahman	2025-01-03 15:02:41.118167
415	Michał Jan Kowalski	2025-01-03 15:02:41.118167
416	Beatriz Gomes-Ferreira	2025-01-03 15:02:41.118167
417	Olga Vasilieva	2025-01-03 15:02:41.118167
418	Arkady Petrov	2025-01-03 15:02:41.118167
419	Michał Kowalski	2025-01-03 15:02:41.118167
420	Ananya Vashti Desai	2025-01-03 15:02:41.118167
421	Jun Park	2025-01-03 15:02:41.118167
422	Kimberly Sue Williams	2025-01-03 15:02:41.118167
423	Chloe Wang	2025-01-03 15:02:41.118167
424	Ayumi Tanaka	2025-01-03 15:02:41.118167
425	Zeta McNoir	2025-01-05 03:04:09.756208
\.


--
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: todo_user
--

COPY public.resources (id, todo_id, resource_link) FROM stdin;
1	1	https://example.com/resource
\.


--
-- Data for Name: todo_assignments; Type: TABLE DATA; Schema: public; Owner: todo_user
--

COPY public.todo_assignments (todo_id, user_id) FROM stdin;
\.


--
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: todo_user
--

COPY public.todos (id, title, description, deadline, created_at, completed) FROM stdin;
1	Review John Doe's file	Review the latest doctor letter	2025-01-15 12:00:00	2025-01-03 14:56:53.706809	f
5	Review Theo Chen's file	Review the latest doctor letter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
6	Regular Visit	Regular visit from patient Yulia Alexandrovna Morozova	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
7	Consultation	Consultation apointment with patient John Doe	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
8	Review Ethan Wong's file	Review the latest doctor letter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
10	Consultation	Consultation apointment with patient Renata González	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
11	Regular Visit	Regular visit from patient Ethan Adams	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
14	Consultation	Consultation apointment with patient Ali Ahmed Al-Hashimi	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
15	Review Giovanni Bianchi's file	Review the latest doctor letter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
16	Consultation	Consultation apointment with patient Neha G. Agarwal	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
19	Review Eka Yuliana Putri's file	Review the latest doctor letter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
20	Review Matteo Giovanni Russo's file	Review the latest doctor letter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
21	Regular Visit	Regular visit from patient Ryan Park	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
22	Regular Visit	Regular visit from patient Magdalena Kowalczyk	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
23	Review Carmen Lucia García's file	Review the latest doctor letter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
25	Review Viktor Andreevich Kiselev's file	Review the latest doctor letter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
26	Review Milica Novak's file	Review the latest doctor letter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
27	Review Zhang Wei's file	Review the latest doctor letter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
30	Consultation	Consultation apointment with patient Alan Thomas Brown	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
31	Regular Visit	Regular visit from patient Victoria Anne Taylor	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	f
17	Regular Visit	Regular visit from patient Jack Carter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	t
4	Mia's Biweekly	Regular visit from patient Mia Martinez	2025-01-03 04:31:39.173	2025-01-03 18:31:39.173468	f
34	Rahul's visit	Regular visit from patient Rahul Desai	2025-01-01 17:31:39.173	2025-01-03 18:31:39.173468	f
3	consultation Ms. Alice	Consultation apointment with patient Alice-Pauline Deschamps	2025-01-03 11:31:39.173	2025-01-03 18:31:39.173468	f
24	Regular Visit	Regular visit from patient Seán Ó Conchúir	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	t
29	Consultation	Consultation apointment with patient Ava Claire Lewis	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	t
33	Review Piotr Wojciechowski's file	Review the latest doctor letter	2025-01-03 18:31:39.173468	2025-01-03 18:31:39.173468	t
2	Attend Biennale Seminar of Radiology	11 February 2025 3PM @John Hopkins Hall	2025-01-03 18:15:04.61112	2025-01-03 18:15:04.61112	t
9	dimitrous @monday (visit)	Regular visit from patient Dimitrios Christodoulou	2025-01-03 11:31:39.173	2025-01-03 18:31:39.173468	t
32	Ana's Visit	Regular visit from patient Ana Petrova	2025-01-03 11:31:39.173	2025-01-03 18:31:39.173468	f
35	attend dermatology conference 2025	Get ready to sharpen your dermatologic expertise at the 2025 AAD Annual Meeting, March 7-11. This is the premier dermatology education event of the year where you'll delve into a comprehensive program led by dermatology experts and broaden your horizons through connections with peers and industry leaders.	2025-01-17 05:56:16.352	2025-01-03 19:56:16.445707	f
36	ICU Patient Visits	Visit and assess the condition of patients in the ICU, check vital signs, and review their progress.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
37	Post-Op Recovery Check	Monitor patients recovering from surgery to ensure proper healing, assess for complications, and update their recovery plans.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
38	Review Overnight Progress Notes	Go over the progress notes from the night shift to stay informed about any significant changes in patient conditions.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
39	Joint Pain Consultation	Meet with Dr. Smith's referred patient to assess their joint pain, perform a physical examination, and discuss possible treatment options.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
40	Blood Pressure Exam	Perform a physical exam on Mr. Johnson to assess his blood pressure levels, check for underlying conditions, and adjust his treatment plan if needed.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
41	Review Blood Sugar Lab Results	Go over Ms. Thompson’s lab results to evaluate her blood sugar levels and determine the next steps in her diabetes management.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
42	MRI Results Call	Call Mrs. Williams to discuss the findings of her MRI and answer any questions or concerns about her diagnosis.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
43	Medication Follow-Up	Follow up with Mr. Lee regarding his medication adjustments for anxiety, ensuring he is responding well to the changes.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
44	Sign Off on Patient Charts	Review and sign off on patient charts to ensure that all documentation is accurate and up to date for billing and medical records.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
45	Billing and Coding	Complete billing and coding tasks for yesterday’s procedures to ensure proper insurance claims and reimbursements.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
46	Urgent Email Responses	Respond to urgent emails from colleagues, particularly those involving patient referrals or critical medical information.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
47	Surgical Preparation	Prepare for Mr. Adams’ knee replacement surgery by reviewing the surgical plan, patient history, and ensuring all necessary equipment is ready.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
48	Consent Form Review	Review and finalize the consent forms for Dr. Patel’s upcoming procedure, ensuring all necessary disclosures are made to the patient.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
49	Medical Research	Read recent journal articles on diabetes treatment to stay updated on new advancements and best practices.	2025-01-17 21:50:49.269355	2025-01-03 21:50:49.269355	f
50	Attend Cardiology Seminar	Attend a virtual seminar on the latest advancements in cardiology to expand knowledge in the field and apply it to patient care.	2025-01-17 14:50:49.269	2025-01-03 21:50:49.269355	f
51	Nursing Staff Check-In (Edited)	Check in with the nursing staff at the end of the day to address any urgent issues, concerns, or updates regarding patient care.	2025-01-17 14:50:49.269	2025-01-03 21:50:49.269355	f
52	Plan Tomorrow’s Schedule	Organize and plan the patient schedule for the following day, ensuring that appointments and procedures are appropriately allocated. Refer to document	2025-01-17 14:50:49.269	2025-01-03 21:50:49.269355	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: todo_user
--

COPY public.users (id, name, role, doctor_number, created_at) FROM stdin;
105	Pierre-Alexandre Dubois	Nurse	\N	2025-01-03 15:23:42.557192
106	Jack Gonzalez	Nurse	\N	2025-01-03 15:23:42.557192
107	Sarah Miller	Doctor	DHS3947551	2025-01-03 15:23:42.557192
108	Oleg Frolov	Doctor	HIG9201526	2025-01-03 15:23:42.557192
109	Kirill Shevchenko	Doctor	AUT7065659	2025-01-03 15:23:42.557192
110	Amira-Fatima Khaled	Secretary	\N	2025-01-03 15:23:42.557192
111	Budi Santoso Adi	Nurse	\N	2025-01-03 15:23:42.557192
112	Edward Daniel Thompson	Doctor	XCD6392594	2025-01-03 15:23:42.557192
113	James Michael Smith	Nurse	\N	2025-01-03 15:23:42.557192
114	Nikolai Ivanovich Volkoff	Nurse	\N	2025-01-03 15:23:42.557192
115	Lyudmila Karpova	Secretary	\N	2025-01-03 15:23:42.557192
116	Zoe Liu	Doctor	WJP6213299	2025-01-03 15:23:42.557192
117	Ice Sawangsri	Secretary	\N	2025-01-03 15:23:42.557192
118	Noah Benjamin Carter	Nurse	\N	2025-01-03 15:23:42.557192
119	Chuka Emeka Anyanwu	Doctor	IVI9555978	2025-01-03 15:23:42.557192
120	Jessica Lynn White	Doctor	QII9364810	2025-01-03 15:23:42.557192
121	Nattapong Panya	Doctor	CEJ4788125	2025-01-03 15:23:42.557192
122	Juan Carlos Rodríguez	Doctor	SGP6252555	2025-01-03 15:23:42.557192
123	Angela Marie Walker	Doctor	YLP9397717	2025-01-03 15:23:42.557192
124	Tamanna Iyer-Pillai	Secretary	\N	2025-01-03 15:23:42.557192
125	Lucia Hernández	Nurse	\N	2025-01-03 15:23:42.557192
126	Karolina Kwiatkowska	Secretary	\N	2025-01-03 15:23:42.557192
127	Somchai Rungkumhang	Secretary	\N	2025-01-03 15:23:42.557192
128	Aisha Rukayat Tijani	Nurse	\N	2025-01-03 15:23:42.557192
129	Jacob Thomas Johnson	Doctor	VFF0861453	2025-01-03 15:23:42.557192
130	Elena Shapovalova	Nurse	\N	2025-01-03 15:23:42.557192
131	Emi Chen	Secretary	\N	2025-01-03 15:23:42.557192
132	Claire-Audrey Vasseur	Doctor	SJT4149730	2025-01-03 15:23:42.557192
133	Siti Nurhaliza Binti Ahmad	Nurse	\N	2025-01-03 15:23:42.557192
134	Ivana Jovanović	Nurse	\N	2025-01-03 15:23:42.557192
135	Amelia Jane Carter	Nurse	\N	2025-01-03 15:23:42.557192
136	Amelia Garcia	Doctor	QZO5170596	2025-01-03 15:23:42.557192
137	Zinaida Khokhlova	Doctor	VSS9514888	2025-01-03 15:23:42.557192
138	Lisa-Marie Anderson	Doctor	FYS4000070	2025-01-03 15:23:42.557192
139	Dušan Mitić	Secretary	\N	2025-01-03 15:23:42.557192
140	Daniel King	Nurse	\N	2025-01-03 15:23:42.557192
141	Gennady Leonidovich Ivanov	Nurse	\N	2025-01-03 15:23:42.557192
142	Anthony Lee Jackson	Nurse	\N	2025-01-03 15:23:42.557192
143	Samuel Lee	Secretary	\N	2025-01-03 15:23:42.557192
144	Amélie Bérenger	Doctor	REX3654729	2025-01-03 15:23:42.557192
145	Layla Nour Hassan	Doctor	TGR6270597	2025-01-03 15:23:42.557192
146	Aiden Kim	Secretary	\N	2025-01-03 15:23:42.557192
147	João Paulo Pereira	Nurse	\N	2025-01-03 15:23:42.557192
148	Tatiana Mikhailovna Pavlova	Nurse	\N	2025-01-03 15:23:42.557192
149	Jennifer Ann Miller	Nurse	\N	2025-01-03 15:23:42.557192
150	Tatiane Almeida-Ramos	Doctor	QVM7715423	2025-01-03 15:23:42.557192
151	Tomasz Jankowski	Nurse	\N	2025-01-03 15:23:42.557192
152	Emily Yang	Doctor	SAU4457294	2025-01-03 15:23:42.557192
153	Naomi Kwon	Doctor	NBF9248855	2025-01-03 15:23:42.557192
154	Omar Tariq Bin Rashid	Doctor	ZAB2865651	2025-01-03 15:23:42.557192
155	Lucas James Williams	Nurse	\N	2025-01-03 15:23:42.557192
156	Nadezhda Leonidovna Babakova	Secretary	\N	2025-01-03 15:23:42.557192
157	Ahmed Al-Farsi	Doctor	OOQ6865004	2025-01-03 15:23:42.557192
158	Carolina Vega	Doctor	EBF8663638	2025-01-03 15:23:42.557192
159	Lucas Young	Nurse	\N	2025-01-03 15:23:42.557192
160	Irina Valeryevna Golubeva	Doctor	IWB6883480	2025-01-03 15:23:42.557192
161	Rocío Fernández-Benítez	Nurse	\N	2025-01-03 15:23:42.557192
162	Ana María Delgado	Doctor	OUU7157902	2025-01-03 15:23:42.557192
163	Luka Stojanović	Nurse	\N	2025-01-03 15:23:42.557192
164	Sophia Williams	Nurse	\N	2025-01-03 15:23:42.557192
165	Lucas Gabriel Souza	Nurse	\N	2025-01-03 15:23:42.557192
166	Liu Yang	Nurse	\N	2025-01-03 15:23:42.557192
167	Patricia Clark-Williams	Nurse	\N	2025-01-03 15:23:42.557192
168	Mustafa Abdulaziz	Doctor	TTT4224551	2025-01-03 15:23:42.557192
169	Aiko Matsumoto	Secretary	\N	2025-01-03 15:23:42.557192
170	Emma Grace Johnson	Secretary	\N	2025-01-03 15:23:42.557192
171	Kyra Yu	Nurse	\N	2025-01-03 15:23:42.557192
172	Enrique Torres-Castro	Secretary	\N	2025-01-03 15:23:42.557192
173	Lucy Evans	Nurse	\N	2025-01-03 15:23:42.557192
174	Thomas Arnold Robinson	Secretary	\N	2025-01-03 15:23:42.557192
175	Jacob David Thompson	Nurse	\N	2025-01-03 15:23:42.557192
176	Vikram S. Mehta	Doctor	GOP9918569	2025-01-03 15:23:42.557192
177	Tariq Zubair Khan	Doctor	ZEE7506115	2025-01-03 15:23:42.557192
178	Emma Clark	Nurse	\N	2025-01-03 15:23:42.557192
179	Marina Aleksandrova	Secretary	\N	2025-01-03 15:23:42.557192
180	Leela Verma Shah	Doctor	WLN4949736	2025-01-03 15:23:42.557192
181	Laura Elena Méndez	Nurse	\N	2025-01-03 15:23:42.557192
182	Patricia Ann Phillips	Nurse	\N	2025-01-03 15:23:42.557192
183	Lucia Moretti	Secretary	\N	2025-01-03 15:23:42.557192
184	Daniel Robert Perez	Nurse	\N	2025-01-03 15:23:42.557192
185	Melissa Anne Martin	Secretary	\N	2025-01-03 15:23:42.557192
186	Oksana Nikolaevna Sokolova	Doctor	OSL2834456	2025-01-03 15:23:42.557192
188	Priya Kapoor	Nurse	\N	2025-01-03 15:23:42.557192
189	Mia Chen	Secretary	\N	2025-01-03 15:23:42.557192
190	Larissa Santos	Nurse	\N	2025-01-03 15:23:42.557192
191	Leo Takahashi	Nurse	\N	2025-01-03 15:23:42.557192
192	Suki Nguyen	Nurse	\N	2025-01-03 15:23:42.557192
193	Lily Ann Clark	Nurse	\N	2025-01-03 15:23:42.557192
194	Louis-Marie Dupont	Nurse	\N	2025-01-03 15:23:42.557192
195	Grigory Aleksandrovich Morozov	Secretary	\N	2025-01-03 15:23:42.557192
196	Ethan Zhang	Doctor	UDW3159641	2025-01-03 15:23:42.557192
197	Jelena Markovska	Nurse	\N	2025-01-03 15:23:42.557192
198	Ivana Petrović-Kovačević	Secretary	\N	2025-01-03 15:23:42.557192
199	Elijah Harris	Doctor	NPO2381182	2025-01-03 15:23:42.557192
200	Rania A. Al-Jaber	Nurse	\N	2025-01-03 15:23:42.557192
201	Juliana Alves-Freitas	Secretary	\N	2025-01-03 15:23:42.557192
202	Haruto Takahashi	Nurse	\N	2025-01-03 15:23:42.557192
203	Nikolaos Papageorgiou	Secretary	\N	2025-01-03 15:23:42.557192
204	Nikola Stojković	Nurse	\N	2025-01-03 15:23:42.557192
205	Filip Georgiev	Nurse	\N	2025-01-03 15:23:42.557192
206	Ethan Matthew Wright	Nurse	\N	2025-01-03 15:23:42.557192
207	Ayu Lestari Wijaya	Doctor	LFF5689006	2025-01-03 15:23:42.557192
208	Ethan Walker	Nurse	\N	2025-01-03 15:23:42.557192
209	William Lewis	Nurse	\N	2025-01-03 15:23:42.557192
210	Mason Li	Doctor	LRP1706317	2025-01-03 15:23:42.557192
211	Jack Henry King	Doctor	ZJM7161876	2025-01-03 15:23:42.557192
212	Mia Thompson	Nurse	\N	2025-01-03 15:23:42.557192
213	Siriporn Chantrakul	Doctor	HIF3632292	2025-01-03 15:23:42.557192
214	Pavel Dmitrievich Tarasov	Secretary	\N	2025-01-03 15:23:42.557192
215	Yasir Farooq Khan	Nurse	\N	2025-01-03 15:23:42.557192
216	Emily White	Secretary	\N	2025-01-03 15:23:42.557192
217	Alina Sidorova	Doctor	OIO5057828	2025-01-03 15:23:42.557192
218	Roman Melnikov	Doctor	WUH6484017	2025-01-03 15:23:42.557192
219	Jessica-Sue Dawson	Nurse	\N	2025-01-03 15:23:42.557192
220	Ekaterina Viktorovna Fedorova	Doctor	WQW3219358	2025-01-03 15:23:42.557192
221	Lily Harris	Nurse	\N	2025-01-03 15:23:42.557192
222	Aleksei Komarov	Secretary	\N	2025-01-03 15:23:42.557192
223	Siti Maemunah Nurani	Doctor	ABP4524054	2025-01-03 15:23:42.557192
224	Jack Wong	Nurse	\N	2025-01-03 15:23:42.557192
225	Bruno César Barbosa	Nurse	\N	2025-01-03 15:23:42.557192
226	Avery Clark	Nurse	\N	2025-01-03 15:23:42.557192
228	Sara Ristić	Nurse	\N	2025-01-03 15:23:42.557192
229	Piotr Andrzej Jankowski	Doctor	TID6939780	2025-01-03 15:23:42.557192
230	Benjamin Wilson	Nurse	\N	2025-01-03 15:23:42.557192
231	Nathalie Lemoine	Doctor	UIG3883758	2025-01-03 15:23:42.557192
232	Carter Daniel Turner	Nurse	\N	2025-01-03 15:23:42.557192
233	Irina Melnikova	Doctor	ESZ2330383	2025-01-03 15:23:42.557192
234	Nori Wong	Doctor	AAV9370192	2025-01-03 15:23:42.557192
235	Pablo Romero-Silva	Nurse	\N	2025-01-03 15:23:42.557192
236	Luis Miguel Ramírez	Nurse	\N	2025-01-03 15:23:42.557192
237	Li Mei	Secretary	\N	2025-01-03 15:23:42.557192
238	Anna-Maria Nowak	Doctor	AZY3924066	2025-01-03 15:23:42.557192
239	Maxim Yurievich Orlov	Secretary	\N	2025-01-03 15:23:42.557192
240	Yumi Takahashi	Nurse	\N	2025-01-03 15:23:42.557192
241	Nathaniel James Hayes	Nurse	\N	2025-01-03 15:23:42.557192
242	Melati R. Purnama	Secretary	\N	2025-01-03 15:23:42.557192
243	Liam Scott	Secretary	\N	2025-01-03 15:23:42.557192
244	Ibrahim Saeed Hadi	Nurse	\N	2025-01-03 15:23:42.557192
245	James Liu	Doctor	YOI1595628	2025-01-03 15:23:42.557192
246	Johnathan Craig Smith	Secretary	\N	2025-01-03 15:23:42.557192
247	Aulia Syahira Siregar	Secretary	\N	2025-01-03 15:23:42.557192
248	Steven John Campbell	Doctor	RXE8791105	2025-01-03 15:23:42.557192
249	Shabana Iqbal	Doctor	ZFO7058463	2025-01-03 15:23:42.557192
250	Aoife Máire Ní Bhraonáin	Doctor	YUB7618374	2025-01-03 15:23:42.557192
251	Huda K. Al-Sharif	Nurse	\N	2025-01-03 15:23:42.557192
252	Sofia Antoniou	Doctor	TZJ9080777	2025-01-03 15:23:42.557192
254	Isabelle Laurent	Doctor	HYI2852303	2025-01-03 15:23:42.557192
255	Thomas Edward Lee	Doctor	ZIG0879768	2025-01-03 15:23:42.557192
256	Lucie-Hélène Dupuis	Nurse	\N	2025-01-03 15:23:42.557192
257	Manish Kumar Singh	Doctor	GLS0441262	2025-01-03 15:23:42.557192
258	George Edward Mitchell	Doctor	OUE7885125	2025-01-03 15:23:42.557192
259	Josephine Rose Adams	Nurse	\N	2025-01-03 15:23:42.557192
260	Richard Daniel Thomas	Nurse	\N	2025-01-03 15:23:42.557192
261	Teodora Stanković	Doctor	PTV7974394	2025-01-03 15:23:42.557192
262	Wang Li	Secretary	\N	2025-01-03 15:23:42.557192
263	Samir Abdulrahman	Nurse	\N	2025-01-03 15:23:42.557192
264	Benjamin King	Nurse	\N	2025-01-03 15:23:42.557192
265	Jonathan Scott Williams	Nurse	\N	2025-01-03 15:23:42.557192
266	Tunde Babajide Ogunleye	Doctor	CUG6792872	2025-01-03 15:23:42.557192
267	Arthit Phuttharaksa	Nurse	\N	2025-01-03 15:23:42.557192
268	Arjun-Jay Tiwari	Secretary	\N	2025-01-03 15:23:42.557192
269	Omar Khalid Al-Sayed	Doctor	AAC9934420	2025-01-03 15:23:42.557192
270	Florence-Hélène Giraud	Doctor	CEB7072395	2025-01-03 15:23:42.557192
271	Grace Lim	Doctor	OVU1448680	2025-01-03 15:23:42.557192
272	Tatiana Lobova	Doctor	SRX0078062	2025-01-03 15:23:42.557192
273	Lucas Wu	Nurse	\N	2025-01-03 15:23:42.557192
274	Uzoamaka Chika Obi	Doctor	RQY8219975	2025-01-03 15:23:42.557192
275	Julien-Emmanuel Rousseau	Nurse	\N	2025-01-03 15:23:42.557192
276	Sakura Yoshida	Doctor	JAN3092851	2025-01-03 15:23:42.557192
277	Mia Zhang	Doctor	HDR1467982	2025-01-03 15:23:42.557192
278	Courtney Marie Clark	Nurse	\N	2025-01-03 15:23:42.557192
279	Ibrahim Suleiman Bello	Doctor	LMR8673583	2025-01-03 15:23:42.557192
280	Malik Jamaluddin	Nurse	\N	2025-01-03 15:23:42.557192
281	Lisa Marie Davis	Nurse	\N	2025-01-03 15:23:42.557192
282	Jiro Sato	Doctor	IPD1476440	2025-01-03 15:23:42.557192
283	Natalie Rose Evans	Doctor	CIQ6628865	2025-01-03 15:23:42.557192
284	Vladimir Igorevich Kuznetsov	Nurse	\N	2025-01-03 15:23:42.557192
285	Anton Zaitsev	Doctor	GYS2234283	2025-01-03 15:23:42.557192
286	Céline-Marie Dupuis	Doctor	TTO9107150	2025-01-03 15:23:42.557192
287	Saanvi K. Kapoor	Doctor	QUT7896105	2025-01-03 15:23:42.557192
288	Vasilios Nikas	Doctor	NLN3104435	2025-01-03 15:23:42.557192
289	Carolina Oliveira-Souza	Nurse	\N	2025-01-03 15:23:42.557192
290	Ngozi Chukwuemeka Okeke	Doctor	SBH8404627	2025-01-03 15:23:42.557192
291	Mikhail Aleksandrovich Kozlov	Secretary	\N	2025-01-03 15:23:42.557192
292	Aryan Raghav Gupta	Doctor	YCG4356567	2025-01-03 15:23:42.557192
293	Funke Ayotunde Lawal	Doctor	JLG4406571	2025-01-03 15:23:42.557192
294	Ricardo Pérez-Serrano	Doctor	VBE3472843	2025-01-03 15:23:42.557192
295	Daniel Baker	Doctor	UKB9733598	2025-01-03 15:23:42.557192
296	Daniel Joseph Harris Jr.	Secretary	\N	2025-01-03 15:23:42.557192
297	Laura Suzanne Carter	Secretary	\N	2025-01-03 15:23:42.557192
298	Robert Andrew Carter	Doctor	IOM0503104	2025-01-03 15:23:42.557192
299	Muhammad Rizki Abdullah	Doctor	IRY9505362	2025-01-03 15:23:42.557192
300	Olivier Thierry Marchand	Nurse	\N	2025-01-03 15:23:42.557192
301	Babajide Temidayo Adeleke	Secretary	\N	2025-01-03 15:23:42.557192
302	Amanda Joy Martinez	Nurse	\N	2025-01-03 15:23:42.557192
303	Yang Li	Doctor	GJO8776540	2025-01-03 15:23:42.557192
304	Laurence Dubois-Boulanger	Doctor	AWX3023496	2025-01-03 15:23:42.557192
305	Nour Al-Hassan	Nurse	\N	2025-01-03 15:23:42.557192
306	George William Roberts	Secretary	\N	2025-01-03 15:23:42.557192
307	Camila Pereira-Santos	Secretary	\N	2025-01-03 15:23:42.557192
308	Temiloluwa Ayodele Adewale	Doctor	GEO5932395	2025-01-03 15:23:42.557192
309	Alice Smith	Doctor	VEL4761433	2025-01-03 15:23:42.557192
310	Imran Farhan-Siddiqui	Nurse	\N	2025-01-03 15:23:42.557192
311	Éric Jacques Lemoine	Nurse	\N	2025-01-03 15:23:42.557192
312	Maria Nikolaidou	Secretary	\N	2025-01-03 15:23:42.557192
313	Lily Nguyen	Doctor	SUF5341106	2025-01-03 15:23:42.557192
314	Bojan Pavić	Nurse	\N	2025-01-03 15:23:42.557192
315	Ángel Miguel Ramírez	Doctor	FOI1962028	2025-01-03 15:23:42.557192
316	Charlotte D. Lefevre	Nurse	\N	2025-01-03 15:23:42.557192
317	Philip Andrew Jones	Doctor	VEV0788934	2025-01-03 15:23:42.557192
318	Leo Choi	Nurse	\N	2025-01-03 15:23:42.557192
319	Zofia Emilia Mazur	Doctor	KIZ0230571	2025-01-03 15:23:42.557192
320	Isabella Clark	Nurse	\N	2025-01-03 15:23:42.557192
321	Isabella Di Stefano	Secretary	\N	2025-01-03 15:23:42.557192
322	Ifeoma Ugochukwu Eze	Nurse	\N	2025-01-03 15:23:42.557192
323	Jessica Moore	Nurse	\N	2025-01-03 15:23:42.557192
324	Faizan-Ul-Haq Malik	Doctor	TPA3306138	2025-01-03 15:23:42.557192
325	Sophia Allen	Doctor	NKY5362610	2025-01-03 15:23:42.557192
326	Stevan Popović	Secretary	\N	2025-01-03 15:23:42.557192
227	Aamir Shahid Khan	Doctor	PYQ0469168	2025-01-03 15:23:42.557192
327	Steven Thomas Harris	Doctor	QHG5510050	2025-01-03 15:23:42.557192
328	Eleni Georgiou	Nurse	\N	2025-01-03 15:23:42.557192
329	Charlotte Sun	Nurse	\N	2025-01-03 15:23:42.557192
330	Jacques-Paul Lefevre	Secretary	\N	2025-01-03 15:23:42.557192
331	William Shi	Doctor	JCN8912857	2025-01-03 15:23:42.557192
332	Lily Young	Doctor	ELB9391580	2025-01-03 15:23:42.557192
333	Noah Kimura	Nurse	\N	2025-01-03 15:23:42.557192
334	Sergey Alexandrovich Volkov	Doctor	YSN7277017	2025-01-03 15:23:42.557192
335	Nadezhda Babakova	Doctor	NWG4588192	2025-01-03 15:23:42.557192
336	William Henry Davis	Doctor	UYS2866352	2025-01-03 15:23:42.557192
337	Deborah Jean Walker	Nurse	\N	2025-01-03 15:23:42.557192
338	Dimitrije Jovanov	Nurse	\N	2025-01-03 15:23:42.557192
339	Andrew James Scott	Secretary	\N	2025-01-03 15:23:42.557192
340	Rafael Díaz-Corona	Doctor	VJZ5714135	2025-01-03 15:23:42.557192
341	Margaret Louise Harris	Doctor	TIN2250407	2025-01-03 15:23:42.557192
342	Liu Fang	Doctor	OAI1861616	2025-01-03 15:23:42.557192
343	Madison Kwon	Secretary	\N	2025-01-03 15:23:42.557192
344	Élodie Carine Moreau	Secretary	\N	2025-01-03 15:23:42.557192
345	Isabella Rose Miller	Secretary	\N	2025-01-03 15:23:42.557192
347	Deborah Anne Richards	Secretary	\N	2025-01-03 15:23:42.557192
348	Huang Jie	Nurse	\N	2025-01-03 15:23:42.557192
349	Felipe Augusto Lima	Doctor	WYJ2481084	2025-01-03 15:23:42.557192
350	Anna Nowak	Secretary	\N	2025-01-03 15:23:42.557192
351	Jennifer Louise Foster	Doctor	UGE8652809	2025-01-03 15:23:42.557192
352	Hana Lee	Doctor	ZUC9681952	2025-01-03 15:23:42.557192
353	Artem Sorokin	Nurse	\N	2025-01-03 15:23:42.557192
354	Daniel Carter	Nurse	\N	2025-01-03 15:23:42.557192
355	Jamie Wilkinson	Doctor	ATH1784950	2025-01-04 21:07:17.652598
346	Abubakar Musa Bello	Doctor	XTT8174925	2025-01-03 15:23:42.557192
\.


--
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: todo_user
--

SELECT pg_catalog.setval('public.patients_id_seq', 426, true);


--
-- Name: resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: todo_user
--

SELECT pg_catalog.setval('public.resources_id_seq', 1, true);


--
-- Name: todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: todo_user
--

SELECT pg_catalog.setval('public.todos_id_seq', 58, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: todo_user
--

SELECT pg_catalog.setval('public.users_id_seq', 356, true);


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

