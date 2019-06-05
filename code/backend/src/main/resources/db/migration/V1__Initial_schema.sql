create schema if not exists project;

set search_path to project;

create type user_role as enum ('STUDENT', 'TEACHER', 'ADMIN');
create type review_status as enum('PENDING', 'APPROVED', 'REJECTED');

create table if not exists users
(
    id         bigserial primary key,
    role       user_role not null,
    username   varchar   not null unique,
    first_name varchar   not null,
    last_name  varchar   not null,
    password   varchar   not null
);

create table if not exists admin
(
    id bigint not null references users (id)
        on update cascade
        on delete cascade,
    primary key (id)
);

create table if not exists student_group
(
    id   bigserial primary key,
    name varchar not null unique
);

create table if not exists student
(
    id       bigint references users (id)
        on update cascade
        on delete cascade,
    group_id bigint not null
        references student_group (id)
            on update cascade
            on delete restrict,
    primary key (id)
);

create table if not exists teacher
(
    id bigint
        references users (id)
            on update cascade
            on delete cascade,
    primary key (id)
);

create table if not exists organizer
(
    id   bigint primary key,
    name varchar not null unique
);

create table if not exists category
(
    id   bigserial primary key,
    name varchar not null unique
);

create table if not exists activity
(
    id           bigserial primary key,
    name         varchar not null unique,
    organizer_id bigint  not null references organizer (id)
        on update cascade
        on delete cascade,
    category_id  bigint  not null references category (id)
        on update cascade
        on delete restrict
);

create table if not exists subject
(
    id   bigserial primary key,
    name varchar not null unique
);

create table if not exists subject_teacher
(
    subject_id bigint not null references subject (id)
        on update cascade
        on delete cascade,
    teacher_id bigint not null references teacher (id)
        on update cascade
        on delete cascade,
    primary key (subject_id, teacher_id)
);

create table if not exists activity_subject
(
    activity_id bigint not null references activity (id)
        on update cascade
        on delete cascade,
    subject_id  bigint not null references subject (id)
        on update cascade
        on delete cascade,
    primary key (activity_id, subject_id)
);

create table if not exists round
(
    id   bigserial primary key,
    name varchar not null unique
);

create table if not exists activity_event
(
    id          bigserial primary key,
    activity_id bigint    not null
        references activity (id)
            on update cascade
            on delete cascade,
    round_id    bigint    not null
        references round (id)
            on update cascade
            on delete cascade,
    date        timestamp not null,
    location    varchar   not null
);

create table if not exists result
(
    id   bigserial primary key,
    name varchar unique not null
);

create table if not exists participation
(
    activity_event_id    bigint
        references activity_event (id)
            on update cascade
            on delete restrict,
    student_id           bigint
        references student (id)
            on update cascade
            on delete restrict,
    preparing_teacher_id bigint
        references teacher (id)
            on update cascade
            on delete restrict,
    result_id            bigint
        references result (id)
            on update cascade
            on delete restrict,
    status review_status default 'PENDING',
    primary key (activity_event_id, student_id)
);