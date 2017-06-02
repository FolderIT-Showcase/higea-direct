package net.folderit.repository;

import net.folderit.domain.core.CentroSalud;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CentroSaludRepository extends CrudRepository<CentroSalud, Long> {
    List<CentroSalud> findAllByOrderByNombreAsc();
}
