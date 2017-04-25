package net.folderit.repository;

import net.folderit.domain.CentroSalud;
import net.folderit.domain.Localidad;
import org.bouncycastle.util.Iterable;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by gheng on 25/4/2017.
 */
public interface CentroSaludRepository extends CrudRepository<CentroSalud, Long> {

    Iterable<CentroSalud> findAllByOrderByNombreAsc();
}
