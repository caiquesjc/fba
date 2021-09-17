DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "course";
DROP TABLE IF EXISTS "class"; 


CREATE TABLE "user" (
    use_id INT GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1000 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    use_name VARCHAR(100) NOT NULL,
    use_age INT NOT NULL,
    use_email VARCHAR(50) NOT NULL UNIQUE,
    use_telephone VARCHAR(15) NOT NULL,
    use_password VARCHAR(64) NOT NULL,
    use_photo VARCHAR(255)
);

INSERT INTO "user"(
	use_name, use_age, use_email, use_telephone, use_password)
	VALUES ('Caique Miguel', 20, 'caique@email.com', '12988888888', '123456');


CREATE TABLE course(
    cou_id SERIAL PRIMARY KEY,
    cou_name VARCHAR(255) NOT NULL,
    cou_duration VARCHAR(30) NOT NULL,
    cou_description VARCHAR(500) NOT NULL,
);

INSERT INTO "course"(
	cou_name, cou_duration, cou_description)
	VALUES ('Nome Do Curso', 48, 'Descrção de um curso qualquer');

CREATE TABLE "class"(
    cla_id SERIAL PRIMARY KEY,
    cla_name VARCHAR(255) NOT NULL,
    cla_duration VARCHAR(30) NOT NULL,
    cla_description VARCHAR(500) NOT NULL,
    fk_cou_id INT NOT NULL,
    FOREIGN KEY (fk_cou_id) REFERENCES course(cou_id)
);

INSERT INTO class(
	cla_name, cla_duration, cla_description, fk_cou_id)
	VALUES ('Aula 1', '50', 'Descrição qualquer de uma aula', 1);

INSERT INTO class(
	cla_name, cla_duration, cla_description, fk_cou_id)
	VALUES ('Aula 2', '50', 'Descrição qualquer de uma aula', 1);

INSERT INTO class(
	cla_name, cla_duration, cla_description, fk_cou_id)
	VALUES ('Aula 3', '50', 'Descrição qualquer de uma aula', 1);

/*funcao valida senha*/

CREATE OR REPLACE FUNCTION check_password(fun_use_email TEXT, fun_use_pass TEXT)
RETURNS BOOLEAN AS $$
DECLARE passed BOOLEAN;
BEGIN
        SELECT (use_password = $2) INTO passed
        FROM    "user"
        WHERE   use_email = $1;

        RETURN passed;
END;
$$  LANGUAGE plpgsql;


create or replace function get_user_id_by_email(fun_use_email varchar)
returns bigint as $$
begin
	return (select use_id from "user" where use_email = fun_use_email limit 1);
end
$$ language plpgsql;


select get_user_id_by_email('caique@email.com');
select check_password('caique@email.com', '123456');