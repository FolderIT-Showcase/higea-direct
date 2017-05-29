package net.folderit.repository;

import net.folderit.domain.ObraSocial;
import net.folderit.domain.TipoTurno;
import net.folderit.domain.Turno;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by luis on 29/05/17.
 */
public interface TipoTurnoRepository extends CrudRepository<TipoTurno, Long> {

    List<TipoTurno> findAllByOrderByDescripcionAsc();
}
