package net.folderit.repository;

import net.folderit.domain.CentroSalud;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CentroSaludRepository extends CrudRepository<CentroSalud, Long> {
    List<CentroSalud> findAllByOrderByNombreAsc();
}
