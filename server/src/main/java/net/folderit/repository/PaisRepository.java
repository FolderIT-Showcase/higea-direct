package net.folderit.repository;

import net.folderit.domain.Pais;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by gheng on 19/4/2017.
 */
public interface PaisRepository extends CrudRepository<Pais, Long> {

    Iterable<Pais> findAllByOrderByNombreAsc();
}
