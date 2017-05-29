package net.folderit.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@lombok.Data
@AllArgsConstructor
@NoArgsConstructor
public class Result<T> {
    private Boolean result;
    private Data<T> data;

    public Data<T> getData() {
        return data;
    }
}

