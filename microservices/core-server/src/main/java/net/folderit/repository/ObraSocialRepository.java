package net.folderit.repository;

import net.folderit.domain.core.ObraSocial;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ObraSocialRepository extends CrudRepository<ObraSocial, Long> {

    List<ObraSocial> findAllByOrderByNombreAsc();
}
