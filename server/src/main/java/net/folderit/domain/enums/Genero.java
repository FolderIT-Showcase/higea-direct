package net.folderit.domain.enums;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

/**
 * Created by gheng on 19/4/2017.
 */
@JsonInclude(NON_NULL)
public enum Genero implements Serializable {
    MASCULINO, FEMENINO, OTROS
}