package net.folderit.repository;

import net.folderit.domain.Persona;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by gheng on 18/4/2017.
 */
public interface PersonaRepository extends CrudRepository<Persona, Long> {

    Persona findByUserAsociadoEmail(String email);

    @Query("select p as persona "
            + "from Persona p JOIN p.turno t where t.id=?1 ")
    Persona finByTurno(Long turnoId);
}
