package net.folderit.service;

import net.folderit.domain.Persona;
import net.folderit.domain.Turno;
import net.folderit.dto.FilterDto;
import net.folderit.repository.PersonaRepository;
import net.folderit.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

/**
 * Created by gheng on 25/4/2017.
 */
@Service
public class TurnoService {

    private TurnoRepository turnoRepository;

    @Autowired
    public TurnoService(TurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }

    public List<Turno> finAllBy(FilterDto filterDto) {
        List<Turno> turnos = null;
        if (filterDto.getProfesional() != null && filterDto.getEspecialidad() != null) {
            turnos = turnoRepository.finAllBy(filterDto.getFecha(), filterDto.getCentroSalud(), filterDto.getEspecialidad(), filterDto.getProfesional());
        }if(filterDto.getProfesional()==null && filterDto.getEspecialidad()==null){
            turnos = turnoRepository.finAllByFechaAndCentro(filterDto.getFecha(), filterDto.getCentroSalud());
        }else if(filterDto.getProfesional()==null){
            turnos = turnoRepository.finAllByFechaAndCentroAndEspecialidad(filterDto.getFecha(), filterDto.getCentroSalud(),filterDto.getEspecialidad());
        }else if (filterDto.getEspecialidad()==null){
            turnos = turnoRepository.finAllByFechaAndCentroAndProfesional(filterDto.getFecha(), filterDto.getCentroSalud(),filterDto.getProfesional());
        }

        return turnos;
    }

    public Turno saveTurno(Turno turno) {
        return turnoRepository.save(turno);
    }
    public Turno findById(Long id) {
        return turnoRepository.findOne(id);
    }
    public Iterable<Turno> findAll(){return  turnoRepository.findAll();};
}
