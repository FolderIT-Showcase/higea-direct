package net.folderit.repository;

import net.folderit.domain.CentroSalud;
import org.springframework.data.repository.CrudRepository;

<<<<<<< HEAD
import java.util.ArrayList;
=======
import java.util.List;
>>>>>>> 4f5eac3e857820e1193a6d72a808e96a58ee053c

/**
 * Created by gheng on 25/4/2017.
 */
public interface CentroSaludRepository extends CrudRepository<CentroSalud, Long> {

    List<CentroSalud> findAllByOrderByNombreAsc();

}
