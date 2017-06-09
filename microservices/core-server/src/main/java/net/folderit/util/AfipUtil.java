package net.folderit.util;

import net.folderit.domain.core.enums.Genero;
import org.springframework.web.client.RestTemplate;

public class AfipUtil {

    private static AfipUtil instance = null;

    RestTemplate restTemplate = null;

    protected AfipUtil() {
    }

    public static AfipUtil getInstance() {
        if (instance == null) {
            instance = new AfipUtil();
        }
        return instance;
    }

    public RestTemplate getRestConexion() {
        if (restTemplate == null) {
            restTemplate = new RestTemplate();
        }
        return restTemplate;
    }

    public String getCuit(String documento, Genero sexo) throws Exception {
        int tipo;
        if (sexo.equals(Genero.MASCULINO)) {
            tipo = 20;
        } else {
            if (sexo.equals(Genero.FEMENINO)) {
                tipo = 27;
            } else {
                tipo = 30;
            }
        }
        String aux = String.valueOf(tipo) + String.valueOf(documento);
        String[] cuitArray = aux.split("");
        int codigo = 0;
        if (aux.length() != 10) {
            throw new Exception("Sexo o DNI no valido. La longitud no corresponde");
        }
        Integer[] serie = {5, 4, 3, 2, 7, 6, 5, 4, 3, 2};
        for (int i = 0; i < 10; i++) {
            codigo += Integer.valueOf(cuitArray[i]) * serie[i];
        }
        codigo = 11 - (codigo % 11);
        //Si el resultado anterior es 11 el código es 0
        if (codigo == 11) {
            codigo = 0;
            //o si el resultado anterior es 10 el código es 9
        } else if (codigo == 10) {
            codigo = 9;
        }
        return tipo + documento + codigo;
    }


}
