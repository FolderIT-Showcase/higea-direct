package net.folderit.service;

import net.folderit.domain.core.ObraSocial;
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

    // @Scheduled(fixedRate = 35000)
    public void syncObrasSociales() {
        String url = "http://localhost:36004/{cliente}/obraSocial";
        ResponseEntity<List<ObraSocial>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<List<ObraSocial>>(){});
        List<ObraSocial> obrasSocialesOld = metadataService.getAllObrasSociales();
        List<ObraSocial> obrasSocialesNew = result.getBody();
        metadataService.saveAllObraSocial(listDiff(obrasSocialesOld, obrasSocialesNew));
    }

    private <T> List<T> listDiff(List<T> oldList, List<T> newList) {
        newList.removeAll(oldList);
        return (!newList.isEmpty() || oldList.size() == newList.size()) ? newList : new ArrayList<>();
    }

}
