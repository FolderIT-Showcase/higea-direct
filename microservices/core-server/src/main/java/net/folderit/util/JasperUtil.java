package net.folderit.util;

import ar.com.fdvs.dj.core.DynamicJasperHelper;
import ar.com.fdvs.dj.core.layout.ClassicLayoutManager;
import ar.com.fdvs.dj.domain.DynamicReport;
import ar.com.fdvs.dj.domain.builders.FastReportBuilder;
import net.folderit.domain.core.Turno;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.util.Date;
import java.util.List;

public class JasperUtil {

    public byte[] buildReportTurno(List<Turno> turnos) throws Exception {

        FastReportBuilder drb = new FastReportBuilder();
        DynamicReport dr =
                drb.addColumn("Dia", "fecha", Date.class.getName(), 30)
                        .addColumn("Hora", "hora", Date.class.getName(), 30)
                        .addColumn("Centro", "centroSalud.nombre", String.class.getName(), 30)
                        .addColumn("Profesional", "profesional.apellido", String.class.getName(), 30)
                        .addColumn("Descripcion", "motivoTurno.preparacion.descripcion", String.class.getName(), 50)
                        //.addGroups(2)
                        .setTitle("Preparacion para su turno")
                        .setSubtitle("Reporte Generado " + new Date())
                        .setPrintBackgroundOnOddRows(true)
                        .setUseFullPageWidth(true)
                        .build();


        JRDataSource ds = new JRBeanCollectionDataSource(turnos);
        JasperPrint jp = DynamicJasperHelper.generateJasperPrint(dr, new ClassicLayoutManager(), ds);
        byte[] report = JasperExportManager.exportReportToPdf(jp);
        return report;
    }

}
