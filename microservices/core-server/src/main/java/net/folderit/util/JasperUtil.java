package net.folderit.util;

import ar.com.fdvs.dj.domain.AutoText;
import ar.com.fdvs.dj.domain.DJCrosstab;
import net.folderit.domain.core.Turno;
import org.apache.commons.lang.WordUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class JasperUtil {

    protected final List<DJCrosstab> globalHeaderCrosstabs = new ArrayList<DJCrosstab>();

    protected final List<DJCrosstab> globalFooterCrosstabs = new ArrayList<DJCrosstab>();


    protected final List<AutoText> autoTexts = new ArrayList<AutoText>();

    private Turno turno;

    public byte[] buildReportTurno(List<Turno> turnos) throws Exception {
        return null;
    }


    public byte[] buildReportTurnoByturno(Turno turno) throws Exception {

        this.turno = turno;

        PDPage page = new PDPage();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        getClass().getClassLoader().getResource("./report/higea.png");

        PDDocument doc = new PDDocument();
        PDImageXObject pdImage = PDImageXObject.createFromFile(getClass().getClassLoader().getResource("./report/higea.png").getPath(), doc);
        //contentStream.drawImage(pdImage, 20, 20, pdImage.getWidth() * scale, pdImage.getHeight() * scale);

        doc.addPage(page);

        PDPageContentStream content = new PDPageContentStream(doc, page);
        float scale = 1f;
        content.drawImage(pdImage, 20, 720, pdImage.getWidth() * scale, pdImage.getHeight() * scale);
        createTitle("Datos sobre su Turno", content, 26);
        content.drawLine(20, 710, 600, 710);
        createText("Dia ", page, content, 12, 80, 680, true);
        createText(getFechaTurno(), page, content, 12, 80, 660, false);
        createText("Hora", page, content,12, 80, 640, true);
        createText(getHourTurno(), page, content, 12, 80, 620, false);
        createText("Profesional ", page, content, 12, 80, 600, true);
        createText(turno.getProfesional().getApellido() + " " + turno.getProfesional().getNombre(), page, content, 12, 80, 580, false);
        createText("Preparación " , page, content, 12, 80, 540, true);
        createTextLarge(turno.getMotivoTurno().getPreparacion().getDescripcion(), page, content, 12, 80, 520);

        content.close();
        doc.save(out);
        doc.close();

        return out.toByteArray();
    }

    private void createTitle(String text, PDPageContentStream content, int fontSize) throws IOException {
        content.beginText();
        content.setFont(PDType1Font.TIMES_ROMAN, fontSize);
        content.moveTextPositionByAmount(220, 740);
        content.showText(text);
        content.endText();
    }

    private void createTextLarge(String text, PDPage page, PDPageContentStream content, int fontSize, int tx, int ty) throws IOException {

        breakString(content, text, tx, ty);
    }

    private void createText(String text, PDPage page, PDPageContentStream content, int fontSize, int tx, int ty, boolean bold) throws IOException {


        content.beginText();
        if(bold) content.setFont(PDType1Font.TIMES_BOLD, fontSize);else content.setFont(PDType1Font.TIMES_ROMAN, fontSize);
        content.moveTextPositionByAmount(tx, ty);
        content.showText(text);
        content.endText();

    }


    public void breakString(PDPageContentStream content, String textLarge, int tx, int ty) throws IOException {

        String[] wrT = null;
        String s = null;

        wrT = WordUtils.wrap(textLarge, 100).split("\\r?\\n");
        for (int i = 0; i < wrT.length; i++) {
            content.beginText();
            content.setFont(PDType1Font.TIMES_ROMAN, 12);
            // content.moveTextPositionByAmount(tx, ty);
            content.newLineAtOffset(tx, ty - i * 15);
            s = wrT[i];
            content.showText(s);
            content.endText();
        }
    }


    private String getHourTurno() {
        String date;
        SimpleDateFormat sdfDate = new SimpleDateFormat("HH:mm:ss");
        Date now = new Date();
        String strDate = sdfDate.format(turno.getHora());
        return strDate;
    }

    private String getFechaTurno() {

        String date;
        SimpleDateFormat sdfDate = new SimpleDateFormat("dd/MM/yyyy");
        Date now = new Date();
        String strDate = sdfDate.format(turno.getFecha());
        return strDate;

    }


}
