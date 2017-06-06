package net.folderit.connection;

import net.folderit.domain.core.Especialidad;
import net.folderit.domain.core.Profesional;
import net.folderit.domain.higea.EspecialidadHigea;
import net.folderit.domain.higea.ProfesionalHigea;
import net.folderit.domain.higea.Result;
import net.folderit.service.HigeaApiConnect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConnectionMidleWare {

    private RestTemplate restTemplate = new RestTemplate();
    private final HigeaApiConnect higeaApiConnect;

    @Autowired
    public ConnectionMidleWare(HigeaApiConnect higeaApiConnect) {
        this.higeaApiConnect = higeaApiConnect;
    }

    private List<ProfesionalHigea> getProfesionales() {
        // send request and parse result
        String uriProfesionales = "http://localhost:36001/{cliente}/profesionales";
        return higeaApiConnect.get(uriProfesionales, new ParameterizedTypeReference<List<ProfesionalHigea>>() {}).getBody();
    }


    public List<Especialidad> especialidades() {

        List<ProfesionalHigea> profesionales = this.getProfesionales();
        String uriEspecialidad = "http://higea.folderit.net/api/{cliente}/especialidades";
        ResponseEntity<Result<EspecialidadHigea>> result = higeaApiConnect.get(uriEspecialidad, new ParameterizedTypeReference<Result<EspecialidadHigea>>() {});

        ArrayList<Especialidad> especialidades = new ArrayList<>();

        List<EspecialidadHigea> mEspecialidades = result.getBody().getData().getRows();

        mEspecialidades.forEach(especialidad -> {
            Especialidad mEspecialidad = especialidad.convert();
            List<Profesional> profesionalesTmp = new ArrayList<>();

            profesionales.forEach(profesional -> {
                if (mEspecialidad.getId().intValue() == profesional.getEspecialidad_id()) {
                    if (mEspecialidad.getProfesional() != null) {
                        profesionalesTmp.add(profesional.convert());
                    }
                }
            });

            mEspecialidad.setProfesional(profesionalesTmp);
            especialidades.add(mEspecialidad);
        });

        return especialidades;
    }
}
