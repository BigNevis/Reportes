-- public.components definition

-- Drop table

-- DROP TABLE public.components;

CREATE TABLE public.components (
	component_id serial4 NOT NULL,
	component_name varchar(100) NULL,
	clave varchar(50) NULL,
	CONSTRAINT components_pkey PRIMARY KEY (component_id)
);


-- public.epics definition

-- Drop table

-- DROP TABLE public.epics;

CREATE TABLE public.epics (
	id varchar(255) NOT NULL,
	clave varchar(255) NOT NULL,
	"Current Assignee: Name" varchar(255) NULL,
	resumen text NULL,
	"Project Name" varchar(255) NULL,
	"Oracle Form" varchar(255) NULL,
	"Fecha Estiada Discovery" varchar(255) NULL,
	"Fecha fin discovery" varchar(255) NULL,
	"Fecha Inicio Estimada" varchar(255) NULL,
	"Fecha de inicio" varchar(255) NULL,
	"Fecha Estiada en DEV" varchar(255) NULL,
	"Fecha imp. En Dev" varchar(255) NULL,
	"Fecha Estimada en TEST" varchar(255) NULL,
	"Fecha imp. En TEST" varchar(255) NULL,
	"Fecha Estimada en UAT" varchar(255) NULL,
	"Fecha UAT" varchar(255) NULL,
	"Fecha Estimada en PROD" varchar(255) NULL,
	"Fecha PROD" varchar(255) NULL,
	estado varchar(255) NULL,
	motivo text NULL,
	bloqueado_por text NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT epics_clave_key UNIQUE (clave),
	CONSTRAINT epics_pkey PRIMARY KEY (id)
);

-- Table Triggers

create trigger update_epics_modtime before
update
    on
    public.epics for each row execute function update_modified_column();


-- public.etiquetas definition

-- Drop table

-- DROP TABLE public.etiquetas;

CREATE TABLE public.etiquetas (
	etiqueta_id serial4 NOT NULL,
	etiqueta_name varchar(100) NULL,
	clave varchar(50) NULL,
	CONSTRAINT etiquetas_pkey PRIMARY KEY (etiqueta_id)
);


-- public.history definition

-- Drop table

-- DROP TABLE public.history;

CREATE TABLE public.history (
	history_id serial4 NOT NULL,
	clave varchar(50) NULL,
	assignee_id varchar(50) NULL,
	assignee_start timestamp NULL,
	assignee_end timestamp NULL,
	assignee_sequence int4 NULL,
	time_with_assignee_days float8 NULL,
	time_with_assignee_business_days float8 NULL,
	time_with_assignee_hours float8 NULL,
	time_with_assignee_business_hours float8 NULL,
	is_current_assignee bool NULL,
	CONSTRAINT history_pkey PRIMARY KEY (history_id)
);


-- public.issues definition

-- Drop table

-- DROP TABLE public.issues;

CREATE TABLE public.issues (
	clave varchar(50) NOT NULL,
	"Parent Issue Summary" text NULL,
	"Start date" date NULL,
	"Current Sprint Id" varchar(50) NULL,
	"Prioridad (1)" text NULL,
	"Current Assignee:  Name" text NULL,
	"End date" date NULL,
	ambiente text NULL,
	"Epic Status" text NULL,
	"Epic Link" text NULL,
	taskpoint numeric(10, 2) NULL,
	"Current Sprint Start Date" timestamp NULL,
	"Tiempo Trabajado" numeric(10, 2) NULL,
	"Fecha pasaje a PROD" date NULL,
	prioridad text NULL,
	"Informador:  Name" text NULL,
	"Estimación de puntos de historia" numeric NULL,
	"Parent Link" text NULL,
	"Ambiente Detectado" text NULL,
	"Project Key" text NULL,
	"Fecha pasaje RFC/PRY" date NULL,
	"Fecha de Inicio" date NULL,
	"Current Sprint Id (Number)" int4 NULL,
	"Time Spent (Incl_ Sub-tasks)" numeric(10, 2) NULL,
	responsable text NULL,
	"Issue ID" int4 NULL,
	resumen text NULL,
	criticidad text NULL,
	"Remaining Estimate (Incl_ Sub-tasks)" numeric(10, 2) NULL,
	"Story Points Completed" numeric NULL,
	"Trabajo restante estimado" numeric(10, 2) NULL,
	"Criticidad (1)" text NULL,
	"Parent Issue Key" text NULL,
	"Project Name" text NULL,
	"Story Points Remaining" numeric NULL,
	consultora text NULL,
	"Current Sprint End Date" timestamp NULL,
	"Parent Issue Status" text NULL,
	"StoryPoint Finales" numeric NULL,
	"Current Sprint Name" text NULL,
	"Tipo de Incidencia" text NULL,
	bugpoint numeric NULL,
	"Original Estimate (Incl_ Sub-tasks)" numeric(10, 2) NULL,
	"Esfuerzo Estimado en Horas" numeric(10, 2) NULL,
	"Estimación original" numeric(10, 2) NULL,
	"Epic Name" text NULL,
	"Current Status" text NULL,
	"Story Points" numeric NULL,
	CONSTRAINT issues_pkey PRIMARY KEY (clave)
);


-- public.linked_issues definition

-- Drop table

-- DROP TABLE public.linked_issues;

CREATE TABLE public.linked_issues (
	linked_issue_id serial4 NOT NULL,
	source_issue varchar(50) NULL,
	linked_issue varchar(50) NULL,
	link_type varchar(50) NULL,
	CONSTRAINT linked_issues_pkey PRIMARY KEY (linked_issue_id)
);


-- public.raw_data_json definition

-- Drop table

-- DROP TABLE public.raw_data_json;

CREATE TABLE public.raw_data_json (
	id serial4 NOT NULL,
	entity_name varchar(50) NOT NULL,
	data_date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	json_data jsonb NOT NULL,
	CONSTRAINT raw_data_json_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_raw_data_json_data_date ON public.raw_data_json USING btree (data_date);
CREATE INDEX idx_raw_data_json_entity_name ON public.raw_data_json USING btree (entity_name);

-- public.sprints definition

-- Drop table

-- DROP TABLE public.sprints;

CREATE TABLE public.sprints (
	sprint_id varchar(50) NOT NULL,
	sprint_name varchar(100) NULL,
	sprint_start_date date NULL,
	sprint_end_date date NULL,
	CONSTRAINT sprints_pkey PRIMARY KEY (sprint_id)
);


-- public.worklogs definition

-- Drop table

-- DROP TABLE public.worklogs;

CREATE TABLE public.worklogs (
	worklog_id varchar(50) NOT NULL,
	clave varchar(50) NULL,
	time_entry_user_id varchar(50) NULL,
	time_entry_date timestamp NULL,
	time_spent float8 NULL,
	CONSTRAINT worklogs_pkey PRIMARY KEY (worklog_id)
);