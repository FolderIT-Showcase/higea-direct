package net.folderit.service;

import net.folderit.domain.core.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        metadataService.clearObrasSociales();
    }

    public void syncAll(){
        syncMotivosTurno();
        syncProfesionales();
        syncEspecialidades();
        syncPaises();
        syncProvincias();
        syncLocalidades();
        syncObrasSociales();
    }

    private void syncEspecialidades() {
        String url = "http://localhost:36004/{cliente}/especialidad";
        ResponseEntity<List<Especialidad>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<Especialidad>>(){});
        List<Especialidad> listOld = metadataService.getAllEspecialidades();
        List<Especialidad> listNew = result.getBody();
        metadataService.saveAllEspecialidades(listDiff(listOld, listNew));
    }

    private void syncProfesionales() {
        String url = "http://localhost:36004/{cliente}/profesional";
        ResponseEntity<List<Profesional>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<Profesional>>(){});
        List<Profesional> listOld = metadataService.getAllProfesionales();
        List<Profesional> listNew = result.getBody();
        metadataService.saveAllProfesionales(listDiff(listOld, listNew));
    }

    // @Scheduled(fixedRate = 35000)
    private void syncObrasSociales() {
        String url = "http://localhost:36004/{cliente}/obraSocial";
        ResponseEntity<List<ObraSocial>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<ObraSocial>>(){});
        List<ObraSocial> obrasSocialesOld = metadataService.getAllObrasSociales();
        List<ObraSocial> obrasSocialesNew = result.getBody();
        metadataService.saveAllObraSocial(listDiff(obrasSocialesOld, obrasSocialesNew));
    }

    private void syncPaises() {
        String url = "http://localhost:36004/{cliente}/pais";
        ResponseEntity<List<Pais>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<Pais>>(){});
        List<Pais> listOld = metadataService.findAllPais();
        List<Pais> listNew = result.getBody();
        metadataService.saveAllPaises(listDiff(listOld, listNew));
    }

    private void syncProvincias() {
        String url = "http://localhost:36004/{cliente}/provincia";
        ResponseEntity<List<Provincia>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<Provincia>>(){});
        List<Provincia> listOld = metadataService.findAllProvincia();
        List<Provincia> listNew = result.getBody();
        metadataService.saveAllProvincias(listDiff(listOld, listNew));
    }

    private void syncLocalidades() {
        String url = "http://localhost:36004/{cliente}/localidad";
        ResponseEntity<List<Localidad>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<Localidad>>(){});
        List<Localidad> listOld = metadataService.findAllLocalidad();
        List<Localidad> listNew = result.getBody();
        metadataService.saveAllLocalidad(listDiff(listOld, listNew));
    }

    private void syncMotivosTurno() {
        String url = "http://localhost:36004/{cliente}/motivoTurno";
        ResponseEntity<List<MotivoTurno>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<MotivoTurno>>(){});
        List<MotivoTurno> listOld = metadataService.findAllMotivosTurno();
        List<MotivoTurno> listNew = result.getBody();
        metadataService.saveAllMotivosTurno(listDiff(listOld, listNew));
    }

    private <T> List<T> listDiff(List<T> oldList, List<T> newList) {
        newList.removeAll(oldList);
        return (!newList.isEmpty() || oldList.size() == newList.size()) ? newList : new ArrayList<>();
    }

}
