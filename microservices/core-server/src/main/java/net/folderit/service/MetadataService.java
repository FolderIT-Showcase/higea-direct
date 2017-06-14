package net.folderit.service;

import net.folderit.domain.core.*;
import net.folderit.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetadataService {

    private final PaisRepository paisRepository;
    private final ProvinciaRepository provinciaRepository;
    private final LocalidadRepository localidadRepository;
    private final CentroSaludRepository centroSaludRepository;
    private final EspecialidadRepository especialidadRepository;
    private final ProfesionalRepository profesionalRepository;
    private final ObraSocialRepository obraSocialRepository;
    private final TipoTurnoRepository tipoTurnoRepository;
    private final MotivoTurnoRepository motivoTurnoRepository;

    @Autowired
    public MetadataService(PaisRepository paisRepository,
                           ProvinciaRepository provinciaRepository,
                           LocalidadRepository localidadRepository,
                           CentroSaludRepository centroSaludRepository,
                           EspecialidadRepository especialidadRepository,
                           ProfesionalRepository profesionalRepository,
                           ObraSocialRepository obraSocialRepository,
                           TipoTurnoRepository tipoTurnoRepository,
                           MotivoTurnoRepository motivoTurnoRepository) {
        this.paisRepository = paisRepository;
        this.provinciaRepository = provinciaRepository;
        this.localidadRepository = localidadRepository;
        this.centroSaludRepository = centroSaludRepository;
        this.especialidadRepository = especialidadRepository;
        this.profesionalRepository = profesionalRepository;
        this.obraSocialRepository = obraSocialRepository;
        this.tipoTurnoRepository = tipoTurnoRepository;
        this.motivoTurnoRepository = motivoTurnoRepository;
    }


    public List<Pais> findAllPais() {
        return paisRepository.findAllByOrderByNombreAsc();
    }

    public List<Provincia> findAllProvincia() {
        return provinciaRepository.findAllByOrderByNombreAsc();
    }

    public List<Localidad> findAllLocalidad() {
        return localidadRepository.findAllByOrderByNombreAsc();
    }

    public List<MotivoTurno> findAllMotivosTurno() {
        return motivoTurnoRepository.findAllByOrderByDescripcionAsc();
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

    public List<ObraSocial> getAllObrasSociales() {
        return obraSocialRepository.findAllByOrderByNombreAsc();
    }

    public List<Especialidad> getAllEspecialidades() {
        return especialidadRepository.findAllByOrderByNombreAsc();
    }

    public List<Profesional> getAllProfesionales() {
        return profesionalRepository.findAllByOrderByApellidoAsc();
    }

    public void clearObrasSociales() {
        obraSocialRepository.deleteAll();
    }

    public void clearProfesionales() {
        profesionalRepository.deleteAll();
    }

    public void clearEspecialidades() {
        especialidadRepository.deleteAll();
    }


    public List<TipoTurno> getAllTiposTurnos() {
        return tipoTurnoRepository.findAllByOrderByDescripcionAsc();
    }

    public List<MotivoTurno> getAllmotivosTurno() {
        return motivoTurnoRepository.findAllByOrderByDescripcionAsc();
    }

    public MotivoTurno getMotivoTurnoById(Integer id) {
        return motivoTurnoRepository.findOne(id.longValue());
    }
    public CentroSalud saveCentroSalud(CentroSalud centroSalud) {
        return centroSaludRepository.save(centroSalud);
    }

    public Profesional saveProfesional(Profesional profesional) {
        return profesionalRepository.save(profesional);
    }

    public ObraSocial saveObraSocial(ObraSocial obraSocial) {
        return obraSocialRepository.save(obraSocial);
    }

    public void saveAllObraSocial(List<ObraSocial> obrasSociales) {
        obraSocialRepository.save(obrasSociales);
    }

    public void saveAllEspecialidades(List<Especialidad> especialidades) {
        especialidadRepository.save(especialidades);
    }

    public void saveAllProfesionales(List<Profesional> profesionales) {
        profesionalRepository.save(profesionales);
    }

    public void saveAllPaises(List<Pais> paises) {
        paisRepository.save(paises);
    }

    public void saveAllProvincias(List<Provincia> provincias) {
        provinciaRepository.save(provincias);
    }

    public void saveAllLocalidad(List<Localidad> localidades) {
        localidadRepository.save(localidades);
    }

    public void saveAllMotivosTurno(List<MotivoTurno> motivoTurnos) {
        motivoTurnoRepository.save(motivoTurnos);
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
