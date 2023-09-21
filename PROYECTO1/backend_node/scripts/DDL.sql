USE db_monitoreo;
CREATE DATABASE db_monitoreo;

CREATE TABLE rendimiento (
   id INT NOT NULL AUTO_INCREMENT,
   uso_cpu INT NOT NULL,
   uso_ram INT NOT NULL,
   fecha DATE NOT NULL,
   PRIMARY KEY (id)
)

SELECT * FROM rendimiento;