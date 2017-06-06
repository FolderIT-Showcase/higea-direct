package net.folderit.domain.higea;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.folderit.domain.core.Plan;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class PlanObraSocialHigea {
    private int plan_os_id;
    private int obra_social_id;
    private String plan_os_nombre;

    public Plan convert() {
        Plan plan = new Plan();
        plan.setId((long) this.plan_os_id);
        plan.setRazon_social(this.plan_os_nombre);
        return plan;
    }
}
