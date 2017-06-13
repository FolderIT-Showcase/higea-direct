package net.folderit.util;

import ar.com.fdvs.dj.core.DynamicJasperHelper;
import ar.com.fdvs.dj.core.layout.ClassicLayoutManager;
import ar.com.fdvs.dj.domain.DynamicReport;
import ar.com.fdvs.dj.domain.builders.ColumnBuilder;
import ar.com.fdvs.dj.domain.builders.DynamicReportBuilder;
import ar.com.fdvs.dj.domain.builders.FastReportBuilder;
import ar.com.fdvs.dj.domain.entities.columns.AbstractColumn;
import net.folderit.domain.core.Turno;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

public class JasperUtil {

    public byte[] buildReportTurno(List<Turno> turnos) throws Exception {

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat format=  new SimpleDateFormat(pattern);
        SimpleDateFormat formatHour=  new SimpleDateFormat(pattern);

        DynamicReportBuilder drb = new DynamicReportBuilder();


        DynamicReport dr =
                drb.addColumn(getFechaTurno())
                        .addColumn(getHourTurno())
                        .addColumn(getCentro())
                        .addColumn(getProfesional())
                        .addColumn(getDescripcion())
                        .setTitle("Preparacion para su turno")
                        .setSubtitle("Reporte Generado " + format.parse(GregorianCalendar.getInstance().getTime().))
                        .setPrintBackgroundOnOddRows(true)
                        .setUseFullPageWidth(true)
                        .build();


        JRDataSource ds = new JRBeanCollectionDataSource(turnos);
        JasperPrint jp = DynamicJasperHelper.generateJasperPrint(dr, new ClassicLayoutManager(), ds);
        byte[] report = JasperExportManager.exportReportToPdf(jp);
        return report;
    }

    private AbstractColumn getHourTurno(){
        AbstractColumn column = ColumnBuilder.getNew()
                .setColumnProperty("hora", Date.class.getName())
                .setTitle("Hora").setWidth(new Integer(30)).setPattern("HH:mm:ss")
                .build();

        return column;
    }

    private AbstractColumn getFechaTurno(){
        AbstractColumn column = ColumnBuilder.getNew()
                .setColumnProperty("fecha", Date.class.getName())
                .setTitle("Dia").setWidth(new Integer(30)).setPattern("dd/MM/yyyy")
                .build();

        return column;
    }

    private AbstractColumn getCentro(){
        AbstractColumn column = ColumnBuilder.getNew()
                .setColumnProperty("centroSalud.nombre", String.class.getName())
                .setTitle("Centro").setWidth(new Integer(30)).build();

        return column;
    }

    private AbstractColumn getProfesional(){
        AbstractColumn column = ColumnBuilder.getNew()
                .setColumnProperty("profesional.apellido", String.class.getName())
                .setTitle("Centro").setWidth(new Integer(50)).build();

        return column;
    }

    private AbstractColumn getDescripcion(){
        AbstractColumn column = ColumnBuilder.getNew()
                .setColumnProperty("motivoTurno.preparacion.descripcion", String.class.getName())
                .setTitle("Descripcion").setWidth(new Integer(30)).build();

        return column;
    }

}
