package net.folderit.repository;

import net.folderit.domain.Profesional;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by gheng on 25/4/2017.
 */
public interface ProfesionalRepository extends CrudRepository<Profesional, Long> {

    List<Profesional> findAllByOrderByApellidoAsc();
}
