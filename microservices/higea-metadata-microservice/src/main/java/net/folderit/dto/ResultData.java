package net.folderit.dto;

import java.util.List;

public class Data<T> {
    private List<T> rows;

    public List<T> getRows() {
        return rows;
    }
}
