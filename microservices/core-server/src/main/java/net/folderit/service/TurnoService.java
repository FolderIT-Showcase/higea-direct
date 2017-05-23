package net.folderit.service;

import net.folderit.domain.Turno;
import net.folderit.dto.FilterDto;
import net.folderit.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
            turnos = turnoRepository.findAllBy(filterDto.getFecha(), filterDto.getCentroSalud(), filterDto.getEspecialidad(), filterDto.getProfesional());
        }
        if (filterDto.getProfesional() == null && filterDto.getEspecialidad() == null) {
            turnos = turnoRepository.findAllByFechaAndCentro(filterDto.getFecha(), filterDto.getCentroSalud());
        } else if (filterDto.getProfesional() == null) {
            turnos = turnoRepository.findAllByFechaAndCentroAndEspecialidad(filterDto.getFecha(), filterDto.getCentroSalud(), filterDto.getEspecialidad());
        } else if (filterDto.getEspecialidad() == null) {
            turnos = turnoRepository.findAllByFechaAndCentroAndProfesional(filterDto.getFecha(), filterDto.getCentroSalud(), filterDto.getProfesional());
        }

        return turnos;
    }

    public Turno saveTurno(Turno turno) {
        return turnoRepository.save(turno);
    }

    public Turno findById(Long id) {
        return turnoRepository.findOne(id);
    }

    public Iterable<Turno> findAll() {
        return turnoRepository.findAllFilter();
    }

    ;
}
