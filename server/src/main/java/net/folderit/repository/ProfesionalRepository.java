package net.folderit.repository;

import net.folderit.domain.Profesional;
import org.bouncycastle.util.Iterable;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by gheng on 25/4/2017.
 */
public interface ProfesionalRepository extends CrudRepository<Profesional, Long> {

    Iterable<Profesional> findAllByOrderByApellidoAsc();
}
