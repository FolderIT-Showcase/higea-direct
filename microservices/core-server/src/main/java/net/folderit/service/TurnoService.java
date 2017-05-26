package net.folderit.service;

import net.folderit.domain.Turno;
import net.folderit.domain.exception.TurneroException;
import net.folderit.dto.FilterDto;
import net.folderit.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
public class TurnoService {

    private TurnoRepository turnoRepository;

    @Autowired
    public TurnoService(TurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }

    public List<Turno> findAllBy(FilterDto filterDto) {

        List<Turno> turnos = new ArrayList<>();

        String target = filterDto.getFecha();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        Date date = null;

        try {
            date = df.parse(target);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        if (date == null) {
            TurneroException.getInstance().getMessage(TurneroException.MESSAGE_INVALID_TOKEN, null);
            return turnos;
        }

        if (filterDto.getProfesional() != null && filterDto.getEspecialidad() != null) {
            return turnoRepository.findAllByFechaAndCentroSaludAndEspecialidadAndProfesionalOrderByFechaDesc(
                    date, filterDto.getCentroSalud(), filterDto.getEspecialidad(), filterDto.getProfesional());
        } else if (filterDto.getProfesional() == null && filterDto.getEspecialidad() == null) {
            return turnoRepository.findAllByFechaAndCentroSaludOrderByFechaDesc(
                    date, filterDto.getCentroSalud());
        } else if (filterDto.getProfesional() == null) {
            return turnoRepository.findAllByFechaAndCentroSaludAndEspecialidadOrderByFechaDesc(
                    date, filterDto.getCentroSalud(), filterDto.getEspecialidad());
        } else if (filterDto.getEspecialidad() == null) {
            return turnoRepository.findAllByFechaAndCentroSaludAndProfesionalOrderByFechaDesc(
                    date, filterDto.getCentroSalud(), filterDto.getProfesional());
        }
        return turnos;
    }

    public List<Turno> findNextAvailable(FilterDto filterDto) {
        List<Turno> turnos = new ArrayList<>();
        Date date = new Date();
        if (filterDto.getProfesional() != null && filterDto.getEspecialidad() != null) {
            return turnoRepository.findTop10ByFechaAfterAndCentroSaludAndEspecialidadAndProfesional(date,
                    filterDto.getCentroSalud(), filterDto.getEspecialidad(), filterDto.getProfesional());
        } else if (filterDto.getProfesional() == null && filterDto.getEspecialidad() == null) {
            return turnoRepository.findTop10ByFechaAfterAndCentroSalud(date, filterDto.getCentroSalud());
        } else if (filterDto.getProfesional() == null) {
            return turnoRepository.findTop10ByFechaAfterAndCentroSaludAndEspecialidad(date, filterDto.getCentroSalud(),
                    filterDto.getEspecialidad());
        } else if (filterDto.getEspecialidad() == null) {
            return turnoRepository.findTop10ByFechaAfterAndCentroSaludAndProfesional(date, filterDto.getCentroSalud(),
                    filterDto.getProfesional());
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
        return turnoRepository.findAllByEnabledIsTrueOrderByFechaDesc();
    }

    ;
}
