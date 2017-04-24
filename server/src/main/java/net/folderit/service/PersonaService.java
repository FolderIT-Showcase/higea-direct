package net.folderit.service;

import net.folderit.domain.Persona;
import net.folderit.domain.User;
import net.folderit.domain.enums.Genero;
import net.folderit.dto.DataDto;
import net.folderit.dto.ResultAfipDto;
import net.folderit.repository.PersonaRepository;
import net.folderit.repository.UserRepository;
import net.folderit.util.AfipUtil;
import net.folderit.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;

/**
 * Created by gheng on 18/4/2017.
 */
@Service
public class PersonaService {

    private PersonaRepository personaRepository;


    @Value("${turnero.afip.url}")
    private String restProperty;


    @Autowired
    public PersonaService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }


    @Transactional
    public Persona save(Persona customer) {
        return personaRepository.save(customer);
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Transactional
    public Persona update(Persona customer) {
        return personaRepository.save(customer);
    }

    @Transactional
    public void delete(Persona customer) {
        personaRepository.delete(customer);
    }

    public Iterable<Persona> findAll() {return personaRepository.findAll();}

    public Persona findById(Long id) {
        return personaRepository.findOne(id);
    }

    public ResultAfipDto isDocumentValid(String documento, String nombre, String apellido,String sexo)throws Exception{
        AfipUtil au = AfipUtil.getInstance();
        String cuit = au.getCuit(documento,(sexo.equals("M")? Genero.MASCULINO:Genero.FEMENINO));
        ResultAfipDto data = AfipUtil.getInstance().getRestConexion().getForObject(
                restProperty + cuit, ResultAfipDto.class);
        return data;
    }
}