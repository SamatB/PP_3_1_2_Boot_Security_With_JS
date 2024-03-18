INSERT INTO users(name, surname, age, password)
VALUES ('admin', null, 23, '$2a$12$W2QcUHf.ihPARMl/x.UcvuJSlxfWp8c8fT2lHqzzQycepAM3gEZqu');

INSERT INTO roles(role_name)
values ('ADMIN'),
       ('USER');

INSERT INTO users_roles(user_id, role_id)
VALUES (1, 1);




