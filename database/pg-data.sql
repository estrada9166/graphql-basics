drop table if exists users, visitedplaces;

create table users(
  id serial primary key,
  username varchar(128) not null unique,  
  email varchar(255) not null unique
);

create table visitedplaces(
  id serial primary key,  
  user_id integer references users not null,
  place varchar(45) not null
);

INSERT INTO "users" ("username","email")
VALUES
(E'demo','demo@demo.com'),
(E'demo1','demo1@demo.com'),
(E'demo2','demo2@demo.com'),
(E'demo3','demo3@demo.com');

INSERT INTO "visitedplaces" ("user_id","place")
VALUES
(1, E'NYC'),
(1, E'MIA'),
(1, E'CUN'),
(2, E'MCO'),
(2, E'SFO'),
(2, E'LAS'),
(3, E'LAX'),
(4, E'MDE');