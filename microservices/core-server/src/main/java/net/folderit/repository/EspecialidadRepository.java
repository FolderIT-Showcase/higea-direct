package net.folderit.repository;

import net.folderit.domain.core.Especialidad;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EspecialidadRepository extends CrudRepository<Especialidad, Long> {
    List<Especialidad> findAllByOrderByNombreAsc();
}
