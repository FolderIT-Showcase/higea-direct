package net.folderit.repository;

import net.folderit.domain.core.MotivoTurno;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MotivoTurnoRepository extends CrudRepository<MotivoTurno, Long> {
    List<MotivoTurno> findAllByOrderByDescripcionAsc();
}