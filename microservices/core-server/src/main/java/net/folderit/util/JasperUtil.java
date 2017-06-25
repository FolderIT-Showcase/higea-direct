package net.folderit.util;

import ar.com.fdvs.dj.core.DJConstants;
import ar.com.fdvs.dj.core.DynamicJasperHelper;
import ar.com.fdvs.dj.core.layout.ClassicLayoutManager;
import ar.com.fdvs.dj.core.layout.HorizontalBandAlignment;
import ar.com.fdvs.dj.domain.*;
import ar.com.fdvs.dj.domain.builders.ColumnBuilder;
import ar.com.fdvs.dj.domain.builders.DynamicReportBuilder;
import ar.com.fdvs.dj.domain.builders.FastReportBuilder;
import ar.com.fdvs.dj.domain.builders.StyleBuilder;
import ar.com.fdvs.dj.domain.constants.*;
import ar.com.fdvs.dj.domain.constants.Font;
import ar.com.fdvs.dj.domain.entities.DJGroup;
import ar.com.fdvs.dj.domain.entities.columns.AbstractColumn;
import ar.com.fdvs.dj.domain.entities.columns.GlobalGroupColumn;
import net.folderit.domain.core.Preparacion;
import net.folderit.domain.core.Turno;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JRDesignExpression;
import org.apache.pdfbox.contentstream.operator.state.Save;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDStream;
import org.apache.tomcat.util.http.fileupload.FileUtils;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public class JasperUtil {

    protected final List<DJCrosstab> globalHeaderCrosstabs = new ArrayList<DJCrosstab>();

    protected final List<DJCrosstab> globalFooterCrosstabs = new ArrayList<DJCrosstab>();


    protected final List<AutoText> autoTexts = new ArrayList<AutoText>();

    public byte[] buildReportTurno(List<Turno> turnos) throws Exception {

        DynamicReportBuilder drb = new DynamicReportBuilder();
        DynamicReport dr =
                drb.addColumn(getFechaTurno())
                        .addColumn(getHourTurno())
                        .addColumn(getCentro())
                        .addColumn(getProfesional())
                        .addColumn(getDescripcion())
                        .setTitle("Preparacion para su turno")
                        .setDefaultStyles(getTitleStyle(), getSubtitleStyle(), getHeaderStyle(), null)
                        .setPrintBackgroundOnOddRows(true)
                        .setUseFullPageWidth(true)
                        // .setTemplateFile(JasperUtil.class.getResourceAsStream("StylesReport.jrxml").toString())
                        .build();


        JRDataSource ds = new JRBeanCollectionDataSource(turnos);
        JasperPrint jp = DynamicJasperHelper.generateJasperPrint(dr, new ClassicLayoutManager(), ds);
        byte[] report = JasperExportManager.exportReportToPdf(jp);
        return report;
    }


    public byte[] buildReportTurnoByturno(Turno turno) throws Exception {


       /* DynamicReport drHeaderSubreport = createHeaderSubreport();
        FastReportBuilder drb = new FastReportBuilder();
        DynamicReport dr =     buildReport(turno);

        Collection<Turno> turnos = new ArrayList<>();
        turnos.add(turno);
        JRDataSource ds = new JRBeanCollectionDataSource(turnos);
        JasperPrint jp = DynamicJasperHelper.generateJasperPrint(dr, new ClassicLayoutManager(), ds);
        byte[] report = JasperExportManager.exportReportToPdf(jp);
        return report;*/

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        // Create a new empty document
        PDDocument document = new PDDocument();

        // Create a new blank page and add it to the document
        PDPage blankPage = new PDPage();
        document.addPage( blankPage );

        // Save the newly created document
        document.save(out);

    // finally make sure that the document is properly
    // closed.





        document.close();

        return out.toByteArray();
    }

    public DynamicReport buildReport(Turno turno) throws Exception {
        Style atStyle = new StyleBuilder(true).setFont(Font.COMIC_SANS_SMALL).setTextColor(Color.red).build();
        DynamicReportBuilder drb = new DynamicReportBuilder();
        DynamicReport dr =
                        drb

                                /*.addColumn(getFechaTurno())
                        .addColumn(getHourTurno())*/
                        /*.addColumn(getCentro())
                        .addColumn(getProfesional())
                        .addColumn(getDescripcion())*/
                        .setDefaultStyles(getTitleStyle(), getSubtitleStyle(), getHeaderStyle(), null)
                        .setPrintBackgroundOnOddRows(true)

                        .addImageBanner("./report/higea.png",100,100, ImageBanner.Alignment.Left)
                        .setTitle("Preparacion para su turno")
                        .addAutoText("motivoTurno.preparacion.descripcion", AutoText.POSITION_HEADER, AutoText.ALIGNMENT_CENTER,200,atStyle)
                        .addAutoText(AutoText.AUTOTEXT_PAGE_X_OF_Y,AutoText.ALIGMENT_LEFT,AutoText.POSITION_FOOTER)
                        .setUseFullPageWidth(true)
                        .addWatermark("Higea Direct")

                        .build();

        return  dr;
    }




    private DJGroup createDummyGroupForCrosstabs(String name) {
        DJGroup globalGroup = new DJGroup();
        globalGroup.setLayout(GroupLayout.EMPTY);
        GlobalGroupColumn globalCol = new GlobalGroupColumn(name);
        globalCol.setTitle("");
        globalGroup.setColumnToGroupBy(globalCol);
        return globalGroup;
    }
     private DynamicReport createFooterSubreport() throws Exception {
       FastReportBuilder rb = new FastReportBuilder();
        DynamicReport dr = rb
        .addColumn("Prepacion", "motivoTurno.preparacion.descripcion", String.class.getName(), 100)
         .addGroups(1)
        .setMargins(5, 5, 20, 20)
        .setUseFullPageWidth(true)
        .setTitle("Footer Subreport for this group")
        .build();
        return dr;
        }

    private DynamicReport createHeaderSubreport() throws Exception {
        FastReportBuilder rb = new FastReportBuilder();
        DynamicReport dr = rb
                .addColumn("Preparacion", "motivoTurno.preparacion.descripcion", String.class.getName(), 300)
                .setMargins(5, 5, 20, 20)
                .setUseFullPageWidth(true)
                .setWhenNoDataNoPages()
                .setTitle("Header Subreport for this group")
                .build();
        return dr;
    }


    private Style getTitleStyle() {
        /**
         * "titleStyle" exists in the template .jrxml file
         * The title should be seen in a big font size, violet foreground and light green background
         */
        Style titleStyle = new Style("titleStyle");
        titleStyle.setFont(Font.ARIAL_BIG_BOLD);
        titleStyle.setHorizontalAlign(HorizontalAlign.CENTER);
        return titleStyle;
    }

    private Style getSubtitleStyle() {
        /**
         * "subtitleStyleParent" is meant to be used as a parent style, while
         * "subtitleStyle" is the child.
         */
        Style subtitleStyleParent = new Style("subtitleParent");
        subtitleStyleParent.setBackgroundColor(Color.CYAN);
        subtitleStyleParent.setTransparency(ar.com.fdvs.dj.domain.constants.Transparency.OPAQUE);

        Style subtitleStyle = Style.createBlankStyle("subtitleStyle");
        subtitleStyle.setFont(Font.GEORGIA_SMALL_BOLD);

        return subtitleStyle;
    }

    private Style getHeaderStyle() {
        Style headerStyle = new Style();

        headerStyle.setBackgroundColor(new Color(230, 230, 230));
        headerStyle.setBorderBottom(Border.THIN());
        headerStyle.setHorizontalAlign(HorizontalAlign.CENTER);
        headerStyle.setTransparency(ar.com.fdvs.dj.domain.constants.Transparency.OPAQUE);

        return headerStyle;
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
