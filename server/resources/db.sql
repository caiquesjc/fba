DROP SCHEMA IF EXISTS PUBLIC CASCADE;


CREATE SCHEMA IF NOT EXISTS PUBLIC;


CREATE TABLE "user" (use_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY
                       (INCREMENT 1 START 1000 MINVALUE 1 MAXVALUE 2147483647 CACHE 1), use_name VARCHAR(100) NOT NULL,
                                                                                                              use_age INT NOT NULL,
                                                                                                                          use_email VARCHAR(50) NOT NULL UNIQUE,
                                                                                                                                                         use_telephone VARCHAR(15) NOT NULL,
                                                                                                                                                                                   use_password VARCHAR(64) NOT NULL,
                                                                                                                                                                                                            use_photo VARCHAR(255),
                                                                                                                                                                                                                      use_nickname VARCHAR(255) UNIQUE);


INSERT INTO "user"(use_name,
                   use_age,
                   use_email,
                   use_telephone,
                   use_password,
                   use_nickname)
VALUES ('Caique Silverio', 20, 'caique@email.com', '12988888888', 'caique', 'caiquesjc');


CREATE TABLE course(cou_id SERIAL PRIMARY KEY,
                                          cou_name VARCHAR(255) NOT NULL,
                                                                cou_duration VARCHAR(30) NOT NULL,
                                                                                         cou_description VARCHAR NOT NULL,
                                                                                                                 cou_video VARCHAR(250) NOT NULL,
                                                                                                                                        cou_level VARCHAR(50) NOT NULL);


INSERT INTO "course"(cou_name,
                     cou_duration,
                     cou_description,
                     cou_video,
                     cou_level)
VALUES ('Nome Do Curso', 48, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut iaculis dui, vel hendrerit nulla. Phasellus tortor felis, maximus dapibus placerat eu, pulvinar non magna. Vestibulum et neque ut felis interdum consectetur. Maecenas sagittis, magna id volutpat vulputate, nisi enim lobortis sapien, sit amet porttitor tortor velit sit amet urna. Nam auctor lacus ut molestie tempor. Mauris lacinia semper justo. Proin hendrerit eleifend ligula, aliquet euismod odio hendrerit in. Proin placerat convallis erat, non auctor elit.

Nulla lacinia libero sit amet diam ullamcorper eleifend. In tincidunt neque a lorem vestibulum aliquet. Sed purus leo, bibendum imperdiet orci eget, malesuada pretium mauris. Aliquam feugiat risus magna, vel volutpat risus bibendum et. Etiam rutrum gravida posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet eleifend risus. Ut eget leo tortor. Nunc a neque eget ante molestie condimentum.

Sed fringilla maximus dapibus. Nam vulputate tempus justo ac eleifend. Sed quis velit pellentesque, aliquet enim in, lobortis tellus. Suspendisse tempor vehicula ligula sed tempor. Morbi et eros tincidunt, rhoncus mi quis, euismod nisl. Quisque consectetur, elit ut mattis elementum, lacus dolor scelerisque leo, nec ultrices odio urna sed leo. Morbi lorem mauris, semper a arcu sit amet, luctus feugiat turpis. Morbi ut ultricies sapien, eu tincidunt dolor. Praesent bibendum quis lectus non interdum. Nunc eget finibus mi. Pellentesque sed leo id sem interdum condimentum quis ac sem. Nunc mollis, est vel commodo fringilla, nibh turpis fermentum nisi, sed sollicitudin libero orci sed enim.

In eget mi sed massa tempor hendrerit ut a velit. Sed convallis, erat nec ullamcorper aliquet, ligula justo accumsan erat, nec condimentum nunc diam id nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sapien dolor, maximus eu accumsan a, tristique a mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In accumsan ante a tristique tempus. Nulla rutrum eros in sagittis fermentum. Fusce ac sagittis neque, nec aliquet nulla. Quisque consequat quam erat, venenatis ultrices massa maximus quis. Integer sit amet luctus urna, sit amet suscipit tortor. Nunc dolor purus, tincidunt vitae leo vitae, elementum aliquet mi. Cras at purus nec purus sodales pulvinar.

Fusce ullamcorper arcu nec odio hendrerit viverra. Phasellus tellus odio, convallis tempus neque et, bibendum commodo turpis. In diam mi, interdum eget nulla id, tempus commodo ante. Ut et eros arcu. Suspendisse vel dictum libero. Nulla luctus arcu est, non interdum ante porta sed. Cras ac mollis libero, vel dapibus arcu. Praesent accumsan enim vel turpis tincidunt scelerisque. Proin venenatis efficitur sapien, at pellentesque erat efficitur quis. Aenean consequat volutpat nibh, ac rhoncus erat hendrerit nec. Sed a erat nec sapien mollis volutpat a eu urna. Integer eu nunc tincidunt, mollis nisi in, rhoncus orci. Nulla facilisi. Cras varius, turpis ac tempus varius, diam tortor convallis magna, ac aliquam dolor elit quis odio. Etiam semper semper mollis.', 'wY4xqCjVZ-M', 'Básico');


CREATE TABLE "class"
  (cla_id SERIAL PRIMARY KEY,
                         cla_name VARCHAR(255) NOT NULL,
                                               cla_duration VARCHAR(30) NOT NULL,
                                                                        cla_description VARCHAR NOT NULL,
                                                                                                cla_video VARCHAR(250) NOT NULL,
                                                                                                                       fk_cou_id INT NOT NULL,
   FOREIGN KEY (fk_cou_id) REFERENCES course(cou_id) ON DELETE CASCADE);


CREATE TABLE "finished_class"
  (fk_cou_id INT NOT NULL,
   FOREIGN KEY (fk_cou_id) REFERENCES course(cou_id) ON DELETE CASCADE,

                                                               fk_cla_id INT NOT NULL,
   FOREIGN KEY (fk_cla_id) REFERENCES "class"(cla_id) ON DELETE CASCADE,
   
                                                                fk_use_id INT NOT NULL,
   FOREIGN KEY (fk_use_id) REFERENCES "user"(use_id) ON DELETE CASCADE);


INSERT INTO class(cla_name, cla_duration, cla_description, cla_video, fk_cou_id)
VALUES ('Aula 1', '50', 'Descrição qualquer de uma aula', 'wY4xqCjVZ-M',1);


INSERT INTO class(cla_name, cla_duration, cla_description, cla_video, fk_cou_id)
VALUES ('Aula 2', '50', 'Descrição qualquer de uma aula', 'wY4xqCjVZ-M',1);


INSERT INTO class(cla_name, cla_duration, cla_description, cla_video, fk_cou_id)
VALUES ('Aula 3', '50', 'Descrição qualquer de uma aula', 'wY4xqCjVZ-M',1);

/*funcao valida senha*/
CREATE OR REPLACE FUNCTION check_password(fun_use_email_or_nick TEXT, fun_use_pass TEXT) RETURNS BOOLEAN AS $$
DECLARE passed BOOLEAN;
BEGIN
        SELECT (use_password = $2) INTO passed
        FROM    "user"
        WHERE   use_email = $1 OR use_nickname = $1;

        RETURN passed;
END;
$$ LANGUAGE PLPGSQL;


CREATE OR REPLACE FUNCTION get_user_id_by_email(fun_use_email_or_nick varchar) RETURNS bigint AS $$
begin
	return (select use_id from "user" where use_email = fun_use_email_or_nick or use_nickname = fun_use_email_or_nick limit 1);
end
$$ LANGUAGE PLPGSQL;


SELECT get_user_id_by_email('caique@email.com');


SELECT check_password('caique@email.com', '123456');