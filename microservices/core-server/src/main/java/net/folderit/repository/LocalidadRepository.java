package net.folderit.repository;

import net.folderit.domain.core.Localidad;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LocalidadRepository extends CrudRepository<Localidad, Long> {
    List<Localidad> findAllByOrderByNombreAsc();
}
