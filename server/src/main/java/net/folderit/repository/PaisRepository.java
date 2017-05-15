package net.folderit.repository;

import net.folderit.domain.Pais;
import org.springframework.data.repository.CrudRepository;

public interface PaisRepository extends CrudRepository<Pais, Long> {
    Iterable<Pais> findAllByOrderByNombreAsc();
}
