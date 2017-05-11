package net.folderit.repository;

import net.folderit.domain.Localidad;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by gheng on 19/4/2017.
 */

public interface LocalidadRepository extends CrudRepository<Localidad, Long> {

    Iterable<Localidad> findAllByOrderByNombreAsc();
}
