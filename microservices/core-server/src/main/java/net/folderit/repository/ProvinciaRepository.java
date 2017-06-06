package net.folderit.repository;

import net.folderit.domain.core.Provincia;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProvinciaRepository extends CrudRepository<Provincia, Long> {
    List<Provincia> findAllByOrderByNombreAsc();
}
