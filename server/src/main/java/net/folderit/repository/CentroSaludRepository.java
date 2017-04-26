package net.folderit.repository;

import net.folderit.domain.CentroSalud;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by gheng on 25/4/2017.
 */
public interface CentroSaludRepository extends CrudRepository<CentroSalud, Long> {

    List<CentroSalud> findAllByOrderByNombreAsc();

}
