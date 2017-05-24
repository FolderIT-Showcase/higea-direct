package net.folderit.repository;

import net.folderit.domain.ObraSocial;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by luis on 24/05/17.
 */
public interface ObraSocialRepository extends CrudRepository<ObraSocial, Long> {

    List<ObraSocial> findAllByOrderByNombreAsc();
}
