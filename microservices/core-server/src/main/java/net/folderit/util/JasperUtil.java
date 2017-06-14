package net.folderit.util;

import ar.com.fdvs.dj.core.DynamicJasperHelper;
import ar.com.fdvs.dj.core.layout.ClassicLayoutManager;
import ar.com.fdvs.dj.domain.DynamicReport;
import ar.com.fdvs.dj.domain.Style;
import ar.com.fdvs.dj.domain.builders.ColumnBuilder;
import ar.com.fdvs.dj.domain.builders.DynamicReportBuilder;
import ar.com.fdvs.dj.domain.constants.Border;
import ar.com.fdvs.dj.domain.constants.Font;
import ar.com.fdvs.dj.domain.constants.HorizontalAlign;
import ar.com.fdvs.dj.domain.entities.columns.AbstractColumn;
import net.folderit.domain.core.Turno;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class JasperUtil {

    public byte[] buildReportTurno(List<Turno> turnos) throws Exception {

        String pattern = "MM/dd/yyyy";
        SimpleDateFormat format = new SimpleDateFormat(pattern);
        SimpleDateFormat formatHour = new SimpleDateFormat(pattern);

        DynamicReportBuilder drb = new DynamicReportBuilder();
        /**
         * "titleStyle" exists in the template .jrxml file
         * The title should be seen in a big font size, violet foreground and light green background
         */
        Style titleStyle = new Style("titleStyle");
        titleStyle.setFont(Font.ARIAL_BIG);


        /**
         * "subtitleStyleParent" is meant to be used as a parent style, while
         * "subtitleStyle" is the child.
         */
        Style subtitleStyleParent = new Style("subtitleParent");
        subtitleStyleParent.setBackgroundColor(Color.CYAN);
        subtitleStyleParent.setTransparency(ar.com.fdvs.dj.domain.constants.Transparency.OPAQUE);

        Style subtitleStyle = Style.createBlankStyle("subtitleStyle", "subtitleParent");
        subtitleStyle.setFont(Font.GEORGIA_SMALL_BOLD);

        Style amountStyle = new Style();
        amountStyle.setHorizontalAlign(HorizontalAlign.RIGHT);

        Style headerStyle = new Style();

        headerStyle.setBackgroundColor(new Color(230, 230, 230));
        headerStyle.setBorderBottom(Border.THIN());
        headerStyle.setHorizontalAlign(HorizontalAlign.CENTER);
        headerStyle.setTransparency(ar.com.fdvs.dj.domain.constants.Transparency.OPAQUE);

        DynamicReport dr =
                drb.addColumn(getFechaTurno())
                        .addColumn(getHourTurno())
                        .addColumn(getCentro())
                        .addColumn(getProfesional())
                        .addColumn(getDescripcion())
                        .setTitle("Preparacion para su turno")
                        .setDefaultStyles(titleStyle, subtitleStyle, headerStyle, null)
                        .addStyle(subtitleStyleParent)
                        .setPrintBackgroundOnOddRows(true)
                        .setUseFullPageWidth(true)
                        .build();


        JRDataSource ds = new JRBeanCollectionDataSource(turnos);
        JasperPrint jp = DynamicJasperHelper.generateJasperPrint(dr, new ClassicLayoutManager(), ds);
        byte[] report = JasperExportManager.exportReportToPdf(jp);
        return report;
    }

    private AbstractColumn getHourTurno() {
        AbstractColumn column = ColumnBuilder.getNew()
                .setColumnProperty("hora", Date.class.getName())
                .setTitle("Hora").setWidth(new Integer(30)).setPattern("HH:mm:ss")
                .build();

        return column;
    }

    private AbstractColumn getFechaTurno() {
        AbstractColumn column = ColumnBuilder.getNew()
                .setColumnProperty("fecha", Date.class.getName())
                .setTitle("Dia").setWidth(new Integer(30)).setPattern("dd/MM/yyyy")
                .build();

        return column;
    }

    private AbstractColumn getCentro() {
        AbstractColumn column = ColumnBuilder.getNew()
                .setColumnProperty("centroSalud.nombre", String.class.getName())
                .setTitle("Centro").setWidth(new Integer(30)).build();

        return column;
    }

    private AbstractColumn getProfesional() {
        AbstractColumn column = ColumnBuilder.getNew()
                .setColumnProperty("profesional.apellido", String.class.getName())
                .setTitle("Profesional").setWidth(new Integer(30)).build();

        return column;
    }

    private AbstractColumn getDescripcion() {
        AbstractColumn column = ColumnBuilder.getNew()
                .setColumnProperty("motivoTurno.preparacion.descripcion", String.class.getName())
                .setTitle("Descripcion").setWidth(new Integer(120)).build();

        return column;
    }

}
