package net.folderit.connection;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.folderit.domain.core.Persona;
import net.folderit.domain.higea.LoginHigea;
import net.folderit.domain.higea.LoginResultHigea;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
public class ConnectionMidleWare {

    private RestTemplate restTemplate = new RestTemplate();

    private ResponseEntity<LoginResultHigea> login() {
        LoginHigea loginDTO = new LoginHigea("turneroweb", "WroteScientistFarmerCarbon");
        // send request and parse result
        String uriLogin = "http://higea.folderit.net/api/login";
        LoginResultHigea result = restTemplate.postForObject(uriLogin, loginDTO, LoginResultHigea.class);
        return ResponseEntity.ok(result);
    }

    public Object savePaciente(String codigo, Persona persona) {

        ResponseEntity<LoginResultHigea> loginResultDTO = login();

        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = null;

        try {
            jsonInString = mapper.writeValueAsString(persona.convertToPacienteHigeaDTO());
            System.out.println(jsonInString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        if(jsonInString == null){
            return "";
        }

        //JSON from String to Object
        try {

            String uriPaciente = "http://higea.folderit.net/api/{cliente}/pacientes";
            OkHttpClient client = new OkHttpClient();
            okhttp3.MediaType mediaType = okhttp3.MediaType.parse("application/json");
            RequestBody body = RequestBody.create(mediaType, jsonInString);
            Request request = new Request.Builder().url("http://higea.folderit.net/api/" + codigo + "/pacientes")
                    .post(body)
                    .addHeader("content-type", "application/json")
                    .addHeader("cache-control", "no-cache")
                    .addHeader("Authorization", loginResultDTO.getBody().getToken())
                    .build();

            return client.newCall(request).execute().body().string();

        } catch (IOException e) {
            e.printStackTrace();
        }



        return "";
    }

    public Object test(String codigo) {
        OkHttpClient client = new OkHttpClient();
        okhttp3.MediaType mediaType = okhttp3.MediaType.parse("application/json");
        RequestBody body = RequestBody.create(mediaType, "{\n" +
                "\t\"plan_os_id_1\": 1,\n" +
                "\t\"localidad_id\": 1,\n" +
                "\t\"documento_id\": 1,\n" +
                "\t\"persona_nombres\": \"sada\",\n" +
                "\t\"persona_apellido\": \"asd\",\n" +
                "\t\"persona_documento_nro\": \"29618961\",\n" +
                "\t\"persona_telefono_part_nro\": \"3232\",\n" +
                "\t\"persona_telefono_cel_nro\": \"\",\n" +
                "\t\"paciente_os_afiliado1_nro\": \"98221\",\n" +
                "\t\"persona_email\": \"\",\n" +
                "\t\"plan_os_id_2\": null\n" +
                "}");
        Request request = new Request.Builder().url("http://higea.folderit.net/api/BONFANTI/pacientes").post(body).addHeader("content-type", "application/json").addHeader("authorization", "Basic bWJ1c3RvczptaWd1ZWwyMDEx").addHeader("cache-control", "no-cache").addHeader("postman-token", "1eaddd95-acb8-85b5-df4d-6b52d38f74da").build();
        try {
            return client.newCall(request).execute().body().string();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "vacio";
    }


}
