package net.folderit.service;

import net.folderit.domain.core.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SyncService {

    private final MetadataService metadataService;
    private final HigeaApiConnect higeaApiConnect;

    @Autowired
    public SyncService(MetadataService metadataService, HigeaApiConnect higeaApiConnect) {
        this.metadataService = metadataService;
        this.higeaApiConnect = higeaApiConnect;
    }

    public void clearMetadata() {
        metadataService.clearEspecialidades();
        metadataService.clearProfesionales();
    }

    public void syncAll() {
        syncMotivosTurno();
        syncProfesionales();
        syncEspecialidades();
        syncPaises();
        syncProvincias();
        syncLocalidades();
        syncObrasSociales();
    }

    private List<Profesional> nameProfesionals(List<Profesional> profesionals) {

        List<String> names = new ArrayList<>();
        List<String> surnames = new ArrayList<>();
        Random random = new Random();

        names.add("José");
        names.add("Roberto");
        names.add("Jorge");
        names.add("Luis");
        names.add("Ignacio");
        names.add("Antonio");
        names.add("Andres");
        names.add("Lucas");
        names.add("Emiliano");
        names.add("Esteban");
        names.add("Fernando");
        names.add("Cesar");
        names.add("Miguel");
        names.add("Matias");
        names.add("Tomás");
        names.add("Lucia");
        names.add("Laura");
        names.add("Josefina");
        names.add("Maria");
        names.add("Milagros");
        names.add("Rocio");
        names.add("Juliana");
        names.add("Julieta");
        names.add("Maria José");

        surnames.add("Perez");
        surnames.add("Ramirez");
        surnames.add("Gonzales");
        surnames.add("Aguirre");
        surnames.add("Romero");
        surnames.add("Fernandez");
        surnames.add("Garcia");
        surnames.add("Berardo");
        surnames.add("Berardo");

        profesionals.forEach(profesional -> {
            profesional.setNombre(names.get(random.nextInt(names.size())));
            profesional.setApellido(surnames.get(random.nextInt(surnames.size())));
        });

        return profesionals;
    }

    private void syncEspecialidades() {
        String url = "http://localhost:36004/{cliente}/especialidad";
        ResponseEntity<List<Especialidad>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<Especialidad>>() {
        });
        List<Especialidad> listOld = metadataService.getAllEspecialidades();
        List<Especialidad> listNew = result.getBody();
        metadataService.saveAllEspecialidades(listDiff(listOld, listNew));
    }

    private void syncProfesionales() {
        String url = "http://localhost:36004/{cliente}/profesionalDisponible";
        ResponseEntity<List<Profesional>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<Profesional>>() {
        });
        List<Profesional> listOld = metadataService.getAllProfesionales();
        List<Profesional> listNew = result.getBody();

        // TODO: test filter, sacar despues de la demo
        listNew = nameProfesionals(listNew);

        metadataService.saveAllProfesionales(listDiff(listOld, listNew));
    }

    // @Scheduled(fixedRate = 35000)
    private void syncObrasSociales() {
        String url = "http://localhost:36004/{cliente}/obraSocial";
        ResponseEntity<List<ObraSocial>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<ObraSocial>>() {
        });
        List<ObraSocial> obrasSocialesOld = metadataService.getAllObrasSociales();
        List<ObraSocial> obrasSocialesNew = result.getBody();
        metadataService.saveAllObraSocial(listDiff(obrasSocialesOld, obrasSocialesNew));
    }

    private void syncPaises() {
        String url = "http://localhost:36004/{cliente}/pais";
        ResponseEntity<List<Pais>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<Pais>>() {
        });
        List<Pais> listOld = metadataService.findAllPais();
        List<Pais> listNew = result.getBody();
        metadataService.saveAllPaises(listDiff(listOld, listNew));
    }

    private void syncProvincias() {
        String url = "http://localhost:36004/{cliente}/provincia";
        ResponseEntity<List<Provincia>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<Provincia>>() {
        });
        List<Provincia> listOld = metadataService.findAllProvincia();
        List<Provincia> listNew = result.getBody();
        metadataService.saveAllProvincias(listDiff(listOld, listNew));
    }

    private void syncLocalidades() {
        String url = "http://localhost:36004/{cliente}/localidad";
        ResponseEntity<List<Localidad>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<Localidad>>() {
        });
        List<Localidad> listOld = metadataService.findAllLocalidad();
        List<Localidad> listNew = result.getBody();
        metadataService.saveAllLocalidad(listDiff(listOld, listNew));
    }

    private void syncMotivosTurno() {
        String url = "http://localhost:36004/{cliente}/motivoTurno";
        ResponseEntity<List<MotivoTurno>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<MotivoTurno>>() {
        });
        List<MotivoTurno> listOld = metadataService.findAllMotivosTurno();
        List<MotivoTurno> listNew = result.getBody();
        metadataService.saveAllMotivosTurno(listDiff(listOld, listNew));
    }

    private <T> List<T> listDiff(List<T> oldList, List<T> newList) {
        newList.removeAll(oldList);
        return (!newList.isEmpty() || oldList.size() == newList.size()) ? newList : new ArrayList<>();
    }

}
