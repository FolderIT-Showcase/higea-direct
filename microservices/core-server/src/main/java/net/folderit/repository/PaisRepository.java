package net.folderit.repository;

import net.folderit.domain.core.Pais;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PaisRepository extends CrudRepository<Pais, Long> {
    List<Pais> findAllByOrderByNombreAsc();
}
