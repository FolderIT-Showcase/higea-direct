package net.folderit.repository;

import net.folderit.domain.*;
import net.folderit.dto.FilterDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

/**
 * Created by gheng on 25/4/2017.
 */
public interface TurnoRepository extends CrudRepository<Turno, Long> {

    @Query("select t as turno "
            + "from Turno t where (to_char(t.fecha,'yyyy-mm-dd') >= ?1 and " +
            "to_char(t.fecha,'yyyy-mm-dd') <= ?1) and t.centroSalud= ?2 and" +
            " t.especialidad=?3 and t.profesional=?4 order by t.fecha DESC")
       List<Turno> finAllBy(String fecha, CentroSalud centro, Especialidad especialidad, Profesional profesional);
}
