package net.folderit.repository;

import net.folderit.domain.Localidad;
import org.springframework.data.repository.CrudRepository;

public interface LocalidadRepository extends CrudRepository<Localidad, Long> {
    Iterable<Localidad> findAllByOrderByNombreAsc();
}