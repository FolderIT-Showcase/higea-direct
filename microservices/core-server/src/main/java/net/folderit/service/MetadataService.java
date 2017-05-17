package net.folderit.service;

import net.folderit.domain.*;
import net.folderit.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetadataService {

    private PaisRepository paisRepository;

    private ProvinciaRepository provinciaRepository;

    private LocalidadRepository localidadRepository;

    private CentroSaludRepository centroSaludRepository;

    private EspecialidadRepository especialidadRepository;

    private ProfesionalRepository profesionalRepository;

    @Autowired
    public MetadataService(PaisRepository paisRepository,
                           ProvinciaRepository provinciaRepository,
                           LocalidadRepository localidadRepository,
                           CentroSaludRepository centroSaludRepository,
                           EspecialidadRepository especialidadRepository,
                           ProfesionalRepository profesionalRepository
    ) {
        this.paisRepository = paisRepository;
        this.provinciaRepository = provinciaRepository;
        this.localidadRepository = localidadRepository;
        this.centroSaludRepository = centroSaludRepository;
        this.especialidadRepository = especialidadRepository;
        this.profesionalRepository = profesionalRepository;
    }


    public Iterable<Pais> findAllPais() {
        return paisRepository.findAllByOrderByNombreAsc();
    }

    public Iterable<Provincia> findAllProvincia() {
        return provinciaRepository.findAllByOrderByNombreAsc();
    }

    public Iterable<Localidad> findAllLocalidad() {
        return localidadRepository.findAllByOrderByNombreAsc();
    }

    public List<CentroSalud> findAllCentroSalud() {
        return centroSaludRepository.findAllByOrderByNombreAsc();
    }

    public List<Especialidad> findAllEspecialidad() {
        return especialidadRepository.findAllByOrderByNombreAsc();
    }

    public Especialidad saveEspecialidad(Especialidad especialidad) {
        return especialidadRepository.save(especialidad);
    }

    public List<Profesional> findAllProfesional() {
        return profesionalRepository.findAllByOrderByApellidoAsc();
    }

    public CentroSalud saveCentroSalud(CentroSalud centroSalud) {
        return centroSaludRepository.save(centroSalud);
    }

    public Profesional saveProfesional(Profesional profesional) {
        return profesionalRepository.save(profesional);
    }

    public void deleteProfesional(Long id) {
        profesionalRepository.delete(id);
    }

    public void deleteCentroSalud(Long id) {
        centroSaludRepository.delete(id);
    }

    public void deleteEspecialidad(Long id) {
        especialidadRepository.delete(id);
    }

}