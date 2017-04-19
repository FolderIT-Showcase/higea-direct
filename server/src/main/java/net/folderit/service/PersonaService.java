package net.folderit.service;

import net.folderit.domain.Persona;
import net.folderit.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by gheng on 18/4/2017.
 */
@Service
public class PersonaService {

    private PersonaRepository personaRepository;

    @Autowired
    public PersonaService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    @Transactional
    public Persona save(Persona customer) {
        return personaRepository.save(customer);
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
}
