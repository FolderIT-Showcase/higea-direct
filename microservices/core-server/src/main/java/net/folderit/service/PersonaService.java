package net.folderit.service;

import net.folderit.domain.core.Persona;
import net.folderit.domain.core.TurneroException;
import net.folderit.domain.core.User;
import net.folderit.domain.core.enums.Genero;
import net.folderit.dto.ResultAfipDto;
import net.folderit.repository.PersonaRepository;
import net.folderit.util.AfipUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;

@Service
public class PersonaService {

    private PersonaRepository personaRepository;

    @Autowired
    private JavaMailSender mailSender;

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

    public Iterable<Persona> findAll() {
        return personaRepository.findAll();
    }

    public Persona findById(Long id) {
        return personaRepository.findOne(id);
    }

    @Transactional
    public Persona findByTurno(Long turnoId) {
        return personaRepository.findByTurno(turnoId);
    }

    @Transactional
    public Persona findByUserAsociadoEmail(String email) {
        return personaRepository.findByUserAsociadoEmail(email);
    }

    @Transactional
    public ResultAfipDto isDocumentValid(String documento, String nombre, String apellido, String sexo) throws Exception {
        AfipUtil au = AfipUtil.getInstance();
        String cuit = au.getCuit(documento, (sexo.equals("M") ? Genero.MASCULINO : Genero.FEMENINO));
        ResultAfipDto data = AfipUtil.getInstance().getRestConexion().getForObject(
                restProperty + cuit, ResultAfipDto.class);
        return data;
    }


    public Boolean mandarMailDeBaja(Persona persona) {

        User user = persona.getUserAsociado();

        String recipientAddress = user.getEmail();
        String subject = "Turno cancelado";
        TurneroException.getInstance().getMessage(TurneroException.MESSAGE_TURNO_CANCELED, null);
        String mensaje = TurneroException.getInstance().getError();

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setFrom("turnerofit@gmail.com");
        email.setSubject(subject);
        email.setText(mensaje);
        mailSender.send(email);
        return Boolean.TRUE;
    }

}
