package net.folderit.repository;

import net.folderit.domain.core.TipoTurno;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TipoTurnoRepository extends CrudRepository<TipoTurno, Long> {

    List<TipoTurno> findAllByOrderByDescripcionAsc();
}
