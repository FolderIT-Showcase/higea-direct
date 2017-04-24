package net.folderit.service;

import net.folderit.domain.Localidad;
import net.folderit.domain.Pais;
import net.folderit.domain.Persona;
import net.folderit.domain.Provincia;
import net.folderit.repository.LocalidadRepository;
import net.folderit.repository.PaisRepository;
import net.folderit.repository.PersonaRepository;
import net.folderit.repository.ProvinciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by gheng on 19/4/2017.
 */
@Service
public class MetadataService {

    private PaisRepository paisRepository;

    private ProvinciaRepository provinciaRepository;

    private LocalidadRepository localidadRepository;

    @Autowired
    public MetadataService(PaisRepository paisRepository,ProvinciaRepository provinciaRepository,LocalidadRepository localidadRepositor) {
        this.paisRepository = paisRepository;
        this.provinciaRepository = provinciaRepository;
        this.localidadRepository = localidadRepository;
    }


    public Iterable<Pais> findAllPaisOrderByNombreAsc() {return paisRepository.findAllByOrderByNombreAsc();}

    public Iterable<Provincia> findAllProvincia() {return provinciaRepository.findAll();}

    public Iterable<Localidad> findAllLocalidad() {return localidadRepository.findAll();}

}
