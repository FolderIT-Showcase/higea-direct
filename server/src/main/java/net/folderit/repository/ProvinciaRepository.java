package net.folderit.repository;

import net.folderit.domain.Provincia;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by gheng on 19/4/2017.
 */
public interface ProvinciaRepository extends CrudRepository<Provincia, Long> {

    Iterable<Provincia> findAllByOrderByNombreAsc();
}
