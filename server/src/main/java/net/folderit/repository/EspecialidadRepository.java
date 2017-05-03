package net.folderit.repository;

import net.folderit.domain.CentroSalud;
import net.folderit.domain.Especialidad;
import org.bouncycastle.util.Iterable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by gheng on 25/4/2017.
 */
public interface EspecialidadRepository extends CrudRepository<Especialidad, Long> {

    List<Especialidad> findAllByOrderByNombreAsc();
}
