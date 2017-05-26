package net.folderit.repository;

import net.folderit.domain.CentroSalud;
import net.folderit.domain.Especialidad;
import net.folderit.domain.Profesional;
import net.folderit.domain.Turno;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface TurnoRepository extends CrudRepository<Turno, Long> {
/*
    @Query("select t as turno "
            + "from Turno t where (to_char(t.fecha,'yyyy-mm-dd') >= ?1 and " +
            "to_char(t.fecha,'yyyy-mm-dd') <= ?1) and t.centroSalud= ?2 and" +
            " t.especialidad=?3 and t.profesional=?4 and t.enabled=true and t.tomado=false order by t.fecha DESC")
    List<Turno> findAllBy(String fecha, CentroSalud centro, Especialidad especialidad, Profesional profesional);

    @Query("select t as turno "
            + "from Turno t where (to_char(t.fecha,'yyyy-mm-dd') >= ?1 and " +
            "to_char(t.fecha,'yyyy-mm-dd') <= ?1) and t.centroSalud= ?2 " +
            " and t.enabled=true and t.tomado=false order by t.fecha DESC")
    List<Turno> findAllByFechaAndCentro(String fecha, CentroSalud centro);

    @Query("select t as turno "
            + "from Turno t where (to_char(t.fecha,'yyyy-mm-dd') >= ?1 and " +
            "to_char(t.fecha,'yyyy-mm-dd') <= ?1) and t.centroSalud= ?2 and" +
            "  t.enabled=true and t.tomado=false and t.especialidad=?3 order by t.fecha DESC")
    List<Turno> findAllByFechaAndCentroAndEspecialidad(String fecha, CentroSalud centro, Especialidad especialidad);

    @Query("select t as turno "
            + "from Turno t where (to_char(t.fecha,'yyyy-mm-dd') >= ?1 and " +
            "to_char(t.fecha,'yyyy-mm-dd') <= ?1) and t.centroSalud= ?2 and" +
            " t.profesional=?3 and t.enabled=true and t.tomado=false order by t.fecha DESC")
    List<Turno> findAllByFechaAndCentroAndProfesional(String fecha, CentroSalud centro, Profesional profesional);

    @Query("select t as turno from Turno t where t.enabled=true  order by t.fecha DESC")
    List<Turno> findAllFilter();
*/

    List<Turno> findAllByEnabledIsTrueOrderByFechaDesc();

    List<Turno> findAllByFechaAndCentroSaludAndEspecialidadAndProfesionalOrderByFechaDesc(Date date, CentroSalud centroSalud, Especialidad especialidad, Profesional profesional);

    List<Turno> findAllByFechaAndCentroSaludOrderByFechaDesc(Date date, CentroSalud centroSalud);

    List<Turno> findAllByFechaAndCentroSaludAndEspecialidadOrderByFechaDesc(Date date, CentroSalud centroSalud, Especialidad especialidad);

    List<Turno> findAllByFechaAndCentroSaludAndProfesionalOrderByFechaDesc(Date date, CentroSalud centroSalud, Profesional profesional);
    // find Next Turnos

    List<Turno> findTop10ByFechaAfterAndCentroSalud(Date date, CentroSalud centroSalud);

    List<Turno> findTop10ByFechaAfterAndCentroSaludAndEspecialidad(Date date, CentroSalud centroSalud, Especialidad especialidad);

    List<Turno> findTop10ByFechaAfterAndCentroSaludAndProfesional(Date date, CentroSalud centroSalud, Profesional profesional);

    List<Turno> findTop10ByFechaAfterAndCentroSaludAndEspecialidadAndProfesional(Date date, CentroSalud centroSalud, Especialidad especialidad, Profesional profesional);

}
