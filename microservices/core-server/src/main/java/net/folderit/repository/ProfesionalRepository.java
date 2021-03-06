package net.folderit.repository;

import net.folderit.domain.core.Profesional;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProfesionalRepository extends CrudRepository<Profesional, Long> {
    List<Profesional> findAllByOrderByApellidoAsc();
}
