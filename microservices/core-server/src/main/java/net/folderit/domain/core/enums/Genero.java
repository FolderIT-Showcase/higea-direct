package net.folderit.domain.core.enums;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@JsonInclude(NON_NULL)
public enum Genero implements Serializable {
    MASCULINO, FEMENINO, OTROS
}