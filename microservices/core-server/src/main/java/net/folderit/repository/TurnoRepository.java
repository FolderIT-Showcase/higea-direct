package net.folderit.repository;

import net.folderit.domain.CentroSalud;
import net.folderit.domain.Especialidad;
import net.folderit.domain.Profesional;
import net.folderit.domain.Turno;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface TurnoRepository extends CrudRepository<Turno, Long> {

    // todos los turnos

    List<Turno> findAllByEnabledIsTrueOrderByFechaDesc();

    // por fecha especifica

    List<Turno> findAllByEnabledIsTrueAndTomadoIsFalseAndFechaAndCentroSaludAndEspecialidadAndProfesionalOrderByFechaDesc(Date date, CentroSalud centroSalud, Especialidad especialidad, Profesional profesional);

    List<Turno> findAllByEnabledIsTrueAndTomadoIsFalseAndFechaAndCentroSaludOrderByFechaDesc(Date date, CentroSalud centroSalud);

    List<Turno> findAllByEnabledIsTrueAndTomadoIsFalseAndFechaAndCentroSaludAndEspecialidadOrderByFechaDesc(Date date, CentroSalud centroSalud, Especialidad especialidad);

    List<Turno> findAllByEnabledIsTrueAndTomadoIsFalseAndFechaAndCentroSaludAndProfesionalOrderByFechaDesc(Date date, CentroSalud centroSalud, Profesional profesional);

    // Proximos Turnos

    List<Turno> findTop10ByEnabledIsTrueAndTomadoIsFalseAndFechaAfterAndCentroSalud(Date date, CentroSalud centroSalud);

    List<Turno> findTop10ByEnabledIsTrueAndTomadoIsFalseAndFechaAfterAndCentroSaludAndEspecialidad(Date date, CentroSalud centroSalud, Especialidad especialidad);

    List<Turno> findTop10ByEnabledIsTrueAndTomadoIsFalseAndFechaAfterAndCentroSaludAndProfesional(Date date, CentroSalud centroSalud, Profesional profesional);

    List<Turno> findTop10ByEnabledIsTrueAndTomadoIsFalseAndFechaAfterAndCentroSaludAndEspecialidadAndProfesional(Date date, CentroSalud centroSalud, Especialidad especialidad, Profesional profesional);

}
