package net.folderit.service;

import net.folderit.domain.core.*;
import net.folderit.domain.core.enums.EstadoCivil;
import net.folderit.domain.higea.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MetadataService {

    private final HigeaApiConnect higeaApiConnect;
    private RestTemplate restTemplate = new RestTemplate();

    @Autowired
    public MetadataService(HigeaApiConnect higeaApiConnect) {
        this.higeaApiConnect = higeaApiConnect;
    }

    private List<PlanObraSocialHigea> findAllPlanesObrasSociales() {
        String url = "https://higea.folderit.net/api/{cliente}/planesObraSocial";
        ResponseEntity<Result<PlanObraSocialHigea>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<Result<PlanObraSocialHigea>>() {
        });
        return result.getBody().getData().getRows();
    }

    public List<ObraSocial> findAllObrasSociales() {

        List<PlanObraSocialHigea> todosLosPlanes = findAllPlanesObrasSociales();

        String url = "https://higea.folderit.net/api/{cliente}/obrasSociales";
        ResponseEntity<Result<ObraSocialHigea>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<Result<ObraSocialHigea>>() {
        });

        ArrayList<ObraSocial> obrasSociales = new ArrayList<>();

        result.getBody().getData().getRows().forEach(obraSocialHigea -> {

            List<PlanObraSocialHigea> planesHigea = todosLosPlanes.stream().filter(plan ->
                    plan.getObra_social_id() == obraSocialHigea.getObra_social_id()).collect(Collectors.toList());

            List<Plan> planes = new ArrayList<>();

            planesHigea.forEach(p -> planes.add(p.convert()));

            ObraSocial obraSocialCore = obraSocialHigea.convert();
            obraSocialCore.setPlanes(planes);
            obrasSociales.add(obraSocialCore);
        });

        return obrasSociales;
    }

    public List<TipoTurno> findTiposTurnoFac() {

        String url = "https://higea.folderit.net/api/{cliente}/tipoTurnoFac";
        ResponseEntity<Result<TipoTurnoHigea>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<Result<TipoTurnoHigea>>() {
        });

        ArrayList<TipoTurno> tiposTurno = new ArrayList<>();

        result.getBody().getData().getRows().forEach(tipoTurnoHigea -> tiposTurno.add(tipoTurnoHigea.convert()));

        return tiposTurno;
    }

    public List<MotivoTurno> findMotivosTurno() {
        String url = "https://higea.folderit.net/api/{cliente}/motivoTurnos";
        ResponseEntity<Result<MotivoTurnoHigea>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<Result<MotivoTurnoHigea>>() {
        });
        ArrayList<MotivoTurno> motivosTurno = new ArrayList<>();
        Preparacion preparacion = getPreparacion();

        result.getBody().getData().getRows().forEach(motivoTurnoHigea -> motivosTurno.add(motivoTurnoHigea.convert()));
        return motivosTurno;
    }


    public List<Pais> findPaises() {
        String url = "https://higea.folderit.net/api/{cliente}/paises";
        ResponseEntity<Result<PaisHigea>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<Result<PaisHigea>>() {
        });

        List<Pais> paises = new ArrayList<>();

        result.getBody().getData().getRows().forEach(paisHigea -> {
            paises.add(paisHigea.convert());
        });

        return paises;

    }

    public List<Provincia> findProvincias() {
        String url = "https://higea.folderit.net/api/{cliente}/provincias";
        ResponseEntity<Result<ProvinciaHigea>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<Result<ProvinciaHigea>>() {
        });
        List<Provincia> provincias = new ArrayList<>();
        result.getBody().getData().getRows().forEach(provinciaHigea -> {
            provincias.add(provinciaHigea.convert());
        });
        return provincias;
    }

    public List<Localidad> findLocalidades() {
        String url = "https://higea.folderit.net/api/{cliente}/localidades";
        ResponseEntity<Result<LocalidadHigea>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<Result<LocalidadHigea>>() {
        });
        List<Localidad> localidades = new ArrayList<>();
        result.getBody().getData().getRows().forEach(localidadHigea -> {
            localidades.add(localidadHigea.convert());
        });
        return localidades;
    }

    public List<EstadoCivil> findEstadoCiviles() {
        String url = "https://higea.folderit.net/api/{cliente}/estadoCiviles";
        ResponseEntity<Result<EstadoCivilHigea>> result = higeaApiConnect.get(url, new ParameterizedTypeReference<Result<EstadoCivilHigea>>() {
        });
        List<EstadoCivil> estadosCiviles = new ArrayList<>();
        result.getBody().getData().getRows().forEach(estadoCivilHigea -> {
            estadosCiviles.add(estadoCivilHigea.convert());
        });
        return estadosCiviles;
    }

    public List<ProfesionalHigea> getProfesionales() {
        // send request and parse result
        String uriProfesionales = "http://localhost:36001/{cliente}/profesionales";
        return higeaApiConnect.get(uriProfesionales, new ParameterizedTypeReference<List<ProfesionalHigea>>() {
        }).getBody();
    }

    public List<ProfesionalHigea> getProfesionalesDisponibles() {
        // send request and parse result
        String uriProfesionales = "http://localhost:36001/{cliente}/profesionalesDisponibles";
        return higeaApiConnect.get(uriProfesionales, new ParameterizedTypeReference<List<ProfesionalHigea>>() {
        }).getBody();
    }

    public List<ConfiguracionWeb> findConfiguracionWeb() {
        // send request and parse result
        String uriConfiguracionWeb = "https://higea.folderit.net/api/{cliente}/parametrosWeb";
        ResponseEntity<Result<ConfiguracionWeb>> result = higeaApiConnect.get(uriConfiguracionWeb, new ParameterizedTypeReference<Result<ConfiguracionWeb>>(){});

       List<ConfiguracionWeb> data = result.getBody().getData().getRows();

        return data;
    }


    public List<Profesional> findProfesionales() {
        List<ProfesionalHigea> profesionalesHigea = getProfesionales();
        List<Profesional> profesionales = new ArrayList<>();
        profesionalesHigea.forEach(x -> profesionales.add(x.convert()));
        return profesionales;
    }

    public List<Profesional> findProfesionalesDisponibles() {
        List<ProfesionalHigea> profesionalesHigea = getProfesionalesDisponibles();
        List<Profesional> profesionales = new ArrayList<>();
        profesionalesHigea.forEach(x -> profesionales.add(x.convert()));
        return profesionales;
    }

    public List<Especialidad> findEspecialidades() {
        List<ProfesionalHigea> profesionalesHigea = this.getProfesionalesDisponibles();
        String uriEspecialidad = "https://higea.folderit.net/api/{cliente}/especialidades";
        ResponseEntity<Result<EspecialidadHigea>> result = higeaApiConnect.get(uriEspecialidad, new ParameterizedTypeReference<Result<EspecialidadHigea>>() {
        });
        ArrayList<Especialidad> especialidades = new ArrayList<>();
        List<EspecialidadHigea> especialidadesHigea = result.getBody().getData().getRows();
        especialidadesHigea.forEach(especialidadHigea -> {
            Especialidad especialidadCore = especialidadHigea.convert();
            List<Profesional> profesionalesCore = new ArrayList<>();
            profesionalesHigea.forEach(profesionalHigea -> {
                if (especialidadCore.getId().intValue() == profesionalHigea.getEspecialidad_id()) {
                    profesionalesCore.add(profesionalHigea.convert());
                }
            });
            especialidadCore.setProfesional(profesionalesCore);
            if(especialidadCore.getProfesional().size()>0){
                especialidades.add(especialidadCore);
            }

        });
        return especialidades;
    }


    private Preparacion getPreparacion(){

        String strPreparacion = "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.";

        Preparacion preparacion = new Preparacion();
        preparacion.setDescripcion(strPreparacion);

        return preparacion;
    }
}
