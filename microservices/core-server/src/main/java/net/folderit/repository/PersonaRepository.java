package net.folderit.repository;

import net.folderit.domain.Persona;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PersonaRepository extends CrudRepository<Persona, Long> {

    Persona findByUserAsociadoEmail(String email);

    @Query("select p as persona " + "from Persona p JOIN p.turno t where t.id=?1 ")
    Persona findByTurno(Long turnoId);
}
