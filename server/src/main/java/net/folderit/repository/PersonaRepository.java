package net.folderit.repository;

import net.folderit.domain.Persona;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by gheng on 18/4/2017.
 */
public interface PersonaRepository extends CrudRepository<Persona, Long> {

    Persona findByUserAsociadoEmail(String email);
}
