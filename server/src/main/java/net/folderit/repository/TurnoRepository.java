package net.folderit.repository;

import net.folderit.domain.CentroSalud;
import net.folderit.domain.Especialidad;
import net.folderit.domain.Profesional;
import net.folderit.domain.Turno;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by gheng on 25/4/2017.
 */
public interface TurnoRepository extends CrudRepository<Turno, Long> {

    @Query("select t as turno "
            + "from Turno t where (to_char(t.fecha,'yyyy-mm-dd') >= ?1 and " +
            "to_char(t.fecha,'yyyy-mm-dd') <= ?1) and t.centroSalud= ?2 and" +
            " t.especialidad=?3 and t.profesional=?4 and t.enabled=true and t.tomado=false order by t.fecha DESC")
    List<Turno> finAllBy(String fecha, CentroSalud centro, Especialidad especialidad, Profesional profesional);

    @Query("select t as turno "
            + "from Turno t where (to_char(t.fecha,'yyyy-mm-dd') >= ?1 and " +
            "to_char(t.fecha,'yyyy-mm-dd') <= ?1) and t.centroSalud= ?2 " +
            " and t.enabled=true and t.tomado=false order by t.fecha DESC")
    List<Turno> finAllByFechaAndCentro(String fecha, CentroSalud centro);

    @Query("select t as turno "
            + "from Turno t where (to_char(t.fecha,'yyyy-mm-dd') >= ?1 and " +
            "to_char(t.fecha,'yyyy-mm-dd') <= ?1) and t.centroSalud= ?2 and" +
            "  t.enabled=true and t.tomado=false and t.especialidad=?3 order by t.fecha DESC")
    List<Turno> finAllByFechaAndCentroAndEspecialidad(String fecha, CentroSalud centro, Especialidad especialidad);


    @Query("select t as turno "
            + "from Turno t where (to_char(t.fecha,'yyyy-mm-dd') >= ?1 and " +
            "to_char(t.fecha,'yyyy-mm-dd') <= ?1) and t.centroSalud= ?2 and" +
            " t.profesional=?4 and t.enabled=true and t.tomado=false order by t.fecha DESC")
    List<Turno> finAllByFechaAndCentroAndProfesional(String fecha, CentroSalud centro, Profesional profesional);

    @Query("select t as turno from Turno t where t.enabled=true  order by t.fecha DESC")
    List<Turno> findAllFilter();

}
