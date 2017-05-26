package net.folderit.repository;

import net.folderit.domain.CentroSalud;
import net.folderit.domain.Especialidad;
import net.folderit.domain.Profesional;
import net.folderit.domain.Turno;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface TurnoRepository extends CrudRepository<Turno, Long> {

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
