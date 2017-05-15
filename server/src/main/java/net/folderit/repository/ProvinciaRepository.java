package net.folderit.repository;

import net.folderit.domain.Provincia;
import org.springframework.data.repository.CrudRepository;

public interface ProvinciaRepository extends CrudRepository<Provincia, Long> {
    Iterable<Provincia> findAllByOrderByNombreAsc();
}
