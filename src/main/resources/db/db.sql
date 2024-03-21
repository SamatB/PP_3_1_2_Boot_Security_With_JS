INSERT INTO users(name, surname, age, password, email)
VALUES ('admin', 'adminov', 23, '$2a$12$W2QcUHf.ihPARMl/x.UcvuJSlxfWp8c8fT2lHqzzQycepAM3gEZqu', 'admin@mail.ru');
INSERT INTO users(name, surname, age, password, email)
VALUES ('user', 'userov', 34, '$2a$12$r3nomAo8Dbw4gbWIW1kL9ef27wi/h39NjRuqOo.hWO2yskHxnxOB6', 'user@mail.ru');

INSERT INTO roles(role_name)
values ('ROLE_ADMIN'),
       ('ROLE_USER');

INSERT INTO users_roles(user_id, role_id)
VALUES (1, 1);
INSERT INTO users_roles(user_id, role_id)
VALUES (1, 2);
INSERT INTO users_roles(user_id, role_id)
VALUES (2, 2);




