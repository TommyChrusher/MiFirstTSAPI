create database proyectoPincel;

create table  tiposEstilosTecnicas (
id SERIAL primary KEY,
tipoDato VARCHAR(50) not null check (tipoDato in ('Tipo de Obra','Estilo','Tecnicas')),
nombreDato varchar(255) not null,
descripcionDato TEXT
)

CREATE TABLE artistas (
    id SERIAL PRIMARY KEY,
    nombreArtista VARCHAR(255) NOT NULL,
    nacimiento DATE,
    fallecimiento DATE,
    causa VARCHAR(255),
    nacionalidad VARCHAR(255),
    fotografia TEXT,
    educacion TEXT,
    area INTEGER, 
    cargosOcupados TEXT,
    movimiento INTEGER, 
    distinciones TEXT,
    firma TEXT,
    link VARCHAR(2048),

    -- Definición de claves foráneas con nombres explícitos
    CONSTRAINT fk_area FOREIGN KEY (area) 
        REFERENCES tiposEstilosTecnicas(id) 
        ON DELETE CASCADE,
    
    CONSTRAINT fk_movimiento FOREIGN KEY (movimiento) 
        REFERENCES tiposEstilosTecnicas(id) 
        ON DELETE CASCADE
);