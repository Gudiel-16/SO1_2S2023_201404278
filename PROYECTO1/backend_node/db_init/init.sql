DROP DATABASE IF EXISTS db_monitoreo;
CREATE DATABASE db_monitoreo;

USE db_monitoreo;

CREATE TABLE Rendimiento (
    id INT NOT NULL AUTO_INCREMENT,
    uso_cpu INT NOT NULL,
    uso_ram INT NOT NULL,
    fecha date NOT NULL,
    PRIMARY KEY (id)
);