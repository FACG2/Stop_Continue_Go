BEGIN ;
DROP TABLE IF EXISTS users, scg CASCADE ;

CREATE TABLE users(
id SERIAL PRIMARY KEY NOT NULL ,
name VARCHAR(100) NOT NULL

);


CREATE TABLE  scg (
id SERIAL PRIMARY KEY NOT NULL ,
content text Not Null,
type VARCHAR(30) Not NUll,
sessionDate Date NOT NULL,
points integer ,
user_id SERIAL REFERENCES users(id)
         ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO users (name) VALUES ('Hana Jebril'),
('Mahmoud Alwadia'),
('Qamar Alfalojy'),
('Ahmed Ajour'),
('Eslam Hugair'),
('Ghadeer Abdel-Nabi'),
('Mahmoud Aldahdouh'),
('Abdallah Halees'),
('Moath Alnajjar'),
('Mahmoud Almadhoun'),
('Samer El-Aila'),
('Aia AbuLaila'),
('Sohad Dader'),
('kefah elhelou'),
('Salwa Alnazly'),
('Walid Almeshwakhi');

INSERT INTO scg (content,type,sessionDate,points,user_id) VALUES ('Morning Challenge','continue','2017-08-03',10,4),
('Travel','go','2017-08-17',16,6),
('Change Group','stop','2017-08-17',8,16),
('More Project','go','2017-08-17',10,5);



COMMIT;
